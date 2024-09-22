import db from "@/lib/db";
import { noteTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

export const POST = async (req: Request) => {
  try {
    const noteDetails: NewNote = await req.json();
    await db.insert(noteTable).values({
      id: generateId(15),
      userId: noteDetails.userId,
      clientId: noteDetails.clientId,
      content: noteDetails.content,
    });
    return { success: true, data: noteDetails };
  } catch (e) {
    console.log(e);
    return Response.json({
      error: "Can not add a note right now. Try again later",
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id: noteId } = await req.json();
    const noteExist = await db.query.noteTable.findFirst({
      where: eq(noteTable.id, noteId),
    });
    if (!noteExist) {
      return Response.json({ error: "This note does not exist." });
    }

    await db.delete(noteTable).where(eq(noteTable.id, noteId));
    return Response.json({ success: true });
  } catch (e) {
    console.log(e);
    return Response.json({
      error: "Can not delete a note right now. Try again later",
    });
  }
};

interface NewNote {
  content: string;
  userId: string;
  clientId: string;
}

interface NoteQuery {
  id: string;
}
