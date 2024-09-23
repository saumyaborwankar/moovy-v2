import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "./actions/auth.actions";
import { Button } from "antd";
import { TAB_NAMES } from "./components/atoms/tabNames";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect(`/${TAB_NAMES.signIn}`);
  }
  const handleSignOut = async () => {
    "use server";
    await signOut();
    // return redirect("/sign-in"); // Redirect after sign-out
  };
  redirect(`/${TAB_NAMES.dashboard}/${TAB_NAMES.clients}`);
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <p>Protected route</p>
  //     <p>{JSON.stringify(user)}</p>
  //     <form action={signOut}>
  //       {/* <Button type="primary" onClick={handleSignOut}>
  //         Sign out
  //       </Button> */}
  //       <button type="submit"> SignOut</button>
  //     </form>
  //   </main>
  // );
}
