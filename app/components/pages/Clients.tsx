"use client";
import { useAppSelector } from "@/app/redux/hooks";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from "@/app/redux/slice/clientApi";
import { Client } from "@/lib/db/schema";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { createSchemaFieldRule } from "antd-zod";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import z from "zod";
import { LoadingState } from "../atoms/LoadingState";
import { PageContent } from "../atoms/PageContent";
import { TAB_NAMES } from "../atoms/tabNames";
import Link from "next/link";

export default function Clients({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [newClient, setNewClient] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.user.id);
  const [edit, setEdit] = useState<DataType>();
  const [
    triggerAddNewClient,
    {
      data: addedClient,
      isSuccess: addClientSuccess,
      isLoading: addClientLoading,
      isError: addClientError,
      error,
    },
  ] = useAddClientMutation();
  const [
    triggerUpdateClient,
    {
      data: updateClient,
      isSuccess: updateClientSuccess,
      isLoading: updateClientLoading,
      isError: updateClientError,
    },
  ] = useUpdateClientMutation();

  const [triggerDeleteClient, { isSuccess, isError }] =
    useDeleteClientMutation();

  useEffect(() => {
    if (isSuccess) {
      message.success("Client deleted successfully.");
      router.refresh();
    }
    if (isError) {
      message.error("Error in deleting client.");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (addClientSuccess) {
      setNewClient(false);
      message.success("Client added successfully.");
      router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.clients}`);
      router.refresh();
    }
    if (addClientError) {
      //@ts-ignore
      const errorMsg = error?.data.error;
      message.error(
        errorMsg ? errorMsg : "Error in adding client. Try again later."
      );
    }
  }, [addClientError, addClientSuccess]);

  useEffect(() => {
    if (updateClientSuccess) {
      setNewClient(false);
      setEdit(undefined);
      message.success("Client updated successfully.");
      // router.push(`/${TAB_NAMES.dashboard}/${TAB_NAMES.clients}`);
      router.refresh();
    }
    if (updateClientError) {
      //@ts-ignore
      const errorMsg = error?.data.error;
      message.error(
        errorMsg ? errorMsg : "Error in updating client. Try again later."
      );
    }
  }, [updateClientError, updateClientSuccess]);

  interface formDetail {
    firstName: string;
    lastName: string;
    userId: string;
    age: number;
    address: string;
    email: string;
  }
  interface DataType {
    key: string;
    name: string;
    age: number;
    dateAdded: Date;
    email: string;
    address: string;
    // tags: string[];
  }
  // Client name, date added, Next Appointment, Appointments, Actions,
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a >{text}</a>,
      render: (_, record) => (
        <Link href={`${TAB_NAMES.clients}/${record.key}`}>{record.name}</Link>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date Added",
      // dataIndex: "dateAdded",
      key: "dateAdded",
      render: (_, record) => {
        return <div>{record.dateAdded.toDateString()}</div>;
      },
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Tooltip title={"Notes"}>
            <Button type="link" icon={<FileTextOutlined />} />
          </Tooltip> */}
          <Tooltip title="Edit client details">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure you want to delete this client?"
            onConfirm={() => triggerDeleteClient({ userId, id: record.key })}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = clients.map((c, id) => {
    return {
      key: c.id,
      name: c.firstName + " " + c.lastName,
      age: c.age,
      dateAdded: c.createdAt!,
      tags: ["nice"],
      email: c.email,
      address: c.address!,
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  const NewClientValidation = z.object({
    firstName: z.string(),
    LastName: z.string(),
    age: z.number().default(25),
    email: z.string().email({ message: "Email not valid" }),
  });
  const rule = createSchemaFieldRule(NewClientValidation);

  async function handleUpdateClient(data: formDetail) {
    triggerUpdateClient({
      ...data,
      id: edit?.key!,
      userId,
    });
  }
  async function handleNewClient(data: formDetail) {
    data.userId = userId;
    data.age = data.age ? data.age : 25;
    // const res = await addClient({
    //   ...data,
    //   id: generateId(15),
    //   phoneNumber: null,
    //   createdAt: new Date(),
    // });
    triggerAddNewClient(data);
  }
  const handleEdit = (record: DataType) => {
    // console.log("Edit", record);
    // setNewClient(true);
    setEdit(record);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    if (edit) {
      // console.log(edit);
      form.setFieldsValue({
        firstName: edit.name.split(" ")[0],
        lastName: edit.name.split(" ")[1],
        email: edit.email,
        age: edit.age,
        address: edit?.address,
      });
      setNewClient(true);
    }
  }, [edit]);
  return (
    <>
      <Modal
        open={newClient}
        title="Add a new Client"
        onCancel={() => setNewClient(false)}
        footer={[]}
        // style={{ minWidth: "30vw" }}
      >
        <Form
          form={form}
          key={new Date().toDateString()}
          layout="vertical"
          onFinish={edit ? handleUpdateClient : handleNewClient}
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
          <div className="flex justify-between">
            {/* <div className="grow m-auto"> */}
            <Form.Item
              label="Email"
              name="email"
              rules={[rule]}
              style={{ flexGrow: 1, marginRight: "20px" }}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
              ></Input>
            </Form.Item>
            {/* </div> */}
            {/* <div className="grow-0"> */}
            <Form.Item
              label="Age"
              name="age"
              rules={[rule]}
              style={{ flexGrow: 0 }}
            >
              <InputNumber
                id="age"
                min={10}
                max={100}
                defaultValue={25}
                // style={{ flexGrow: 0 }}
              ></InputNumber>
            </Form.Item>
            {/* </div> */}
          </div>

          <Form.Item
            label="Address"
            name="address"
            style={{ marginTop: "-10px" }}
            rules={[rule]}
          >
            <TextArea
              id="address"
              rows={4}
              placeholder="Enter address"
              maxLength={250}
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={addClientLoading || updateClientLoading}
            >
              {edit ? "Update" : "Add Client"}
            </Button>
          </Form.Item>
          {/* <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <a>Forgot password?</a>
    <Form.Item style={{ width: "40%" }}>
      <BlockButton
        block
        type="primary"
        htmlType="submit"
        style={{
          fontSize: "1rem",
          fontWeight: "500",
          backgroundColor: PRIMARY_COLOR,
          height: "36px",
        }}
      >
        Sign In
      </BlockButton>
    </Form.Item>
  </div> */}
        </Form>
      </Modal>

      {false ? (
        <LoadingState />
      ) : (
        <PageContent
          title="Clients"
          extra={
            <Button
              type="primary"
              style={{ color: "white" }}
              icon={<FiPlus />}
              onClick={() => {
                form.setFieldsValue({
                  firstName: "",
                  lastName: "",
                  email: "",
                  age: 25,
                  address: "",
                });
                setNewClient(true);
              }}
            >
              Add Client
            </Button>
          }
        >
          <Table
            // rowSelection={{
            //   type: "checkbox",
            //   ...rowSelection,
            // }}
            columns={columns}
            dataSource={data}
            // style={{ maxHeight: "60vh", overflow: "auto" }}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 500 }}
          />
        </PageContent>
      )}
    </>
  );
}
