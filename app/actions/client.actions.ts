import db from "@/lib/db";
import { Client, clientTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const getClients = async (userId: string) => {
  try {
    const clients = await db.query.clientTable.findMany({
      where: eq(clientTable.userId, userId),
    });
    return { data: clients, success: true };
  } catch (e) {
    console.log(e);
    return { error: "Cannot get clients for this user." };
  }
};

export const getClient = async (clientId: string) => {
  try {
    const clientExist = await db.query.clientTable.findFirst({
      with: {
        notes: true,
      },
      where: eq(clientTable.id, clientId),
    });
    if (!clientExist) {
      return { error: "Client not found." };
    }
    return { success: true, data: clientExist };
  } catch (e) {
    console.log(e);
    return { error: "This client does not exist." };
  }
};
