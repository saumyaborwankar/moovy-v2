import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { error } from "console";
import db from "@/lib/db";
import { emailVerificationTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const token = searchParams.get("token");
    if (!token) {
      return Response.json({
        error: "No token found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any as {
      email: string;
      verificationCode: string;
      userId: string;
    };
    console.log(decoded);

    const query = await db.query.emailVerificationTable.findFirst({
      where:
        eq(emailVerificationTable.userId, decoded.userId) &&
        eq(emailVerificationTable.code, decoded.verificationCode),
    });

    if (!query) {
      return Response.json({
        error: "Invalid Token ",
      });
    }
    await db
      .delete(emailVerificationTable)
      .where(eq(emailVerificationTable.userId, decoded.userId));
    await db
      .update(userTable)
      .set({
        isEmailVerified: true,
      })
      .where(eq(userTable.email, decoded.email));

    const session = await lucia.createSession(decoded.userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return Response.redirect(new URL(process.env.NEXT_PUBLIC_BASE_URL!), 302);
  } catch (e: any) {
    return Response.json({
      error: e.message,
    });
  }
};
