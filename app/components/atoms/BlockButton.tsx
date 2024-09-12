import { Button } from "antd";
import React from "react";

export function BlockButton(props: any) {
  return (
    <Button block style={{ height: "36px", fontSize: "16px" }} {...props} />
  );
}
