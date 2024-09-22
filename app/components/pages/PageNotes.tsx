"use client";
import { useAppSelector } from "@/app/redux/hooks";
import { Button, Modal, theme, Typography } from "antd";
import { useParams } from "next/navigation";
import { NoteGrid } from "../molecules/NoteGrid";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { NoteEditor } from "../atoms/Editor";
// import { NoteGrid } from "../molecules/NoteGrid";
// import { useParams } from "react-router-dom";
// import { useAppSelector } from "../../store/hooks";
// import { NoteGrid } from "../molecules/NoteGrid";
interface Props {
  currentClient: any;
}
export const PageNotes = ({ currentClient }: Props) => {
  console.log(currentClient);
  //   const clients = useAppSelector((state) => state.clients);
  //   const currentClient = clients.find((p) => p.id === clientId);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [newNote, setNewNote] = useState<boolean>(false);

  return (
    <div className="flex min-h-[40vh]">
      {/* ------------------- NOTES -------------------- */}
      <div
        style={{
          padding: 24,
          width: newNote ? "100%" : "50vw",
          height: "80vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginRight: "20px",
        }}
      >
        <div className="flex justify-between">
          <Typography.Title level={4}>Notes</Typography.Title>
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => setNewNote(true)}
          >
            Add note
          </Button>
        </div>
        <NoteGrid notes={[]} />
      </div>

      {/* ------------------- PROFILE -------------------- */}
      {!newNote && (
        <div
          style={{
            padding: 24,
            width: "30vw",
            height: "40vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="flex-column">
            <div>
              {" "}
              <Typography.Title level={4} style={{ marginBottom: "20px" }}>
                Client Information
              </Typography.Title>
              <div className="bg-white overflow-auto shadow rounded-lg border">
                {/* <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Client Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
            </p>
          </div> */}
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {currentClient?.firstName} {currentClient?.lastName}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {currentClient.email
                          ? currentClient.email
                          : "Add email"}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {currentClient.phoneNumber
                          ? currentClient.phoneNumber
                          : "Add phone number"}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {currentClient.address
                          ? currentClient.address
                          : "Add address"}
                        {/* <br />
                  Anytown, USA 12345 */}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            {/* <div>
            <Typography.Title level={5} style={{ marginTop: "20px" }}>
              Additional notes
            </Typography.Title>
            <TextArea rows={4} />
          </div> */}
          </div>
        </div>
      )}
      {newNote && (
        <div className="w-full h-[40vh] text-right">
          <NoteEditor />
        </div>
      )}
    </div>
  );
};
