import React from "react";
import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const Reportspiechart = () => {
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

  return (
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
  );
};

export default Reportspiechart;

// import React, { useState, useEffect } from "react";
// import { Typography } from "@mui/material";
// import { PieChart } from "@mui/x-charts";
// import axios from "axios";

// const Reportspiechart = () => {
//   const [seriesData, setSeriesData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {

//         const response = await axios.get("");

//         setSeriesData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalSum = seriesData.reduce((acc, item) => acc + item.value, 0);

//   const completeSeriesData = Array.from(
//     { length: 4 },
//     (_, index) =>
//       seriesData.find((item) => item.id === index) || {
//         id: index,
//         value: 0,
//         label: "",
//       }
//   );

//   return (
//     <div>
//       <Typography variant="h6">
//         <PieChart
//           series={[{ data: completeSeriesData }]}
//           width={400}
//           height={200}
//         />
//       </Typography>
//       <Typography variant="body1">Total Count: {totalSum}</Typography>
//     </div>
//   );
// };

// export default Reportspiechart;
