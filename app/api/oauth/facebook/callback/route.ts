import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { oauthAccountTable, userTable } from "@/lib/db/schema";
import { facebook, google } from "@/lib/oauth";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}
export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) {
      return Response.json({ error: "Invalid request 1" });
    }

    // const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!savedState) {
      return Response.json({ error: "Invalid request 2" });
    }

    if (savedState !== state) {
      return Response.json({ error: "Invalid request 3" });
    }

    const { accessTokenExpiresAt, accessToken } =
      await facebook.validateAuthorizationCode(code);

    const facebookRes = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}`,
      { method: "GET" }
    );
    const facebookData = await facebookRes.json();

    const facebookEmailRes = await fetch(
      `https://graph.facebook.com/${facebookData.id}?fields=id,name,email,picture&access_token=${accessToken}`,
      { method: "GET" }
    );
    const facebookProfileData = await facebookEmailRes.json();
    console.log(facebookProfileData);

    const transaction = await db.transaction(async (trx) => {
      let userId = null;
      const user = await trx.query.userTable.findFirst({
        where: eq(userTable.email, facebookProfileData.email),
      });
      console.log(facebookProfileData.email, user);
      if (!user) {
        console.log("New user");
        const newUserId = generateId(15);
        userId = newUserId;
        const createdUser = await trx
          .insert(userTable)
          .values({
            email: facebookProfileData.email,
            id: newUserId,
            name: facebookProfileData.name,
            profilePictureUrl: facebookProfileData.picture.data.url,
          })
          .returning({ id: userTable.id });

        if (createdUser.length === 0) {
          trx.rollback();
          return {
            error: "User not created",
          };
        }

        const createOauth = await trx.insert(oauthAccountTable).values({
          accessToken,
          expiresAt: accessTokenExpiresAt,
          provider: "Facebook",
          providerId: facebookProfileData.id,
          id: generateId(15),
          userId: newUserId,
        });

        console.log("her er");
        if (createOauth.rowCount === 0) {
          trx.rollback();
          return {
            error: "Oauth not created",
          };
        }
      } else {
        userId = user.id;
        const updatedUser = await trx
          .update(userTable)
          .set({
            profilePictureUrl: facebookProfileData.picture.data.url,
          })
          .where(eq(userTable.id, userId));

        if (updatedUser.rowCount === 0) {
          trx.rollback();
          return {
            error: "User not updated",
          };
        }
        console.log("Returning user");
        const oauthExits = await trx.query.oauthAccountTable.findFirst({
          where: eq(oauthAccountTable.userId, userId),
        });
        if (!oauthExits) {
          console.log("No oauth");
          const oauthCreated = await trx.insert(oauthAccountTable).values({
            accessToken,
            expiresAt: accessTokenExpiresAt,
            provider: "Facebook",
            providerId: facebookProfileData.id,
            id: generateId(15),
            userId: user.id,
          });
          if (oauthCreated.rowCount === 0) {
            trx.rollback();
            return {
              error: "Oauth not created",
            };
          }
        } else {
          console.log("Oauth");
          const updateOauth = await trx
            .update(oauthAccountTable)
            .set({
              accessToken,
              expiresAt: accessTokenExpiresAt,
              provider: "Facebook",
              providerId: facebookProfileData.id,
              id: generateId(15),
              userId: user.id,
            })
            .where(eq(oauthAccountTable.userId, user.id));

          if (updateOauth.rowCount === 0) {
            trx.rollback();
            return {
              error: "Oauth not updated",
            };
          }
        }
      }

      return { userId };
    });

    if (transaction.error) {
      console.log(transaction.error);
      return Response.json({ error: transaction.error }, { status: 500 });
    }

    const session = await lucia.createSession(transaction.userId!, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    cookies().set("state", "", { expires: new Date(0) });
    // cookies().set("codeVerifier", "", { expires: new Date(0) });

    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      { status: 302 }
    );
  } catch (e: any) {
    console.log(e);
    return Response.json({ error: JSON.stringify(e) }, { status: 500 });
  }
};
