import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Font,
} from "@react-pdf/renderer";

// import mb from "mb.ttf"

Font.register({
  family: "mono",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const lessonTypes = [
  { type: "wykład", color: "rgba(156, 245, 108, 0.9)", short: "W" },
  { type: "ćwiczenia", color: "rgba(245, 113, 108, 0.9)", short: "Ćw" },
  { type: "laboratorium", color: "rgba(224, 108, 245, 0.9)", short: "L" },
  {
    type: "pracownia specjalistyczna",
    color: "rgba(108, 245, 236, 0.9)",
    short: "Ps",
  },
  { type: "inne", color: "rgba(255,255,255,0.9)", short: "x" },
];

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
    fontFamily: "mono",
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    border: "1px solid black",
    padding: "6px",
    width: "19%",
    textAlign: "center",
    fontSize: "14px",
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
  },
  tableCell1: {
    border: "1px solid black",
    width: "5%",
    fontSize: "13px",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: "4px",
  },
});

type PlanPdfProps = {
  rows: any;
};

export const PlanPdf = ({ rows }: PlanPdfProps) => {
  return (
    <Document>
      <Page orientation="landscape">
        <View
          style={styles.tableContainer}
          // style={{
          //   width: "
        >
          <View
            style={styles.table}
            // style={{
            //   border: "2px solid white",
            //   backgroundColor: "rgba(1,1,1,0.6)",
            // }}
          >
            <View style={styles.tableRow}>
              <View
                style={styles.tableCell1}
                // width="15%"
              ></View>
              <View
                style={styles.tableCell}
                // style={{ fontSize: "1.2rem", padding: "0.8rem" }}
                // align="center"
                // width="17%"
              >
                <Text>PONIEDZIAŁEK</Text>
              </View>
              <View
                style={styles.tableCell}
                // style={{ fontSize: "1.2rem", padding: "0.8rem" }}
                // align="center"
                // width="17%"
              >
                <Text>WTOREK</Text>
              </View>
              <View
                style={styles.tableCell}
                // style={{ fontSize: "1.2rem", padding: "0.8rem" }}
                // align="center"
                // width="17%"
              >
                <Text>ŚRODA</Text>
              </View>
              <View
                style={styles.tableCell}
                // style={{ fontSize: "1.2rem", padding: "0.8rem" }}
                // align="center"
                // width="17%"
              >
                <Text>CZWARTEK</Text>
              </View>
              <View
                style={styles.tableCell}
                // style={{ fontSize: "1.2rem", padding: "0.8rem" }}
                // align="center"
                // width="17%"
              >
                <Text>PIĄTEK</Text>
              </View>
            </View>
            <View>
              {rows.map((row: any) => (
                <View style={styles.tableRow} key={row[0].lesson}>
                  <View
                    style={styles.tableCell1}
                    // data-lesson-type={row[0].type}
                    // align="center"
                    // scope="row"
                  >
                    <Text>
                      {row[0].lesson.slice(0, row[0].lesson.indexOf("-"))}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        backgroundColor:
                          lessonTypes.find((lt) => lt.short == row[1].type)
                            ?.color || "transparent",
                      },
                    ]}
                    data-lesson-type={row[1].type}
                  >
                    <Text>{row[1].lesson}</Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        backgroundColor:
                          lessonTypes.find((lt) => lt.short == row[2].type)
                            ?.color || "transparent",
                      },
                    ]}
                    data-lesson-type={row[2].type}
                  >
                    <Text>{row[2].lesson}</Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        backgroundColor:
                          lessonTypes.find((lt) => lt.short == row[3].type)
                            ?.color || "transparent",
                      },
                    ]}
                    data-lesson-type={row[3].type}
                  >
                    <Text>{row[3].lesson}</Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        backgroundColor:
                          lessonTypes.find((lt) => lt.short == row[4].type)
                            ?.color || "transparent",
                      },
                    ]}
                    data-lesson-type={row[4].type}
                  >
                    <Text>{row[4].lesson}</Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        backgroundColor:
                          lessonTypes.find((lt) => lt.short == row[5].type)
                            ?.color || "transparent",
                      },
                    ]}
                    data-lesson-type={row[5].type}
                  >
                    <Text>{row[5].lesson}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              // width: "100%",
              height: "100px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {lessonTypes.map((lt) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "10px",
                  // width: "fit-content",
                  gap: "10px",
                  width: "110px",
                }}
              >
                <View
                  style={{
                    width: "40px",
                    height: "20px",
                    borderRadius: "20px",
                    backgroundColor: lt.color,
                    border: "1px solid black",
                  }}
                ></View>
                <View
                  style={{
                    color: "black",
                    fontSize: "12px",
                  }}
                >
                  <Text>
                    {lt.type == "pracownia specjalistyczna"
                      ? lt.short
                      : lt.type}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
