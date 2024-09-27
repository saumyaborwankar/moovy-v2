"use client";
import { signOut } from "@/app/actions/auth.actions";
import { useAppSelector } from "@/app/redux/hooks";
import { setSearch } from "@/app/redux/slice/searchSlice";
import { setUserDetails } from "@/app/redux/slice/userSlice";
import { SearchOutlined } from "@ant-design/icons";
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
  Tooltip,
  Typography,
} from "antd";
import { Footer } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FIRST_GRADIENT } from "../atoms/constants";
import { TAB_NAMES } from "../atoms/tabNames";
import { GrSchedules } from "react-icons/gr";

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
  {
    key: "schedule",
    icon: React.createElement(GrSchedules),
    label: (
      <Tooltip title="Schedule coming soon" placement="bottom">
        Schedule
      </Tooltip>
    ),
    disabled: true,
  },
  // {
  //   key: "notes",
  //   icon: React.createElement(FaRegNoteSticky),
  //   label: "Notes",
  // },
];
export default function AppLayout({
  user,
  children,
}: Readonly<{
  children: React.ReactNode;
  user: {
    id: string;
    email: string;
    name: string;
    profilePictureUrl: string | null;
    occupation: string | null;
    phonenumber: string | null;
    location: string | null;
  };
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUserDetails(user));
    }
  }, [user]);

  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
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
            router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.profile}`);
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
          onClick={async () => {
            //signout
            await signOut();
          }}
        >
          Sign Out
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
  const search = useAppSelector((state) => state.search.search);
  const onChange = (e: any) => {
    if (e.target.value != "") {
      dispatch(setSearch(e.target.value));
      router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.search}`);
    }
  };
  useEffect(() => {
    if (search != "") {
      router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.search}`);
    }
  }, [search]);
  const contentPadding = 0;
  const siderWidth = !screens.md ? 0 : 200 + contentPadding;
  const siderCollapsedWidth = 80 + contentPadding;
  const headerHeight = 65 + contentPadding / 2;
  // const rightSiderWidth: number = showChecklist ? 320 : 0;
  return (
    <div className="h-screen w-screen">
      <Layout style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Sider
          trigger={null}
          collapsible
          defaultValue={"clients"}
          breakpoint="md"
          collapsedWidth="80"
          onBreakpoint={(broken) => {
            setCollapsed(broken);
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
            zIndex: "1000",
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
            <Space>
              {!screens.md ? (
                <></>
              ) : (
                // <div style={{ paddingLeft: "1em" }}>
                //   <Button
                //     type="primary"
                //     icon={<MenuUnfoldOutlined />}
                //     onClick={() => setCollapsed(!collapsed)}
                //   />
                // </div>
                <></>
              )}
              <div className="text-black pl-5 text-xl">{user.name}</div>
            </Space>

            <Space style={{ marginRight: "20px" }} size={"middle"}>
              <Input
                placeholder="Search clients"
                prefix={<SearchOutlined />}
                onChange={onChange}
              />
              {/* <div style={{ cursor: "pointer" }}>
                <Avatar size={40} icon={<BellOutlined />} />
              </div> */}

              <Dropdown
                trigger={["click"]}
                menu={{ items }}
                placement="bottomRight"
                arrow
              >
                <div style={{ cursor: "pointer" }}>
                  <Avatar
                    size={40}
                    // icon={<UserOutlined />}
                    src={user?.profilePictureUrl}
                  />
                </div>
              </Dropdown>
            </Space>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              paddingLeft: !screens.md
                ? siderCollapsedWidth
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
