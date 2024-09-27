"use client";
import { TAB_NAMES } from "@/app/components/atoms/tabNames";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.clients}`);
  }, []);

  return <></>;
}
