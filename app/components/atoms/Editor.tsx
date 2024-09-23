// import React, { Component, useEffect, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import {
//   convertFromRaw,
//   convertToRaw,
//   EditorState,
//   RawDraftContentState,
// } from "draft-js";
// import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Button, Card } from "antd";

// export function NoteEditor() {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const onEditorStateChange = (newEditorState: any) => {
//     setEditorState(newEditorState);
//   };
//   useEffect(() => {
//     const rawContent: RawDraftContentState = {
//       blocks: [
//         {
//           key: "ebjq5",
//           text: "\nBOEwevwvw qwvqv",
//           type: "unstyled",
//           depth: 0,
//           inlineStyleRanges: [
//             {
//               offset: 15,
//               length: 10,
//               style: "ITALIC",
//             },
//             {
//               offset: 15,
//               length: 15,
//               style: "BOLD",
//             },
//             {
//               offset: 15,
//               length: 10,
//               style: "UNDERLINE",
//             },
//           ],
//           entityRanges: [],
//           data: {},
//         },
//       ],
//       entityMap: {},
//     };
//     const contentState = convertFromRaw(rawContent);
//     setEditorState(EditorState.createWithContent(contentState));
//   }, []);

//   const saveContent = () => {
//     const contentState = editorState.getCurrentContent();
//     const rawContent = convertToRaw(contentState);
//   };
//   return (
//     <>
//       <Card>
//         <Editor
//           wrapperClassName="wrapper-class"
//           editorClassName="editor-class"
//           toolbarClassName="toolbar-class"
//           editorState={editorState}
//           onEditorStateChange={onEditorStateChange}
//           editorStyle={{ background: "white", height: 500 }}
//         />
//       </Card>
//       <Button onClick={saveContent} type="primary" style={{ marginTop: 10 }}>
//         Save
//       </Button>
//     </>
//   );
// }
"use client";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { Button, message, Popconfirm, Popover, Space } from "antd";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "@/app/redux/slice/notesApi";
import { useAppSelector } from "@/app/redux/hooks";
import { Client } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setNewNote } from "@/app/redux/slice/noteSlice";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { formatDate, formatTime } from "@/lib/utils";
import { PRIMARY_COLOR } from "./constants";
export function NoteEditor({ client }: { client: Client }) {
  // const router = useRouter()
  const dispatch = useDispatch();
  const selectedNote = useAppSelector((state) => state.note.selectedNote);
  const currentNote = useAppSelector((state) => state.note.currentNote);
  const newNote = useAppSelector((state) => state.note.newNote);
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [triggerAddNote, { data, isSuccess, isError, isLoading }] =
    useAddNoteMutation();
  const [
    triggerUpdateNote,
    {
      isSuccess: updateSuccess,
      isLoading: updateLoading,
      isError: updateError,
    },
  ] = useUpdateNoteMutation();

  const [
    triggerDeleteNote,
    {
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      isError: deleteError,
    },
  ] = useDeleteNoteMutation();

  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    if (newNote) {
      setValue(
        RichTextEditor.createValueFromString(
          `<p><strong>${new Date().toLocaleDateString()}<br/>${
            client.firstName
          } ${client.lastName}</strong></p>\n`,
          "html"
        )
      );
    }
    if (selectedNote && currentNote) {
      setValue(
        RichTextEditor.createValueFromString(`${currentNote.content}`, "html")
      );
    }
  }, [newNote, selectedNote, currentNote]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Note saved.");
      // router.push("/")
      dispatch(setNewNote(false));
    }
    if (isError) {
      message.error("Error in saving note. Try again later.");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (updateSuccess) {
      message.success("Note updated.");
      // router.push("/")
      dispatch(setNewNote(false));
    }
    if (updateError) {
      message.error("Error in saving note. Try again later.");
    }
  }, [updateError, updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      message.success("Note deleted.");
      // router.push("/")
      dispatch(setNewNote(false));
    }
    if (deleteError) {
      message.error("Error in saving note. Try again later.");
    }
  }, [deleteError, deleteSuccess]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    // if (onChange) {
    console.log(newValue.toString("html"));
    // onChange(newValue.toString('html'));
    // }
  };

  const handleSave = () => {
    if (newNote) {
      console.log("Saving a new note");
      triggerAddNote({
        userId,
        clientId: client.id,
        content: value.toString("html"),
      });
    }
    if (selectedNote) {
      console.log("updating note");
      triggerUpdateNote({
        id: currentNote.id,
        content: value.toString("html"),
        userId,
      });
    }
  };

  const handleDelete = () => {
    triggerDeleteNote({
      id: currentNote.id,
      userId,
    });
  };

  return (
    <>
      <div className="text-right">
        <Button
          size="large"
          type="primary"
          style={{
            background: "transparent",
            color: PRIMARY_COLOR,
            outline: "none",
            outlineColor: "transparent",
            boxShadow: "none",
          }}
          onClick={() => dispatch(setNewNote(false))}
          icon={<IoMdClose style={{ fontSize: 20 }} />}
        ></Button>
      </div>
      <RichTextEditor
        value={value}
        onChange={handleChange}
        editorStyle={{ height: "50vh" }}
      />
      {/* <div style={{ textAlign: "right", marginTop: 10 }}> */}
      <div
        className={
          selectedNote ? "flex justify-between mt-3 " : "mt-3 text-right"
        }
      >
        {selectedNote && (
          <div className="text-slate-500 align-middle">
            Last updated on: {formatDate(currentNote.updatedAt!)}{" "}
            {/* {currentNote.updatedAt?.getFullYear().toString().substring(2)} */}
            {currentNote.updatedAt?.getFullYear()}
            {", "}
            {formatTime(currentNote.updatedAt!)}
          </div>
        )}
        <Space style={{ textAlign: "right" }}>
          {selectedNote && (
            <Popconfirm
              title="Are you sure you want to delete this note?"
              onConfirm={handleDelete}
            >
              <Button danger icon={<AiOutlineDelete />} />
            </Popconfirm>
          )}
          <Button type="primary" onClick={handleSave} loading={isLoading}>
            Save
          </Button>
        </Space>
      </div>
    </>
  );
}
