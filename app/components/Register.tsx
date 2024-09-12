"use client";
import { Button, Form, Grid, Input, message, notification } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";
import z from "zod";
import {
  resendVerificationEmail,
  signIn,
  signUp,
} from "../actions/auth.actions";
import TheraNotesLogo from "../../app/assets/png/TN.png";
import TheraNotesFullLogo from "../../app/assets/png/logo-no-background.png";
import BackgroundImage from "../../app/assets/png/womanWithQuote.png";
import DividerWithText from "./atoms/DividerWithText";
import { Icons } from "./atoms/Icons";
import { PRIMARY_COLOR } from "./atoms/constants";
import React from "react";
import { BlockButton } from "./atoms/BlockButton";
interface formDetail {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function Register() {
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState<string>();
  const [showResendVerification, setShowResendVerification] =
    useState<boolean>(false);
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: intervalValue,
    });
  const router = useRouter();
  const handleResendVerificationEmail = async () => {
    const res = await resendVerificationEmail("");
    if (res.error) {
      message.error(res.error);
    } else if (res.success) {
      message.success(res.success);
      startCountdown();
    }
  };
  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count]);

  const handleRegister = async (data: formDetail) => {
    setEmail(data.email);
    const res = await signUp({ ...data, confirmPassword: data.password });
    startCountdown();
    if (res.error) {
      message.error(res.error);
    } else if (res.success) {
      message.success("Account created verification link sent");
    }
  };

  const PasswordSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
      email: z.string().email({ message: "Email not valid" }),
      passwordCopy: z.string(),
    })
    .refine(({ password, passwordCopy }) => password === passwordCopy, {
      message: "Passwords must match",
      path: ["passwordCopy"],
    });

  const rule = createSchemaFieldRule(PasswordSchema);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const RegisterForm = () => {
    return (
      <div className="h-full w-full mt-10 overflow-hidden">
        {contextHolder}
        <Image
          alt="Thera notes full logo"
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
              <BlockButton icon={<Icons.google className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Google"}
              </BlockButton>
              <div className="h-2"> </div>
              <BlockButton icon={<Icons.apple className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Apple"}
              </BlockButton>
            </div>
          ) : (
            <div className="flex justify-between w-full mb-5">
              <BlockButton icon={<Icons.google className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Google"}
              </BlockButton>
              <div className="w-6"> </div>
              <BlockButton icon={<Icons.apple className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Apple"}
              </BlockButton>
            </div>
          )}

          <DividerWithText />

          <Form
            layout="vertical"
            onFinish={handleRegister}
            style={{ width: "100%" }}
          >
            <div className="flex justify-between">
              <Form.Item label="First Name" name="firstName" rules={[rule]}>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                ></Input>
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[rule]}>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                ></Input>
              </Form.Item>
            </div>
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
              ></Input>
            </Form.Item>

            <Form.Item
              label="Re-enter Password"
              name="passwordCopy"
              style={{ marginTop: "-10px" }}
              rules={[rule]}
            >
              <Input
                id="passwordCopy"
                type="password"
                placeholder="Re-Enter password"
              ></Input>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {/* <a>Forgot password?</a> */}

              <Form.Item style={{ width: "50%" }}>
                <BlockButton
                  //   loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    backgroundColor: PRIMARY_COLOR,
                    height: "36px",
                  }}
                >
                  Sign Up
                </BlockButton>
              </Form.Item>
            </div>
          </Form>
          <div>
            <p className="text-black text-center">
              Already have an account?{" "}
              <Link href="/sign-in">
                <u>Sign In</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {screens.lg ? (
        <div className="flex h-screen overflow-hidden">
          <Image
            src={BackgroundImage}
            className="w-1/2"
            alt="background image"
          ></Image>
          <RegisterForm />
        </div>
      ) : (
        <RegisterForm />
      )}
    </>
  );
}
