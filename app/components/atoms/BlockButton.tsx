import { Button } from "antd";

export const BlockButton = (props: any) => {
  return (
    <Button block style={{ height: "36px", fontSize: "16px" }} {...props} />
  );
};
