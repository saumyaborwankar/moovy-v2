"use client";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Input,
  Layout,
  Menu,
  Space,
  theme,
  Typography,
} from "antd";
import { Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FIRST_GRADIENT } from "../atoms/constants";
import { TAB_NAMES } from "../atoms/tabNames";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const contentPadding = 0;
const siderWidth = 200 + contentPadding;
const siderCollapsedWidth = 80 + contentPadding;
const headerHeight = 65 + contentPadding / 2;
// const rightSiderWidth: number = showChecklist ? 320 : 0;
const iconSize = {
  fontSize: "20px",
  width: 40,
  height: 40,
  color: "white",
};
const siderItems: MenuProps["items"] = [
  {
    key: "0",
    type: "divider",
    style: { color: "white", background: "white", marginBottom: "15px" },
  },
  // {
  //   key: "tasks",
  //   icon: React.createElement(FaRegSquareCheck),
  //   label: "Tasks",
  //   // style: {
  //   // fontSize: "30px",
  //   // },
  // },
  {
    key: "clients",
    icon: React.createElement(HiUsers),
    label: "Clients",
    // onClick: () => navigate("/clients"),
  },
  // {
  //   key: "schedule",
  //   icon: React.createElement(GrSchedules),
  //   label: "Schedule",
  // },
  // {
  //   key: "notes",
  //   icon: React.createElement(FaRegNoteSticky),
  //   label: "Notes",
  // },
];
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "clients":
        router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.clients}`);
        break;
      // case "notes":
      //   navigate("/notes");
      //   break;
    }
  };
  const [state, setState] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            // navigate(`/${TAB_NAMES.profil/e}`);
          }}
        >
          Profile
        </a>
      ),
      style: {
        width: "150px",
      },
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            //signout
          }}
        >
          Sign Out{" "}
        </a>
      ),
      onMouseEnter: () => {
        setState(true);
      },
      onMouseLeave: () => {
        setState(false);
      },
      style: {
        width: "150px",
        outline: state ? "0.025rem solid red" : "",
      },
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { Header, Content, Sider } = Layout;

  return (
    <div className="h-screen w-screen">
      <Layout style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Sider
          trigger={null}
          collapsible
          breakpoint="lg"
          collapsedWidth="80"
          onBreakpoint={(broken) => {
            setCollapsed(true);
          }}
          collapsed={collapsed}
          style={{
            overflow: "hidden",
            height: "100vh",
            position: "fixed",
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: "thin",
            scrollbarColor: "unset",
          }}
        >
          <div
            className="demo-logo-vertical"
            style={{
              background: FIRST_GRADIENT,
              display: "flex",
              height: "62.5px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {collapsed ? (
              <></>
            ) : (
              <Typography.Title
                level={4}
                style={{
                  color: "white",
                  margin: "auto",
                }}
              >
                TheraNotes
              </Typography.Title>
            )}

            <Button
              type="text"
              icon={
                collapsed ? <GiHamburgerMenu /> : <MdOutlineArrowBackIosNew />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                ...iconSize,
                margin: "auto",
              }}
            />
          </div>

          <Menu
            mode="inline"
            defaultSelectedKeys={["clients"]}
            items={siderItems}
            style={{
              background: FIRST_GRADIENT,
              height: "100%",
            }}
            onClick={onClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: contentPadding,
              background: colorBgContainer,
              marginLeft: collapsed ? siderCollapsedWidth : siderWidth,
              paddingRight: 20,
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: `100%-${
                collapsed ? siderCollapsedWidth + 20 : siderWidth + 20
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow:
                "0 3px 6px rgba(36,43,53,.2),0 3px 6px rgba(36,43,53,.2)",
            }}
          >
            <div className="text-black pl-5 text-xl">Saumya Borwankar</div>
            <Space style={{ marginRight: "20px" }} size={"middle"}>
              <Input placeholder="Search clients" prefix={<SearchOutlined />} />
              <div style={{ cursor: "pointer" }}>
                <Avatar size={40} icon={<BellOutlined />} />
              </div>

              <Dropdown
                trigger={["click"]}
                menu={{ items }}
                placement="bottomRight"
                arrow
              >
                <div style={{ cursor: "pointer" }}>
                  <Avatar size={40} icon={<UserOutlined />} />
                </div>
              </Dropdown>
            </Space>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              paddingLeft: !screens.md
                ? contentPadding + 10
                : collapsed
                ? siderCollapsedWidth
                : siderWidth,
              paddingRight: 20,
              overflow: "auto",
              minHeight: "80vh",
            }}
          >
            {/* <CheckBreakPoint /> */}
            {children}
          </Content>
          <Footer style={{ textAlign: "center", height: "5px", padding: 10 }}>
            {/* Ant Design ©{new Date().getFullYear()}  */}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
