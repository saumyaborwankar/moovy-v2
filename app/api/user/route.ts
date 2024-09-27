import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const PUT = async (req: Request) => {
  try {
    const { updates: userDetails } = await req.json();
    const userExist = await db.query.userTable.findFirst({
      where: eq(userTable.id, userDetails.id),
    });
    if (!userExist) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }
    await db
      .update(userTable)
      .set({
        name: userDetails.name,
        location: userDetails.location,
        occupation: userDetails.occupation,
      })
      .where(eq(userTable.id, userDetails.id));
    return Response.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Can not update the user. Try again later." },
      { status: 500 }
    );
  }
};

// export const GET = async (req: Request) => {
//   try {
//     const { id } = await req.json();
//     const user = await db.query.userTable.findFirst({
//       where: eq(userTable.id, id),
//     });
//     if (!user) {
//       return Response.json({ error: "User not found" }, { status: 400 });
//     }
//     return Response.json(
//       {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         profilePictureUrl: user.profilePictureUrl,
//       },
//       { status: 200 }
//     );
//   } catch (e) {
//     return Response.json(
//       { error: "Can not get the user. Try again later." },
//       { status: 500 }
//     );
//   }
// };
