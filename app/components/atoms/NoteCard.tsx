"use client";
import { setCurrentNote } from "@/app/redux/slice/noteSlice";
import { Note } from "@/lib/db/schema";
import { formatDate, formatTime } from "@/lib/utils";
import { FileTextOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
interface Props {
  note: Note;
}

export const NoteCard = (props: Props) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseDown = () => {
    setIsClicked(true);
  };
  const handleMouseUp = () => {
    setIsClicked(false);
    console.log("clicked");
    dispatch(setCurrentNote(props.note));
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div style={{ minWidth: 80, minHeight: 80 }}>
        <div
          className="flex-column text-center"
          style={{
            background: isHovered
              ? isClicked
                ? "#d9d9d9"
                : "#f0f0f0"
              : "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <FileTextOutlined
            style={{
              fontSize: 50,
              marginTop: 10,
              marginBottom: 5,
            }}
          />
          <div className="flex flex-col">
            <div className="text-center ">
              {formatDate(new Date(props.note.createdAt!))}
            </div>
            <div className="pb-2">
              {formatTime(new Date(props.note.createdAt!))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
