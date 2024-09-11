import { Button } from "antd";
import styled from "styled-components";

const ButtonContainer = styled.div`
  .ant-btn-default {
    border-color: red;
    &:hover {
      border-color: yellow;
    }
  }
`;
export const WhiteButton = () => {
  return (
    <ButtonContainer>
      <Button
        type="default"
        style={{
          fontSize: "16px",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          borderRadius: "1.5rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          //   color: "black",
          // outlineColor: "red",
          //   borderColor: "red",
          // outline: "0.75rem",
          // backgroundColor: "black",
        }}
      >
        Sign up
      </Button>
    </ButtonContainer>
  );
};
