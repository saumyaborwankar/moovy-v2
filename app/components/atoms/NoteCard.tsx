import { FileTextOutlined } from "@ant-design/icons";
import { Note } from "@saumyaborwankar/thera-notes-api";
import { useState } from "react";
interface Props {
  note: Note;
}
function formatDate(date: Date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = date.getMonth();

  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${day}${suffix} ${monthNames[month]}`;
}
export const NoteCard = (props: Props) => {
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

          <div className="text-center pb-2">
            {formatDate(new Date(props.note.createdAt))}
          </div>
        </div>
      </div>
    </>
  );
};
