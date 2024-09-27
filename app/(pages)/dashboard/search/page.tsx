import { getClients } from "@/app/actions/client.actions";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import PageSearch from "@/app/components/pages/PageSearch";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SearchPage() {
  let clientData;
  const { user } = await validateRequest();
  if (!user) {
    redirect(`/${TAB_NAMES.signIn}`);
  } else {
    const clients = await getClients(user.id);
    if (clients.success) {
      clientData = clients.data;
    }
  }
  return <PageSearch clientData={clientData} />;
}
