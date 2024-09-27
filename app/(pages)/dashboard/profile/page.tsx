import { getUser } from "@/app/actions/auth.actions";
import { getClients } from "@/app/actions/client.actions";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import PageProfile from "@/app/components/pages/PageProfile";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Profile() {
  let clientData = [];
  let userDetails;
  const { user } = await validateRequest();
  if (!user) {
    redirect(`/${TAB_NAMES.signIn}`);
  } else {
    const clients = await getClients(user.id);
    if (clients.success) {
      clientData = clients.data;
    }
    const userFetch = await getUser(user.id);
    if (userFetch.success) {
      userDetails = userFetch.data;
    }
  }

  return (
    <>
      {userDetails && (
        <PageProfile clientCount={clientData.length} user={userDetails} />
      )}
    </>
  );
}
