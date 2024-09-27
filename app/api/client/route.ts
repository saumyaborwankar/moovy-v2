import db from "@/lib/db";
import { clientTable } from "@/lib/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

export const POST = async (req: Request) => {
  try {
    const clientDetails = await req.json();
    const clientExist = await db.query.clientTable.findFirst({
      where:
        eq(clientTable.userId, clientDetails.userId) &&
        eq(clientTable.email, clientDetails.email),
    });
    if (clientExist) {
      return Response.json(
        { error: "Cannot add duplicate Client" },
        { status: 500 }
      );
    }
    await db.insert(clientTable).values({
      ...clientDetails,
      id: generateId(15),
      createdAt: new Date(),
    });
    return Response.json(
      { success: true, data: JSON.stringify(clientDetails) },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Cannot add a client. Please try again later" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const clientDetails = await req.json();
    const clientExist = await db.query.clientTable.findFirst({
      with: {
        notes: true,
      },
      where:
        eq(clientTable.userId, clientDetails.userId) &&
        eq(clientTable.id, clientDetails.id),
    });
    if (!clientExist) {
      return Response.json({ error: "Client not found." }, { status: 500 });
    }
    // await db.delete(clientTable).where(eq(clientTable.id, clientDetails.id));
    await db
      .update(clientTable)
      .set({ isDeleted: true })
      .where(eq(clientTable.id, clientDetails.id));

    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Cannot delete client. Please try again later" },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { clientId: string } }
) => {
  try {
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");
    const clientExist = await db.query.clientTable.findFirst({
      with: {
        notes: true,
      },
      where:
        eq(clientTable.id, params.clientId) && eq(clientTable.isDeleted, false),
    });
    if (!clientExist) {
      return Response.json({ error: "Client not found." }, { status: 500 });
    }
    return Response.json({ success: true, data: clientExist }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "This client does not exist" });
  }
};

export const PUT = async (req: Request) => {
  //update client details
  try {
    const clientDetails = await req.json();
    const clientExist = await db.query.clientTable.findFirst({
      where:
        eq(clientTable.userId, clientDetails.userId) &&
        eq(clientTable.id, clientDetails.id) &&
        eq(clientTable.isDeleted, false),
    });
    if (!clientExist) {
      return Response.json({ error: "Client not found." }, { status: 500 });
    }
    await db
      .update(clientTable)
      .set({
        ...clientDetails,
      })
      .where(eq(clientTable.id, clientDetails.id));
    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Cannot update client. Please try again later" },
      { status: 500 }
    );
  }
};
