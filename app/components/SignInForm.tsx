"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignInSchema } from "../types";
import { resendVerificationEmail, signIn } from "../actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { message } from "antd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";
export function SignInForm() {
  const [showResendVerification, setShowResendVerification] =
    useState<boolean>(false);

  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: intervalValue,
    });
  const router = useRouter();
  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count]);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(form.getValues("email"));
    if (res.error) {
      message.error(res.error);
    } else if (res.success) {
      message.success(res.success);
      startCountdown();
    }
  };

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const res = await signIn(values);
    if (res.error) {
      if (res?.key === "email_not_verified") {
        setShowResendVerification(true);
      }
      message.error(res.error);
    } else if (res.success) {
      message.success(res.success);

      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="****" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {showResendVerification && (
        <Button
          variant="link"
          onClick={handleResendVerificationEmail}
          disabled={count > 0 && count < 60}
        >
          Send Verification Email
        </Button>
      )}
      {JSON.stringify(count)}
    </Form>
  );
}
