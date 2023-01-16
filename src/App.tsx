import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import Plan from "./Plan";
import PlanForm from "./PlanForm";
import { degrees, schedules, update } from "./types";
import { jsonUpdate } from "./update";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: theme.spacing(13),
  backgroundColor: "rgb(0, 58, 60)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  fontFamily: "monospace",
}));

const API_URL = "https://schedule.wvffle.net";

export default function App() {
  const [update, setUpdate] = useState<any>();
  const [schedules, setSchedules] = useState<any>();
  const [allSchedules, setAllSchedules] = useState<any>();
  const [notificationSave, setNotificationSave] = useState(false);
  const [notificationDownload, setNotificationDownload] = useState(false);
  const [degrees, setDegrees] = useState<degrees>();

  useEffect(() => {
    setUpdate(jsonUpdate);
    setSchedules(jsonUpdate.data.schedules);
    setDegrees(jsonUpdate.data.degrees);
    setAllSchedules(jsonUpdate.data.schedules);
  }, []);

  const [triggerSave, setTriggerSave] = useState(0);
  const [triggerPrint, setTriggerPrint] = useState(0);
  const [triggerDownload, setTriggerDownload] = useState(0);

  useEffect(() => {
    if (triggerSave) {
      setNotificationSave(true);
      setTimeout(() => {
        setNotificationSave(false);
      }, 4000);
    }
  }, [triggerSave]);

  useEffect(() => {
    if (triggerDownload) {
      setTimeout(() => {
        setNotificationDownload(true);
      }, 700);
      setTimeout(() => {
        setNotificationDownload(false);
      }, 4000);
    }
  }, [triggerDownload]);

  const actions = [
    {
      icon: <SaveIcon />,
      name: "Zapisz",
      action: () => {
        setTriggerSave(Math.random());
      },
    },
    {
      icon: <PrintIcon />,
      name: "Drukuj",
      action: () => setTriggerPrint(Math.random()),
    },
    {
      icon: <DownloadIcon />,
      name: "Pobierz",
      action: () => {
        setTriggerDownload(Math.random());
      },
    },
  ];

  return (
    <Container
      sx={{
        backgroundImage: `url(${require("./gboard4.png")})`,
        backgroundSize: "100%",
        backgroundAttachment: "fixed",
      }}
    >
      <AppBar sx={{ backgroundColor: "rgb(1, 44, 46)", height: "104px" }}>
        <Toolbar sx={{ height: "100%" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "50px",
              fontFamily: "monospace",
            }}
          >
            🗓️ PLAN LEKCJI
            <Typography
              component="span"
              sx={{
                fontFamily: "monospace",
                marginLeft: "0.7rem",
                fontSize: "1.2rem",
              }}
            >
              dla Wydziału Informatyki Politechniki Białostockiej
            </Typography>
            <img
              style={{
                display: "inline-block",
                height: "50px",
                filter: "invert(1)",
                transform: "translate(10px, 10px)",
              }}
              src={require("./wr.png")}
              alt="logo"
            />
          </Typography>
          <SpeedDial
            ariaLabel="SpeedDial"
            direction="left"
            sx={{
              position: "absolute",
              bottom: "50%",
              right: 30,
              translate: "0 50%",

              "& .MuiButtonBase-root": {
                backgroundColor: "rgb(247, 247, 247)",
              },
              "& .MuiButtonBase-root:hover": {
                backgroundColor: "rgb(0, 58, 60)",
                "& > span": {
                  color: "rgb(247, 247, 247)",
                },
                "& > svg": {
                  color: "rgb(247, 247, 247)",
                },
              },
            }}
            icon={
              <SpeedDialIcon
                sx={{
                  color: "rgb(0, 58, 60)",
                }}
              />
            }
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
              />
            ))}
          </SpeedDial>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "absolute",
          left: notificationSave ? "1.6%" : "-40vw",
          top: "3%",
          fontSize: "1.2rem",
          backgroundColor: "rgba(1,1,1,0.6)",
          padding: "1rem",
          border: "1px solid #ced4da",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          color: "white",
          borderRadius: "4px",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        🚨 Twoje ustawienia zostały zapisane! 🚨
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: notificationDownload ? "1.6%" : "-40vw",
          top: "3%",
          fontSize: "1.2rem",
          backgroundColor: "rgba(1,1,1,0.6)",
          padding: "1rem",
          border: "1px solid #ced4da",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          color: "white",
          borderRadius: "4px",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        🚨 Zakończono pobieranie! 🚨
      </Box>
      {degrees && allSchedules && (
        <PlanForm
          degrees={degrees.filter((d) => [13, 17, 18].includes(d.id))}
          schedules={allSchedules}
          setSchedules={setSchedules}
          triggerSave={triggerSave}
        />
      )}
      {schedules && (
        <Plan
          schedules={schedules}
          update={update}
          triggerDownload={triggerDownload}
          triggerPrint={triggerPrint}
        />
      )}
    </Container>
  );
}
