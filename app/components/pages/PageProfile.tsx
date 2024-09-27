"use client";
import { useAppSelector } from "@/app/redux/hooks";
import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Typography,
} from "antd";
import Image from "next/image";
import { PageContent } from "../atoms/PageContent";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useUpdateUserMutation } from "@/app/redux/slice/userApi";
import { useRouter } from "next/navigation";
export default function PageProfile({
  clientCount,
  user,
}: {
  clientCount: number;
  user: {
    email: string;
    id: string;
    name: string;
    profilePictureUrl: string | null;
    occupation: string | null;
    phonenumber: string | null;
    location: string | null;
  };
}) {
  const [updateUser, setUpdateUser] = useState<boolean>(false);
  const [triggerUpdateUser, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation();
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Username",
      children: user.id,
    },
    // {
    //   key: "2",
    //   label: "Phonenumber",
    //   children: (
    //     <Button
    //       type="link"
    //       icon={<EditOutlined />}
    //       onClick={() => {
    //         setUpdateUser(true);
    //         form.setFieldsValue({
    //           phonenumber: user?.phonenumber,
    //           name: user?.name,
    //           location: user?.location,
    //           occupation: "Psychologist",
    //         });
    //       }}
    //     />
    //   ),
    // },
    {
      key: "3",
      label: "Location",
      children: user.location ? (
        user.location
      ) : (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setUpdateUser(true);
            form.setFieldsValue({
              // phonenumber: user?.phonenumber,
              name: user?.name,
              location: user?.location,
              occupation: "Psychologist",
            });
          }}
        />
      ),
    },
    {
      key: "4",
      label: "Occupation",
      children: "Psychologist",
    },
    {
      key: "5",
      label: "Total Clients",
      children: clientCount,
    },
  ];

  const [form] = Form.useForm();

  const handleUpdate = (values: any) => {
    console.log(values);
    triggerUpdateUser({ ...values, id: user.id });
  };
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      setUpdateUser(false);
      router.refresh();
      message.success("User updated successfully");
    }
    if (isError) {
      message.error("Failed to update user");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Modal
        open={updateUser}
        title="Update user information"
        onCancel={() => setUpdateUser(false)}
        footer={[]}
        // style={{ minWidth: "30vw" }}
      >
        <Form
          form={form}
          key={new Date().toDateString()}
          layout="vertical"
          onFinish={handleUpdate}
          style={{ width: "100%" }}
        >
          <Form.Item label="Name" name="name">
            <Input id="name" type="text"></Input>
          </Form.Item>

          {/* <Form.Item label="Phone Number" name="phonenumber">
            <Input id="phonenumber" type="text"></Input>
          </Form.Item> */}
          <div className="flex justify-between">
            <Form.Item label="Occupation" name="occupation">
              <Input id="occupation" type="text"></Input>
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input id="location" type="text"></Input>
            </Form.Item>{" "}
          </div>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {"Update"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <PageContent title="Profile">
        <Card>
          <div>
            <Image
              src={user.profilePictureUrl!}
              alt={"profile image"}
              crossOrigin="anonymous"
              width={100}
              style={{ borderRadius: "50%", marginBottom: "1em" }}
              height={200}
            />
          </div>
          <div className="flex justify-between">
            <Typography.Title level={3}>{user.name}</Typography.Title>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setUpdateUser(true);
                form.setFieldsValue({
                  // phonenumber: user?.phonenumber,
                  name: user?.name,
                  location: user?.location,
                  occupation: "Psychologist",
                });
              }}
            >
              Edit
            </Button>
            {/* <p className="font-bold">{"Add Position "}</p>
          <p className="font-bold">Total Clients: {22}</p> */}
          </div>
          <Descriptions title="User Info" items={items} />
        </Card>
      </PageContent>
    </>
  );
}
