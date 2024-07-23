import React, { useState } from "react";
import { PieChart } from "@mui/x-charts";
import {
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Reportspiechart from "./Reportspiechart"; 

const ReportsPage = () => {
  const [reportType, setReportType] = useState("weekly");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const seriesData = [
    { id: 0, value: 5, label: "Present 5" },
    { id: 1, value: 0, label: "Absent 0" },
    { id: 2, value: 1, label: "WeekOff 1" },
    { id: 3, value: 1, label: "Holiday 1" },
  ];

  const totalSum = seriesData.reduce((acc, item) => acc + item.value, 0);

  const completeSeriesData = Array.from(
    { length: 4 },
    (_, index) =>
      seriesData.find((item) => item.id === index) || {
        id: index,
        value: 0,
        label: "",
      }
  );

  const handleReportTypeChange = (event) => {
    const { value } = event.target;
    console.log("Selected report type:", value);
    setReportType(value);

  
    if (value === "weekly") {
      const today = new Date();
      const currentWeek = Math.ceil((today.getDate() + today.getDay()) / 7);
      setSelectedMonth(currentWeek);
      setSelectedYear("");
    } else if (value === "monthly") {
      const today = new Date();
      setSelectedMonth(today.getMonth() + 1);
      setSelectedYear(today.getFullYear());
    } else if (value === "yearly") {
      const today = new Date();
      setSelectedMonth("");
      setSelectedYear(today.getFullYear());
    }
  };

  const handleMonthChange = (event) => {
    const { value } = event.target;
    console.log("Selected month:", value);
    setSelectedMonth(value);
    if (selectedYear) {
      console.log("Selected year:", selectedYear);
    }
  };

  const handleYearChange = (event) => {
    const { value } = event.target;
    console.log("Selected year:", value);
    setSelectedYear(value);
    if (selectedMonth) {
      console.log("Selected month:", selectedMonth);
    }
  };

  const getReportHeading = () => {
    switch (reportType) {
      case "weekly":
        return "Weekly Status";
      case "monthly":
        return "Monthly Status";
      case "yearly":
        return "Yearly Status";
      default:
        return "Reports";
    }
  };

  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        // marginTop:"-20%",
      }}
    >
      <div>
        <div style={{ textAlign: "center", marginTop: "-165px" }}>
          <Typography variant="h4" gutterBottom>
            {getReportHeading()}
          </Typography>
        </div>
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
            }}
            onClick={() => console.log("Back button clicked")}
          >
            <ArrowBackIosIcon />
            <Typography variant="body1" style={{ marginLeft: 5 }}>
              Back to attendance
            </Typography>
          </div>
        </div>
        <div>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h6">Select Report Type:</Typography>
            </Grid>
            <Grid item>
              <Select value={reportType} onChange={handleReportTypeChange}>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                {/* <MenuItem value="yearly">Yearly</MenuItem> */}
              </Select>
            </Grid>
            {reportType === "monthly" && (
              <>
                <Grid item>
                  <Typography variant="h6">Select Month:</Typography>
                </Grid>
                <Grid item>
                  <Select value={selectedMonth} onChange={handleMonthChange}>
                    <MenuItem value="">All Months</MenuItem>
                    {Array.from({ length: 12 }, (_, index) => {
                      const month = new Date(0, index).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      );
                      return (
                        <MenuItem key={month} value={index + 1}>
                          {month}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </>
            )}
            {(reportType === "monthly" || reportType === "yearly") && (
              <>
                <Grid item>
                  <Typography variant="h6">Select Year:</Typography>
                </Grid>
                <Grid item>
                  <Select value={selectedYear} onChange={handleYearChange}>
                    <MenuItem value="">All Years</MenuItem>
                    {Array.from({ length: 5 }, (_, index) => {
                      const year = 2020 + index;
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </>
            )}
          </Grid>
        </div>
        {(reportType === "weekly" ||
          reportType === "monthly" ||
          reportType === "yearly") && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              marginTop: "100px",
            }}
          >
            {/* <Reportspiechart
              reportType={reportType}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            /> */}

            <div sx={{ display: "ruby-text" }}>
              <Typography variant="h6">
                <PieChart
                  series={[{ data: completeSeriesData }]}
                  width={400}
                  height={200}
                />
              </Typography>
              <Typography variant="body1">Total Count: {totalSum}</Typography>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ReportsPage;



