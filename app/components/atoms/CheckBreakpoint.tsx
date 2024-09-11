import { Grid, Tag } from "antd";

export const CheckBreakPoint = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <>
      Current break point:{" "}
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
    </>
  );
};
