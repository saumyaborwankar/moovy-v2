import { Button, theme, Typography } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
interface Props {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  title?: string;
}
export const PageContent = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div
      style={{
        padding: 24,
        minHeight: "40vh",
        width: "80vw",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <div className="flex justify-between mb-5">
        <Typography.Title level={4}>{props.title}</Typography.Title>
        {props.extra}
      </div>

      {props.children}
    </div>
  );
};
