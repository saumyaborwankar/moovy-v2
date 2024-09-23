import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const PUT = async (req: Request) => {
  try {
    const userDetails = await req.json();
    const userExist = await db.query.userTable.findFirst({
      where: eq(userTable.id, userDetails.id),
    });
    if (!userExist) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Can not update the user. Try again later." },
      { status: 500 }
    );
  }
};
