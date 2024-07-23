// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimeClock } from "@mui/x-date-pickers/TimeClock";

// export default function TimeClockValue() {
//   const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["TimeClock", "TimeClock"]}>
//         <DemoItem label="Uncontrolled clock">
//           <TimeClock defaultValue={dayjs("2022-04-17T15:30")} />
//         </DemoItem>
//         <DemoItem label="Controlled clock">
//           <TimeClock
//             value={value}
//             onChange={(newValue) => setValue(newValue)}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimeClock } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from "dayjs";

const TimePick = () => {
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        label="Select Time"
        variant="outlined"
        value={selectedTime.format("HH:mm")}
        onFocus={(e) => e.target.blur()} // Disable input editing
        onClick={(e) => e.target.nextSibling.focus()} // Open ClockPicker on click
        InputProps={{
          readOnly: true, // Make the input field read-only
        }}
      />
      <TimeClock
        ampm={false}
        openTo="hours"
        value={selectedTime}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>
  );
};

export default TimePick;
