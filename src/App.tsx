import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import Plan from "./Plan";
import PlanForm from "./PlanForm";
import { degrees, schedules, update } from "./types";
import { jsonUpdate } from "./update";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { useTheme } from "@mui/material/styles";

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100vw",
  // top: theme.spacing(13),
  backgroundColor: "rgb(0, 58, 60)",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-around",
  // alignItems: "center",
  fontFamily: "Space Mono",
  [theme.breakpoints.down("md")]: {
    top: theme.spacing(15),
  },
}));

const API_URL = "https://schedule.wvffle.net";

export default function App() {
  const theme = useTheme();
  const [update, setUpdate] = useState<any>();
  const [schedules, setSchedules] = useState<any>();
  const [allSchedules, setAllSchedules] = useState<any>();
  const [notificationSave, setNotificationSave] = useState(false);
  const [notificationDownload, setNotificationDownload] = useState(false);
  const [degrees, setDegrees] = useState<degrees>();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        backgroundSize: "120%",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down("lg")]: {
          backgroundSize: "150%",
        },
        [theme.breakpoints.down("md")]: {
          // height: "100vh",
          height: "100vh",
          overflow: "scroll",
          backgroundSize: "350%",
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={notificationSave}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", marginTop: theme.spacing(isMobile ? 15 : 12) }}
        >
          🚨 Twoje ustawienia zostały zapisane! 🚨
        </Alert>
      </Snackbar>
      <Snackbar
        open={notificationDownload}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", marginTop: theme.spacing(isMobile ? 15 : 13) }}
        >
          🚨 Zakończono pobieranie! 🚨
        </Alert>
      </Snackbar>
      {/* <Box
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
          [theme.breakpoints.down("md")]: {
            left: notificationSave ? "50vw" : "-50vw",
            top: "1%",
            translate: "-50%",
            width: "80vw",
            fontSize: "0.8rem",
            textAlign: "center",
          },
        }}
      >
        🚨 Twoje ustawienia zostały zapisane! 🚨
      </Box> */}
      {/* <Box
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
          [theme.breakpoints.down("md")]: {
            left: notificationSave ? "50vw" : "-50vw",
            top: "1%",
            translate: "-50%",
            width: "80vw",
            fontSize: "0.8rem",
            textAlign: "center",
          },
        }}
      >
        🚨 Zakończono pobieranie! 🚨
      </Box> */}
      <AppBar
        sx={{
          backgroundColor: "rgb(1, 44, 46)",
          backgroundSize: "100%",
          height: "104px",
          width: "100vw",
          backgroundImage: `url(${require("./gboardbar.png")})`,
          left: 0,
          [theme.breakpoints.down("md")]: {
            height: "120px",
          },
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            [theme.breakpoints.down("md")]: {},
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "start",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",
                fontFamily: "Monoton",
                display: "flex",
                alignItems: "center",
                [theme.breakpoints.down("md")]: {
                  fontSize: "6.5vw",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "9vw",
                },
              }}
            >
              🗓️ PLAN LEKCJI
            </Typography>
            <Box>
              <Box
                component="img"
                sx={{
                  display: "inline-block",
                  height: "50px",
                  filter: "invert(1)",
                  transform: "translate(10px, 0px)",
                  [theme.breakpoints.down("md")]: {
                    height: "35px",
                    transform: "translate(0px, 3px)",
                  },
                }}
                src={require("./wr.png")}
                alt="logo"
              />
              <Typography
                component="span"
                sx={{
                  fontFamily: "Monoton",
                  marginLeft: "0.7rem",
                  marginTop: "1rem",
                  fontSize: "1.4rem",
                  [theme.breakpoints.down("md")]: {},
                }}
              >
                WIPB
              </Typography>
            </Box>
          </Box>
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
              [theme.breakpoints.down("md")]: {
                right: 15,
                bottom: 60,
              },
              [theme.breakpoints.down("sm")]: {
                right: 13,
                bottom: 35,
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100vw",
          marginTop: "8vh",

          [theme.breakpoints.down("md")]: {
            marginTop: "-2rem",
          },
        }}
      >
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
      </Box>
    </Container>
  );
}
