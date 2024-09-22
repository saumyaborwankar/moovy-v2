import { getClient } from "@/app/actions/client.actions";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import { PageNotes } from "@/app/components/pages/PageNotes";
import { redirect } from "next/navigation";

export default async function ClientNotes({
  params,
}: {
  params: { id: string };
}) {
  const clientDetails = await getClient(params.id);
  if (clientDetails.error) {
    redirect(`/${TAB_NAMES.dashboard}`);
  }
  console.log(clientDetails);
  // if(clientDetails.success)
  return <PageNotes currentClient={clientDetails.data} />;
}
