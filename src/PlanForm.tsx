import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Box,
  Select,
  MenuItem,
  Tabs,
  Tab as _Tab,
  Typography,
  styled,
  SelectChangeEvent,
  InputBase,
  InputLabel,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { degrees, groupChoice, schedules } from "./types";
import "./styles.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: "rgba(1,1,1,0.5)",
    color: "white",
    border: "1px solid #ced4da",
    fontSize: "1.3rem",
    padding: "10px 26px 3px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Space Mono",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(1,1,1,0.5)",
  border: "1px solid #ced4da",
  padding: theme.spacing(2),
  color: "white",
  fontSize: "1.2rem",
  "& > *": {
    margin: "0",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",

    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("md")]: {
    width: "25vw",
    fontSize: "1.2rem",
    height: "auto",
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,

            [theme.breakpoints.down("md")]: {
              px: 1,
            },
          }}
        >
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const selects = [
  {
    name: "PE",
    label: "Wybierz grupę WF",
  },
  {
    name: "exercise",
    label: "Wybierz grupę ćwiczeniową",
  },
  {
    name: "lab",
    label: "Wybierz grupę laboratoryjną",
  },
  {
    name: "language",
    label: "Wybierz grupę językową",
  },
  {
    name: "workshop",
    label: "Wybierz grupę PS",
  },
];

const settingsSummary = [
  {
    name: "degree",
    label: `📚
    kierunek`,
  },
  {
    name: "semester",
    label: `📆
    semestr`,
  },
  {
    name: "PE",
    label: `⚽️
    grupa WF`,
  },
  {
    name: "exercise",
    label: `✏️
    grupa ćw`,
  },
  {
    name: "lab",
    label: `🧪
    grupa lab`,
  },
  {
    name: "language",
    label: `🌎
    język`,
  },
  {
    name: "workshop",
    label: `🖥️
    grupa PS`,
  },
];

type PlanFormProps = {
  degrees: degrees;
  schedules: schedules;
  setSchedules: (s: schedules) => void;
  triggerSave: number;
};

const Tab = styled(_Tab)({
  color: "white",
  fontFamily: "Space Mono",
  fontWeight: "bold",
  fontSize: "20px",
  "& .MuiButtonBase-root .MuiTab-root .Mui-selected": {
    color: "black",
  },
});

const isSummer = new Date().getMonth() < 9 && new Date().getMonth() > 1;

const semesterChoices = isSummer
  ? [
      { title: "2", value: 2 },
      { title: "4", value: 4 },
      { title: "6", value: 6 },
    ]
  : [
      { title: "1", value: 1 },
      { title: "3", value: 3 },
      { title: "5", value: 5 },
      { title: "7", value: 7 },
    ];

