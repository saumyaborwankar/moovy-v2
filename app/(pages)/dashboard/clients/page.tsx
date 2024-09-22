import { getClients } from "@/app/actions/client.actions";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import Clients from "@/app/components/pages/Clients";
import { validateRequest } from "@/lib/auth";
import { message } from "antd";
import { redirect } from "next/navigation";

export default async function Client() {
  let clientData;
  const { user } = await validateRequest();
  if (!user) {
    redirect(`/${TAB_NAMES.signIn}`);
  } else {
    const clients = await getClients(user.id);
    if (clients.success) {
      clientData = clients.data;
    }
    if (clients.error) {
      message.error(clients.error);
    }
  }
  if (user && clientData) return <Clients clients={clientData} />;
}
