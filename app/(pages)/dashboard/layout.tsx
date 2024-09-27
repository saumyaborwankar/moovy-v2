import { getUser, signOut } from "@/app/actions/auth.actions";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import AppLayout from "@/app/components/pages/AppLayout";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  let userDetails;

  if (!user) {
    redirect(`/${TAB_NAMES.signIn}`);
  } else {
    const userFetch = await getUser(user.id);
    if (userFetch.success) {
      userDetails = userFetch.data;
    }
  }
  const handleSignOut = async () => {
    "use server";
    await signOut();
    // return redirect("/sign-in"); // Redirect after sign-out
  };

  if (!userDetails) {
    redirect(`/${TAB_NAMES.signIn}`);
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <p>Dashboard heading </p>
    //   {/* <form action={redirectt}>
    //     <button type="submit"></button>
    //   </form> */}
    //   {children}
    // </main>
    <AppLayout user={userDetails}>{children}</AppLayout>
  );
}
