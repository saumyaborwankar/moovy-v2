import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { oauthAccountTable, userTable } from "@/lib/db/schema";
import { google } from "@/lib/oauth";
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

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!savedState || !codeVerifier) {
      return Response.json({ error: "Invalid request 2" });
    }

    if (savedState !== state) {
      return Response.json({ error: "Invalid request 3" });
    }

    const { accessToken, refreshToken, idToken, accessTokenExpiresAt } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googeleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );
    const googleData = (await googeleRes.json()) as GoogleUser;
    console.log(googleData);
    const transaction = await db.transaction(async (trx) => {
      let userId = null;
      const user = await trx.query.userTable.findFirst({
        where: eq(userTable.email, googleData.email),
      });

      if (!user) {
        const newUserId = generateId(15);
        userId = newUserId;
        const createdUser = await trx
          .insert(userTable)
          .values({
            email: googleData.email,
            id: newUserId,
            name: googleData.name,

            profilePictureUrl: googleData.picture,
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
          refreshToken,
          expiresAt: accessTokenExpiresAt,
          provider: "Google",
          providerId: googleData.id,
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
            profilePictureUrl: googleData.picture,
          })
          .where(eq(userTable.id, userId));

        if (updatedUser.rowCount === 0) {
          trx.rollback();
          return {
            error: "User not updated",
          };
        }
        const oauthExits = await trx.query.oauthAccountTable.findFirst({
          where: eq(oauthAccountTable.userId, userId),
        });
        if (!oauthExits) {
          const oauthCreated = await trx.insert(oauthAccountTable).values({
            accessToken,
            refreshToken,
            expiresAt: accessTokenExpiresAt,
            provider: "Google",
            providerId: googleData.id,
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
          const updateOauth = await trx
            .update(oauthAccountTable)
            .set({
              accessToken,
              refreshToken,
              expiresAt: accessTokenExpiresAt,
              provider: "Google",
              providerId: googleData.id,
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
    cookies().set("codeVerifier", "", { expires: new Date(0) });

    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      { status: 302 }
    );
  } catch (e: any) {
    return Response.json({ error: e?.message }, { status: 500 });
  }
};
