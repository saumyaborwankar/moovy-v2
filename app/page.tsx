import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "./actions/auth.actions";
import { Button } from "antd";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Protected route</p>
      <p>{JSON.stringify(user)}</p>
      <form action={signOut}>
        <Button type="primary">Sign out</Button>
      </form>
    </main>
  );
}
