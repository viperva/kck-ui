import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell as TableCell_,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { schedules, subject, update } from "./types";
import { DateTime } from "luxon";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf } from "@react-pdf/renderer";
import { PlanPdf } from "./PlanPdf";
import { saveAs } from "file-saver";

const lessonTypes = [
  { type: "wykład", color: "rgba(156, 245, 108, 0.9)" },
  { type: "ćwiczenia", color: "rgba(245, 113, 108, 0.9)" },
  { type: "laboratorium", color: "rgba(224, 108, 245, 0.9)" },
  { type: "pracownia specjalistyczna", color: "rgba(108, 245, 236, 0.9)" },
  { type: "inne", color: "rgba(255,255,255,0.9)" },
];

const TableCell = styled(TableCell_)(({ theme }) => ({
  color: "white",
  fontFamily: "Space Mono",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: "0.15rem",
  // borderRadius: "10px",

  borderLeft: "1px solid white",
  borderRight: "1px solid white",
  "&[data-lesson-type='W']": {
    backgroundColor: "rgba(156, 245, 108, 0.9)",
    color: "black",
  },
  "&[data-lesson-type='Ćw']": {
    backgroundColor: "rgba(245, 113, 108, 0.9)",
    color: "black",
  },
  "&[data-lesson-type='Ps']": {
    backgroundColor: "rgba(108, 245, 236, 0.9)",
    color: "black",
  },
  "&[data-lesson-type='L']": {
    backgroundColor: "rgba(224, 108, 245, 0.9)",
    color: "black",
  },
  "&[data-lesson-type='x']": {
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "black",
  },
  "&[data-lesson-type='hour']": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.3vw",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

type PlanProps = {
  schedules: schedules;
  update: update;
  triggerDownload: number;
  triggerPrint: number;
};

const today = new Date().getDay() - 1;

const october =
  DateTime.now().month > 9
    ? DateTime.now().set({ day: 1, month: 10 })
    : DateTime.now().minus({ year: 1 }).set({ day: 1, month: 10 });

const weeksSinceOctober = DateTime.now().weekNumber - october.weekNumber;
const isOdd = weeksSinceOctober % 2 != 1;

type lessonType = {
  lesson: string;
  type: string;
};

function createData(
  hour: lessonType,
  monday: lessonType,
  tuesday: lessonType,
  wednesday: lessonType,
  thursday: lessonType,
  friday: lessonType
) {
  return [hour, monday, tuesday, wednesday, thursday, friday];
}

export default function Plan({
  schedules,
  update,
  triggerDownload,
  triggerPrint,
}: PlanProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [rows, setRows] = useState([
    createData(
      { lesson: "8:30 - 9:15", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "9:15 - 10:00", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "10:15 - 11:00", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "11:00 - 11:45", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "12:00 - 12:45", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "12:45 - 13:30", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "14:00 - 14:45", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "14:45 - 15:30", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "16:00 - 16:45", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "16:45 - 17:30", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "17:40 - 18:25", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "18:25 - 19:10", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "19:20 - 20:05", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
    createData(
      { lesson: "20:05 - 20:50", type: "hour" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" },
      { lesson: "", type: "" }
    ),
  ]);
  //   console.log(schedules);
  const table = useRef(null);

  const handlePrint = useReactToPrint({ content: () => table.current });

  const download = async (plan: typeof rows) => {
    const blob = await pdf(<PlanPdf rows={plan} />).toBlob();
    saveAs(blob, "plan-lekcji" + Date.now().toString().slice(0, 10));
    // const input = table.current;
    // if (input) {
    //   html2canvas(input).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF("l", "mm", [297, 210]);
    //     pdf.addImage(imgData, "JPEG", 0, 0, 297, 180);
    //     pdf.save("plan-lekcji.pdf");
    //   });
    // }
  };

  useEffect(() => {
    if (triggerDownload) {
      download(rows);
    }
  }, [triggerDownload]);

  useEffect(() => {
    if (triggerPrint) {
      handlePrint();
    }
  }, [triggerPrint]);

  useEffect(() => {
    const rowsTemp = [
      createData(
        { lesson: "8:30 - 9:15", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "9:15 - 10:00", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "10:15 - 11:00", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "11:00 - 11:45", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "12:00 - 12:45", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "12:45 - 13:30", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "14:00 - 14:45", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "14:45 - 15:30", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "16:00 - 16:45", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "16:45 - 17:30", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "17:40 - 18:25", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "18:25 - 19:10", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "19:20 - 20:05", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
      createData(
        { lesson: "20:05 - 20:50", type: "hour" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" },
        { lesson: "", type: "" }
      ),
    ];
    const subjects: subject[] = update.data.subjects;
    const plan: (subject | undefined)[] = [];
    schedules.forEach((s) => {
      plan.push(subjects.find((sub) => sub.id === s.subject));
    });
    schedules.forEach((lesson) => {
      if (lesson.type === "W" && lesson.group === 2) return;
      // const lessonStart = lesson.hour.toString();
      const lessonSubject = subjects.find((s) => s.id == lesson.subject);
      //   console.log(lessonSubject);
      if (lessonSubject) {
        let nameString = { lesson: "", type: "" };
        switch (lesson.weekFlags) {
          case 1:
            if (isOdd) {
              return;
            } else {
              nameString.lesson = lessonSubject.name;
            }
            break;
          case 2:
            if (!isOdd) {
              return;
            } else {
              nameString.lesson = lessonSubject.name;
            }
            break;
          case 3:
            nameString.lesson = lessonSubject.name;
        }

        if (lesson.type === "W") {
          nameString.type = "W";
        } else if (lesson.type === "Ćw") {
          nameString.type = "Ćw";
        } else if (lesson.type === "Ps" || lesson.type === "P") {
          nameString.type = "Ps";
        } else if (lesson.type === "L") {
          nameString.type = "L";
        } else if (lesson.type === "Wf" || lesson.type === "J") {
          nameString.type = "x";
        }

        rowsTemp[lesson.hour - 1][lesson.day] = nameString;
      }
    });
    setRows(rowsTemp);
  }, [schedules]);

  const days = ["PONIEDZIAŁEK", "WTOREK", "ŚRODA", "CZWARTEK", "PIĄTEK"];

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {days.map((day, index) => {
          if (rows.find((row) => row[index + 1].lesson)) {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    fontFamily: "Space Mono",
                    fontWeight: "bold",
                  }}
                >
                  {day}
                </Typography>
                <TableContainer
                  sx={{
                    width: "96%",
                    marginLeft: "2%",
                    paddingBottom: "1rem",
                  }}
                >
                  <Table
                    sx={{
                      border: "2px solid white",
                      backgroundColor: "rgba(1,1,1,0.6)",
                    }}
                  >
                    <TableBody>
                      {rows.map((row) => {
                        if (row[index + 1].lesson) {
                          return (
                            <TableRow key={row[0].lesson}>
                              <TableCell
                                data-lesson-type={row[0].type}
                                align="center"
                                scope="row"
                                width="17%"
                              >
                                {row[0].lesson.slice(
                                  0,
                                  row[0].lesson.indexOf("-")
                                )}
                              </TableCell>
                              <TableCell
                                data-lesson-type={row[index + 1].type}
                                align="center"
                              >
                                {row[index + 1].lesson}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            );
          }
        })}
        <Box
          sx={{
            width: "100vw",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgba(1,1,1,0.6)",
          }}
        >
          {lessonTypes.map((lt) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                width: "90%",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  width: "70px",
                  height: "20px",
                  borderRadius: "20px",
                  backgroundColor: lt.color,
                }}
              ></Box>
              <Box sx={{ color: "white", fontSize: "1rem" }}>- {lt.type}</Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "none" }}>
          <Table
            ref={table}
            sx={{
              border: "2px solid white",
              backgroundColor: "rgba(1,1,1,0.6)",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell width="15%"></TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
                  align="center"
                  width="17%"
                >
                  PONIEDZIAŁEK
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
                  align="center"
                  width="17%"
                >
                  WTOREK
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
                  align="center"
                  width="17%"
                >
                  ŚRODA
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
                  align="center"
                  width="17%"
                >
                  CZWARTEK
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
                  align="center"
                  width="17%"
                >
                  PIĄTEK
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row[0].lesson}>
                  <TableCell
                    data-lesson-type={row[0].type}
                    align="center"
                    scope="row"
                  >
                    {row[0].lesson}
                  </TableCell>
                  <TableCell data-lesson-type={row[1].type} align="center">
                    {row[1].lesson}
                  </TableCell>
                  <TableCell data-lesson-type={row[2].type} align="center">
                    {row[2].lesson}
                  </TableCell>
                  <TableCell data-lesson-type={row[3].type} align="center">
                    {row[3].lesson}
                  </TableCell>
                  <TableCell data-lesson-type={row[4].type} align="center">
                    {row[4].lesson}
                  </TableCell>
                  <TableCell data-lesson-type={row[5].type} align="center">
                    {row[5].lesson}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    );
  }

  return (
    <TableContainer
      sx={{
        width: "90%",
        paddingBottom: "2rem",
      }}
    >
      <Table
        ref={table}
        sx={{
          border: "2px solid white",
          backgroundColor: "rgba(1,1,1,0.6)",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width="15%"></TableCell>
            <TableCell
              sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
              align="center"
              width="17%"
            >
              PONIEDZIAŁEK
            </TableCell>
            <TableCell
              sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
              align="center"
              width="17%"
            >
              WTOREK
            </TableCell>
            <TableCell
              sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
              align="center"
              width="17%"
            >
              ŚRODA
            </TableCell>
            <TableCell
              sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
              align="center"
              width="17%"
            >
              CZWARTEK
            </TableCell>
            <TableCell
              sx={{ fontSize: "1.2rem", padding: "0.8rem" }}
              align="center"
              width="17%"
            >
              PIĄTEK
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0].lesson}>
              <TableCell
                data-lesson-type={row[0].type}
                align="center"
                scope="row"
              >
                {row[0].lesson}
              </TableCell>
              <TableCell data-lesson-type={row[1].type} align="center">
                {row[1].lesson}
              </TableCell>
              <TableCell data-lesson-type={row[2].type} align="center">
                {row[2].lesson}
              </TableCell>
              <TableCell data-lesson-type={row[3].type} align="center">
                {row[3].lesson}
              </TableCell>
              <TableCell data-lesson-type={row[4].type} align="center">
                {row[4].lesson}
              </TableCell>
              <TableCell data-lesson-type={row[5].type} align="center">
                {row[5].lesson}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          // width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {lessonTypes.map((lt) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "rgba(1,1,1,0.6)",
              padding: "1rem",
              // width: "fit-content",
              gap: "1rem",
              [theme.breakpoints.down("lg")]: {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                width: "70px",
                height: "20px",
                borderRadius: "20px",
                backgroundColor: lt.color,
              }}
            ></Box>
            <Box
              sx={{
                color: "white",
                fontSize: "1rem",
              }}
            >
              {lt.type}
            </Box>
          </Box>
        ))}
      </Box>
    </TableContainer>
  );
}