export default function PlanForm({
  degrees,
  schedules,
  setSchedules,
  triggerSave,
}: PlanFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMid = useMediaQuery(theme.breakpoints.down("lg"));

  const [groupChoice, setGroupChoice] = useState<groupChoice>({
    lab: [],
    exercise: [],
    workshop: [],
    language: [],
    PE: [],
  });

  let savedSettings: any = localStorage.getItem("settings");

  if (typeof savedSettings === "string") {
    savedSettings = JSON.parse(savedSettings);
  } else {
    savedSettings = {
      degree: 17,
      semester: semesterChoices[0].value,
      PE: null,
      exercise: 1,
      lab: null,
      language: null,
      workshop: 1,
    };
  }

  console.log(savedSettings);

  const [settings, setSettings] = useState(savedSettings);

  useEffect(() => {
    const groups = {
      lab: new Set<number>(),
      exercise: new Set<number>(),
      workshop: new Set<number>(),
      language: new Set<number>(),
      PE: new Set<number>(),
    };

    const filteredSchedules = schedules.filter((s) => {
      const isDegree = s.degree === settings.degree;
      const isSemester = s.semester === settings.semester;
      return isDegree && isSemester;
    });

    setSchedules(filteredSchedules);

    filteredSchedules.forEach((s) => {
      if (s.type === "P" || s.type === "Ps") groups.workshop.add(s.group);
      if (s.type === "Ćw") groups.exercise.add(s.group);
      if (s.type === "L") groups.lab.add(s.group);
      if (s.type === "J") groups.language.add(s.group);
      if (s.type === "Wf") groups.PE.add(s.group);
    });

    let groupChoiceTemp: groupChoice = {
      lab: [],
      exercise: [],
      workshop: [],
      language: [],
      PE: [],
    };

    groups.lab.forEach((lab: number) => {
      groupChoiceTemp.lab.push({ title: lab.toString(), value: lab });
    });
    groups.exercise.forEach((ex) => {
      groupChoiceTemp.exercise.push({ title: ex.toString(), value: ex });
    });
    groups.workshop.forEach((w) => {
      groupChoiceTemp.workshop.push({ title: w.toString(), value: w });
    });
    groups.language.forEach((lan) => {
      groupChoiceTemp.language.push({ title: lan.toString(), value: lan });
    });
    groups.PE.forEach((pe) => {
      groupChoiceTemp.PE.push({ title: pe.toString(), value: pe });
    });

    setGroupChoice(groupChoiceTemp);
  }, [settings.degree, settings.semester]);

  useEffect(() => {
    const filteredSchedules = schedules.filter((s) => {
      const isDegree = s.degree === settings.degree;
      const isSemester = s.semester === settings.semester;
      const isWorkshop = !!settings.workshop
        ? s.type === "P" || s.type === "Ps"
          ? (s.type === "P" || s.type === "Ps") && settings.workshop === s.group
          : true
        : true;
      const isExercise = !!settings.exercise
        ? s.type === "Ćw"
          ? s.type === "Ćw" && settings.exercise === s.group
          : true
        : true;
      const isLab = !!settings.lab
        ? s.type === "L"
          ? s.type === "L" && settings.lab === s.group
          : true
        : true;
      const isLanguage = !!settings.language
        ? s.type === "J"
          ? s.type === "J" && settings.language === s.group
          : true
        : true;
      const isPE = !!settings.PE
        ? s.type === "Wf"
          ? s.type === "Wf" && settings.PE === s.group
          : true
        : true;
      return (
        isDegree &&
        isSemester &&
        isExercise &&
        isLab &&
        isLanguage &&
        isPE &&
        isWorkshop
      );
    });

    setSchedules(filteredSchedules);
  }, [
    settings.PE,
    settings.exercise,
    settings.lab,
    settings.language,
    settings.workshop,
  ]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSelect = (event: SelectChangeEvent<unknown>) => {
    event.target.name === "workshop" ? setValue(0) : setValue(value + 1);
    event.target.name === "workshop" &&
      window.scrollTo({
        top: 565,
        behavior: "smooth",
      });
    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
    });
  };

  let tabIndex = 1;
  let tabIndex2 = 1;

  const tab1: any = useRef(null);
  const tab2: any = useRef(null);
  const tab3: any = useRef(null);
  const tab4: any = useRef(null);
  const tab5: any = useRef(null);
  const tab6: any = useRef(null);
  const tab7: any = useRef(null);

  const tabs = [
    {
      name: "PE",
      label: "WF",
      ref: tab3,
    },
    {
      name: "exercise",
      label: "ĆWICZENIA",
      ref: tab4,
    },
    {
      name: "lab",
      label: "LABORATORIUM",
      ref: tab5,
    },
    {
      name: "language",
      label: "JĘZYK",
      ref: tab6,
    },
    {
      name: "workshop",
      label: "PS",
      ref: tab7,
    },
  ];

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
  };

  useEffect(() => {
    triggerSave && saveSettings();
  }, [triggerSave]);

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingY: "3rem",
        gap: "1rem",
        [theme.breakpoints.down("lg")]: {
          flexDirection: "column",
          height: "auto",
        },
        [theme.breakpoints.down("md")]: {},
      }}
      // stoi
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "space-around",
          paddingY: "0rem",
          backgroundColor: "rgba(1,1,1,0.6)",
          border: "1px solid #ced4da",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          padding: "0.3rem 1rem",
          borderRadius: "4px",
          [theme.breakpoints.down("md")]: {
            width: "88vw",
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: "2.5rem",
            color: "white",
            fontFamily: "Space Mono",
            textAlign: "center",
            fontWeight: "bold",
            marginY: "2rem",
            [theme.breakpoints.down("md")]: {
              fontSize: "1.8rem",
            },
          }}
          component={"span"}
        >
          <div className="rotate">⚙️</div> Skonfiguruj swój plan lekcji:
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { background: "rgb(47, 238, 245)" } }}
          aria-label="secondary tabs example"
          sx={{ width: "100%" }}
        >
          <Tab
            ref={tab1}
            value={0}
            label="KIERUNEK"
            className="tab"
            onMouseOver={() => {
              tab1.current && tab1.current.focus();
            }}
            onMouseLeave={() => {
              tab1.current && tab1.current.blur();
            }}
          />
          <Tab
            ref={tab2}
            value={1}
            label="SEMESTR"
            className="tab"
            onMouseOver={() => {
              tab2.current && tab2.current.focus();
            }}
            onMouseLeave={() => {
              tab2.current && tab2.current.blur();
            }}
          />
          {tabs.map((t) => {
            const isEnabled =
              !!groupChoice[t.name as keyof typeof groupChoice].length;
            isEnabled && tabIndex++;
            return (
              //na stacji
              <Tab
                ref={t.ref}
                value={isEnabled ? tabIndex : -1}
                label={t.label}
                disabled={!isEnabled}
                className="tab"
                onMouseOver={() => {
                  t.ref.current && t.ref.current.focus();
                }}
                onMouseLeave={() => {
                  t.ref.current && t.ref.current.blur();
                }}
              />
            );
          })}
        </Tabs>
        <TabPanel value={value} index={0}>
          <InputLabel
            sx={{
              color: "white",
              fontSize: "1.5rem",
              fontFamily: "Space Mono",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.2rem",
              },
            }}
            id="degree"
          >
            Wybierz kierunek studiów
          </InputLabel>
          <Select
            name="degree"
            value={settings.degree}
            onChange={handleSelect}
            input={<BootstrapInput />}
          >
            {degrees.map((degree, idx) => (
              <MenuItem key={idx} value={degree.id}>
                {degree.name}
              </MenuItem>
            ))}
          </Select>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InputLabel
            sx={{
              color: "white",
              fontSize: "1.5rem",
              fontFamily: "Space Mono",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.2rem",
              },
            }}
            id="degree"
          >
            Wybierz semestr
          </InputLabel>
          <Select
            name="semester"
            value={settings.semester}
            onChange={handleSelect}
            input={<BootstrapInput />}
          >
            {semesterChoices.map((sem, idx) => (
              <MenuItem key={idx} value={sem.value}>
                {sem.title}
              </MenuItem>
            ))}
          </Select>
        </TabPanel>
        {selects.map((choice, idx) => {
          const isEnabled =
            !!groupChoice[choice.name as keyof typeof groupChoice].length;
          isEnabled && tabIndex2++;
          if (isEnabled)
            return (
              <TabPanel
                key={idx}
                value={value}
                index={isEnabled ? tabIndex2 : -1}
              >
                <InputLabel
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontFamily: "Space Mono",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.2rem",
                    },
                  }}
                  id={choice.name}
                >
                  {choice.label}
                </InputLabel>
                <Select
                  name={choice.name}
                  value={settings[choice.name as keyof typeof settings]}
                  onChange={handleSelect}
                  input={<BootstrapInput />}
                  sx={{
                    "& > ul": {
                      backgroundColor: "green", //i pot
                    },
                  }}
                >
                  {isEnabled &&
                    groupChoice[choice.name as keyof typeof groupChoice]
                      .sort((a, b) => a.value - b.value)
                      .map((c, idx) => (
                        <MenuItem key={idx} value={c.value}>
                          {c.title}
                        </MenuItem> //z niej
                      ))}
                </Select>
              </TabPanel>
            );
        })}
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          width: "20vw",
          // backgroundColor: "red",
          [theme.breakpoints.down("lg")]: {
            flexDirection: "row",
            width: "95vw",
            justifyContent: "space-around",
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: "row",
            width: "100vw",
          },
        }}
      >
        {settingsSummary.map((s) => {
          if (settings[s.name as keyof typeof settings])
            // splywa
            return (
              <Grid item xs={isMobile ? 4 : isMid ? 2 : 12}>
                <Item>
                  {s.name === "degree" ? (
                    <Box
                      sx={{
                        [theme.breakpoints.down("lg")]: {
                          whiteSpace: "pre-line",
                        },
                      }}
                    >
                      {s.label + ": "}
                      <Typography
                        sx={{
                          color: "rgb(47, 238, 245)",
                          fontWeight: "bold",
                          display: "inline",
                        }}
                      >
                        {
                          degrees.find(
                            (d) =>
                              d.id === settings[s.name as keyof typeof settings]
                          )?.id
                        }{" "}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        [theme.breakpoints.down("lg")]: {
                          whiteSpace: "pre-line",
                        },
                      }}
                    >
                      {s.label + ": "}{" "}
                      <Typography
                        sx={{
                          color: "rgb(47, 238, 245)",
                          fontWeight: "bold",
                          display: "inline",
                        }}
                      >
                        {settings[s.name as keyof typeof settings]}
                      </Typography>
                    </Box>
                  )}
                </Item>
              </Grid>
            );
        })}
      </Grid>
    </Box>
  );
}
