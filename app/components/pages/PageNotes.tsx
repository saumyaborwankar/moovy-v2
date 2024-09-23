"use client";
import { Button, theme, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { NoteEditor } from "../atoms/Editor";
import { NoteGrid } from "../molecules/NoteGrid";
import { useAppSelector } from "@/app/redux/hooks";
import { useDispatch } from "react-redux";
import { setNewNote } from "@/app/redux/slice/noteSlice";
interface Props {
  currentClient: any;
}
export const PageNotes = ({ currentClient }: Props) => {
  const dispatch = useDispatch();
  // console.log(currentClient);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const noteSlice = useAppSelector((state) => state.note);
  const newNote = noteSlice.newNote;
  const selectedNote = noteSlice.selectedNote;
  useEffect(() => {
    if (!newNote || !selectedNote) {
      router.refresh();
    }
  }, [newNote, selectedNote]);
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
            disabled={newNote}
            type="primary"
            icon={<FiPlus />}
            onClick={() => dispatch(setNewNote(true))}
          >
            Add note
          </Button>
        </div>
        <NoteGrid notes={currentClient.notes} />
      </div>

      {/* ------------------- PROFILE -------------------- */}
      {!newNote && !selectedNote && (
        <div
          style={{
            padding: 24,
            width: "30vw",
            height: "45vh",
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
      {(newNote || selectedNote) && (
        <div className="w-full h-[40vh] pr-10">
          <NoteEditor client={currentClient} />
        </div>
      )}
    </div>
  );
};
