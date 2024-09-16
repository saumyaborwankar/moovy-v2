import { signOut } from "@/app/actions/auth.actions";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import AppLayout from "@/app/components/pages/AppLayout";
import { validateRequest } from "@/lib/auth";
import { Button } from "antd";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    redirect(`/${TAB_NAMES.signIn}`);
  }
  const handleSignOut = async () => {
    "use server";
    await signOut();
    // return redirect("/sign-in"); // Redirect after sign-out
  };
  // const redirectt = () => {
  //   "use server";
  //   redirect("/client");
  // };

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <p>Dashboard heading </p>
    //   {/* <form action={redirectt}>
    //     <button type="submit"></button>
    //   </form> */}
    //   {children}
    // </main>
    <AppLayout>{children}</AppLayout>
  );
}
