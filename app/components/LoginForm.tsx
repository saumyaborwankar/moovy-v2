"use client";
import { Button, Form, Grid, Input, message, notification } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCountdown } from "usehooks-ts";
import z from "zod";
import { resendVerificationEmail, signIn } from "../actions/auth.actions";
import TheraNotesLogo from "../assets/png/TN.png";
import TheraNotesFullLogo from "../assets/png/logo-no-background.png";
import BackgroundImage from "../assets/png/womanWithQuote.png";
import DividerWithText from "./atoms/DividerWithText";
import { Icons } from "./atoms/Icons";
import { PRIMARY_COLOR } from "./atoms/constants";

interface formDetail {
  email: string;
  password: string;
}

export function LoginForm() {
  const [showResendVerification, setShowResendVerification] =
    useState<boolean>(false);

  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: intervalValue,
    });
  const router = useRouter();
  const PasswordSchema = z.object({
    password: z.string(),
    email: z.string().email({ message: "Email not valid" }),
  });
  const rule = createSchemaFieldRule(PasswordSchema);
  const [api, contextHolder] = notification.useNotification();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const handleResendVerificationEmail = async () => {
    const res = await resendVerificationEmail("");
    if (res.error) {
      message.error(res.error);
    } else if (res.success) {
      message.success(res.success);
      startCountdown();
    }
  };
  const handleLogin = async (data: formDetail) => {
    const res = await signIn(data);
    if (res.error) {
      if (res?.key === "email_not_verified") {
        setShowResendVerification(true);
      }
      message.error(res.error);
    } else if (res.success) {
      message.success(res.success);

      router.push("/");
    }
  };
  const LoginForm = () => {
    return (
      <div className="h-full w-full mt-10 overflow-hidden">
        {contextHolder}
        <Image
          alt="thera notes full logo"
          src={screens.lg && screens.md ? TheraNotesFullLogo : TheraNotesLogo}
          className={
            screens.lg && screens.md
              ? "w-[150px] h-[75px] mr-auto ml-auto mt-5 pt-5"
              : "w-[70px] h-[75px] mr-auto ml-auto mt-5 pt-5"
          }
        ></Image>
        <h2 className="text-center py-4 text-3xl text-black font-bold">
          Welcome back
        </h2>
        <div className="text-slate-500 w-1/2 m-auto text-center mb-5">
          Streamline Your Notes: Save Time, Improve Care, and Stay Organized
        </div>

        <div className="w-1/2 m-auto">
          {screens.xs || !screens.md || !screens.xl || !screens.xxl ? (
            <div className="flex-col justify-between w-full mb-5">
              <Button
                block
                style={{ height: "36px", fontSize: "16px" }}
                icon={<Icons.google className="mr-2 h-4 w-4" />}
              >
                {screens.xs ? "" : "Sign in with Google"}
              </Button>
              <div className="h-2"> </div>
              <Button
                block
                style={{ height: "36px", fontSize: "16px" }}
                icon={<Icons.apple className="mr-2 h-4 w-4" />}
              >
                {screens.xs ? "" : "Sign in with Apple"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-between w-full mb-5">
              <Button
                block
                style={{ height: "36px", fontSize: "16px" }}
                icon={<Icons.google className="mr-2 h-4 w-4" />}
              >
                {screens.xs ? "" : "Sign in with Google"}
              </Button>
              <div className="w-6"> </div>
              <Button
                block
                style={{ height: "36px", fontSize: "16px" }}
                icon={<Icons.apple className="mr-2 h-4 w-4" />}
              >
                {screens.xs ? "" : "Sign in with Apple"}
              </Button>
            </div>
          )}

          <DividerWithText />

          <Form
            layout="vertical"
            onFinish={handleLogin}
            style={{ width: "100%" }}
          >
            <Form.Item label="Email" name="email" rules={[rule]}>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                autoComplete="username"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              style={{ marginTop: "-10px" }}
              rules={[rule]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter the password"
                autoComplete="current-password"
              ></Input>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <a>Forgot password?</a>
              <Form.Item style={{ width: "40%" }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    height: "36px",
                    fontSize: "16px",

                    fontWeight: "500",
                    backgroundColor: PRIMARY_COLOR,
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div>
            <p className="text-black text-center">
              Not registered yet?{" "}
              <Link href="/sign-up">
                <u>Register now</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return screens.lg ? (
    <div className="flex h-screen overflow-hidden">
      <Image
        src={BackgroundImage}
        className="w-1/2 "
        alt="background image"
      ></Image>
      <LoginForm />
    </div>
  ) : (
    <LoginForm />
  );
}
