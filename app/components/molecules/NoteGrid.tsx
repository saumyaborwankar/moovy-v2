import { NoteCard } from "../atoms/NoteCard";
import { Typography } from "antd";
import { useAppSelector } from "@/app/redux/hooks";
import { Note } from "@/lib/db/schema";

function groupByMonthName(data: Note[]) {
  const monthsObj = {};

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  monthNames.forEach((month) => {
    //@ts-ignore
    monthsObj[month] = [];
  });

  data.forEach((item: any) => {
    const date = new Date(item.createdAt);
    const month = date.getMonth();

    const monthName = monthNames[month];
    //@ts-ignore
    monthsObj[monthName].push(item);
  });

  return monthsObj;
}

export const NoteGrid = ({ notes }: { notes: Note[] }) => {
  // const notes = useAppSelector((state) => state.notes);
  const sortedNotes = groupByMonthName(notes);
  //   console.log(sortedNotes, Object.keys(sortedNotes));
  return (
    <div>
      {Object.keys(sortedNotes).map((key) => {
        //@ts-ignore
        if (sortedNotes[key].length > 0) {
          return (
            <div>
              <Typography.Title
                level={5}
                style={{ marginBottom: 0, marginTop: 10 }}
              >
                {key}
              </Typography.Title>
              <hr style={{ marginBottom: 10 }} />
              <div className="flex  flex-wrap overflow-auto h-[98%]">
                {
                  //@ts-ignore
                  sortedNotes[key].map((note: Note) => {
                    return <NoteCard note={note} />;
                  })
                }
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
