// import React, { useState } from "react";
// import axios from "axios";
// import "./Shift.css";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

// export const Shiftpractice = () => {
//   const initialDayState = {
//     shiftStartTime: "",
//     shiftEndTime: "",
//     lunchBreakStartTime: "",
//     lunchBreakEndTime: "",
//     takeLunchBreakBeforeMinute: "",
//     teaBreakStartTime: "",
//     teaBreakEndTime: "",
//     takeTeaBreakBeforeMinute: "",
//     halfDayAfterTime: "",
//     halfDayBeforeTime: "",
//     lateInCountAfterMinutes: "",
//     earlyOutCountBeforeMinutes: "",
//     minimumHalfDayHours: "",
//     minimumFullDayHours: "",
//     maximumPersonalBreak: "",
//     maximumPunchOutTime: "",
//     maximumPunchOutHours: "",
//   };

//   const [shiftData, setShiftData] = useState({
//     shiftName: "",
//     hasAutoWeekOff: "",
//     weekOffDays: "",
//     hasAlternativeWeekOff: "",
//     maximumLateIn: "",
//     maximumEarlyOut: "",
//     applyHalfDayIfLateInLimitExceeded: "",
//     requiredReasonOFLateIn: "",
//     requiredReasonOfEarlyOut: "",
//     multiplePuchInOutAllow: "",
//     requiredOutOfRangeReason: "",
//     allowShortLeave: "",
//     applySandwichLeave: "",
//     takeBreakSettings: "",
//     addPaidLeaveOnExtraDay: "",
//     sameRulesForAllDays: "",
//     monday: { ...initialDayState },
//     tuesday: { ...initialDayState },
//     wednesday: { ...initialDayState },
//     thursday: { ...initialDayState },
//     friday: { ...initialDayState },
//     saturday: { ...initialDayState },
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e, day = "") => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     let errorMessage = "";

//     if (validateInput(name, newValue)) {
//       setShiftData((prevState) => {
//         const updatedState = {
//           ...prevState,
//           // [day ? day : name]: newValue,
//         };

//         // if (name === "sameRulesForAllDays" && checked) {
//         //   Object.keys(updatedState).forEach((dayKey) => {
//         //     if (
//         //       typeof updatedState[dayKey] === "object" &&
//         //       dayKey !== "sameRulesForAllDays"
//         //     ) {
//         //       Object.keys(updatedState[dayKey]).forEach((fieldKey) => {
//         //         updatedState[dayKey][fieldKey] = newValue;
//         //       });
//         //     }
//         //   });
//         // }
//         if (day) {
//           updatedState[day][name] = value;
//           if (shiftData.sameRulesForAllDays) {
//             [
//               "monday",
//               "tuesday",
//               "wednesday",
//               "thursday",
//               "friday",
//               "saturday",
//             ].forEach((d) => {
//               updatedState[d][name] = value;
//             });
//           }
//         } else {
//           updatedState[name] = value;
//         }

//         return updatedState;
//       });

//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     } else {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: `Invalid input for ${name}`,
//       }));
//     }
//   };

//   const validateInput = (name, value) => {
//     let isValid = true;
//     let errorMessage = "";

//     if (
//       name === "shiftName" ||
//       name === "requiredReasonOFLateIn" ||
//       name === "requiredReasonOfEarlyOut" ||
//       name === "requiredOutOfRangeReason"
//     ) {
//       isValid = /^[A-Za-z\s]+$/.test(value);
//       errorMessage = "Only alphabets are allowed";
//     } else if (
//       name === "hasAutoWeekOff" ||
//       name === "weekOffDays" ||
//       name === "hasAlternativeWeekOff"
//     ) {
//       isValid = /^[0-9]+$/.test(value);
//       errorMessage = "Only numbers are allowed";
//     } else if (name === "maximumLateIn" || name === "maximumEarlyOut") {
//       isValid = /^\d+$/.test(value);
//       errorMessage = "Only numbers are allowed";
//     } else if (name === "time") {
//       isValid = /^[A-Za-z0-9\s]+$/.test(value);
//       errorMessage = "Only numbers are allowed";
//     }

//     if (!isValid) {
//       console.log(`Invalid input for ${name}: ${value}. ${errorMessage}`);
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/editShiftTimings", shiftData);
//       alert("Shift timings updated successfully!");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating shift timings:", error);
//     }
//   };

//   const handleTimeChange = (value, name, day) => {
//     setShiftData((prevState) => {
//       const updatedData = { ...prevState };
//       updatedData[day][name] = value;
//       if (shiftData.sameRulesForAllDays) {
//         [
//           "monday",
//           "tuesday",
//           "wednesday",
//           "thursday",
//           "friday",
//           "saturday",
//         ].forEach((d) => {
//           updatedData[d][name] = value;
//         });
//       }
//       return updatedData;
//     });
//   };

//   const handleReset = () => {
//     const resetData = {
//       shiftName: "",
//       hasAutoWeekOff: "",
//       weekOffDays: "",
//       hasAlternativeWeekOff: "",
//       maximumLateIn: "",
//       maximumEarlyOut: "",
//       applyHalfDayIfLateInLimitExceeded: "",
//       requiredReasonOFLateIn: "",
//       RequiredReasonOFLateOut: "",
//       multiplePuchInOutAllow: "",
//       requiredOutOfRangeReason: "",
//       allowShortLeave: "",
//       applySandwichLeave: "",
//       takeBreakSettings: "",
//       AddPaidLeavesOnExtraDays: "",
//       sameRulesForAllDays: "",
//       monday: { ...initialDayState },
//       tuesday: { ...initialDayState },
//       wednesday: { ...initialDayState },
//       thursday: { ...initialDayState },
//       friday: { ...initialDayState },
//       saturday: { ...initialDayState },
//     };
//     setShiftData(resetData);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const validateForm = () => {
//     return shiftData.shiftName.trim() !== "";
//   };

//   return (
//     <div className="edit-shift-timings-aaa">
//       <h2>SHIFT DETAILS</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="fff-form">
//           <label>
//             SHIFT NAME * :
//             <input
//               type="text"
//               name="shiftName"
//               value={shiftData.shiftName}
//               onChange={handleChange}
//               required
//             />
//             {errors.shiftName && (
//               <span className="error-message">{errors.shiftName}</span>
//             )}
//           </label>

//           <label>
//             HAS AUTO WEEF OFF * :
//             <select
//               name="week"
//               value={shiftData.hasAutoWeekOff}
//               onChange={handleChange}
//               required
//             >
//               <option value="No">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.HasAutoWeek && (
//               <span className="error-message">{errors.HasAutoWeek}</span>
//             )}
//           </label>

//           <label>
//             WEEK OFF DAYS * :
//             <select
//               name="week"
//               value={shiftData.weekOffDays}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.weekOffDays && (
//               <span className="error-message">{errors.WeekOff}</span>
//             )}
//           </label>
//           <label>
//             HAS ALTERNATIVE WEEK OFF * :
//             <input
//               type="text"
//               name="hasAlternativeWeekOff"
//               value={shiftData.hasAlternativeWeekOff}
//               onChange={handleChange}
//               required
//             />
//             {errors.hasAlternativeWeekOff && (
//               <span className="error-message">
//                 {errors.hasAlternativeWeekOff}
//               </span>
//             )}
//           </label>

//           <label>
//             MAXIMUM LATE IN * :
//             <input
//               type="text"
//               name="maximumLateIn"
//               value={shiftData.maximumLateIn}
//               onChange={handleChange}
//               required
//             />
//             {errors.maximumLateIn && (
//               <span className="error-message">{errors.maximumLateIn}</span>
//             )}
//           </label>

//           <label>
//             MAXIMUM EARLY OUT * :
//             <input
//               type="text"
//               name="maximumEarlyOut"
//               value={shiftData.maximumEarlyOut}
//               onChange={handleChange}
//               required
//             />
//             {errors.maximumEarlyOut && (
//               <span className="error-message">{errors.maximumEarlyOut}</span>
//             )}
//           </label>

//           <label>
//             APPLY HALF DAY IF LATE IN LIMIT EXCEEDED(THE PROCESS RESET AND
//             REPEAT ACCORDINGLY) * :
//             <select
//               name="week"
//               value={shiftData.applyHalfDayIfLateInLimitExceeded}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.applyHalfDayIfLateInLimitExceeded && (
//               <span className="error-message">
//                 {errors.applyHalfDayIfLateInLimitExceeded}
//               </span>
//             )}
//           </label>

//           <label>
//             REQUIRED REASON OF LATE IN * :
//             <input
//               type="text"
//               name="requiredReasonOFLateIn"
//               value={shiftData.requiredReasonOFLateIn}
//               onChange={handleChange}
//               required
//             />
//             {errors.requiredReasonOFLateIn && (
//               <span className="error-message">
//                 {errors.requiredReasonOFLateIn}
//               </span>
//             )}
//           </label>

//           <label>
//             REQUIRED REASON OF EARLY OUT * :
//             <input
//               type="text"
//               name="requiredReasonOfEarlyOut"
//               value={shiftData.requiredReasonOfEarlyOut}
//               onChange={handleChange}
//               required
//             />
//             {errors.requiredReasonOfEarlyOut && (
//               <span className="error-message">
//                 {errors.requiredReasonOfEarlyOut}
//               </span>
//             )}
//           </label>

//           <label>
//             MULTIPLE PUNCH IN/OUT ALLOW * :
//             <select
//               name="week"
//               value={shiftData.MultiplePunchIn}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.multiplePuchInOutAllow && (
//               <span className="error-message">
//                 {errors.multiplePuchInOutAllow}
//               </span>
//             )}
//           </label>

//           <label>
//             REQUIRED OUT OF RANGE REASON * :
//             <input
//               type="text"
//               name="requiredOutOfRangeReason"
//               value={shiftData.requiredOutOfRangeReason}
//               onChange={handleChange}
//               required
//             />
//             {errors.requiredOutOfRangeReason && (
//               <span className="error-message">
//                 {errors.requiredOutOfRangeReason}
//               </span>
//             )}
//           </label>

//           <label>
//             ALLOW SHORT LEAVE * :
//             <select
//               name="week"
//               value={shiftData.allowShortLeave}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.allowShortLeave && (
//               <span className="error-message">{errors.allowShortLeave}</span>
//             )}
//           </label>

//           <label>
//             APPLY SANDWICH LEAVE * :
//             <select
//               name="week"
//               value={shiftData.applySandwichLeave}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.applySandwichLeave && (
//               <span className="error-message">{errors.applySandwichLeave}</span>
//             )}
//           </label>

//           <label>
//             TAKE BREAKS SETTING * :
//             <select
//               name="week"
//               value={shiftData.takeBreakSettings}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.takeBreakSettings && (
//               <span className="error-message">{errors.takeBreakSettings}</span>
//             )}
//           </label>

//           <label>
//             ADD PAID LEAVE ON EXTRA DAY * :
//             <select
//               name="week"
//               value={shiftData.addPaidLeaveOnExtraDay}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.addPaidLeaveOnExtraDay && (
//               <span className="error-message">
//                 {errors.addPaidLeaveOnExtraDay}
//               </span>
//             )}
//           </label>

//           <label>
//             LATE IN EARLY OUT APPLY ON EXTRA DAY * :
//             <select
//               name="week"
//               value={shiftData.LateInEarlyOutApplyOnExtraDay}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.LateInEarlyOutApplyOnExtraDay && (
//               <span className="error-message">
//                 {errors.LateInEarlyOutApplyOnExtraDay}
//               </span>
//             )}
//           </label>

//           <label>
//             APPLY LEAVE ON HOLIDAY * :
//             <select
//               name="week"
//               value={shiftData.ApplyLeaveOnHoliday}
//               onChange={handleChange}
//               required
//             >
//               <option value="">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.ApplyLeaveOnHoliday && (
//               <span className="error-message">
//                 {errors.ApplyLeaveOnHoliday}
//               </span>
//             )}
//           </label>

//           <label>
//             APPLY LEAVE ON WEEKOFF * :
//             <select
//               name="week"
//               value={shiftData.ApplyLeaveOnWeekOff}
//               onChange={handleChange}
//               required
//             >
//               <option value="No">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//             {errors.ApplyLeaveOnWeekOff && (
//               <span className="error-message">
//                 {errors.ApplyLeaveOnWeekOff}
//               </span>
//             )}
//           </label>
//         </div>

//         <center>
//           <div className="checkbox-ccc">
//             <input
//               type="checkbox"
//               name="sameRulesForAllDays"
//               checked={shiftData.sameRulesForAllDays}
//               onChange={(e) =>
//                 setShiftData((prevState) => ({
//                   ...prevState,
//                   sameRulesForAllDays: e.target.checked,
//                 }))
//               }
//             />
//             <h6>Same Rules for All Days</h6>
//           </div>
//         </center>

//         <div className="table1">
//           <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <h6>TYPE</h6>
//                 </td>
//                 <td>
//                   <h6>monday</h6>
//                 </td>
//                 <td>
//                   <h6>tuesday</h6>
//                 </td>
//                 <td>
//                   <h6>wednesday</h6>
//                 </td>
//                 <td>
//                   <h6>thursday</h6>
//                 </td>
//                 <td>
//                   <h6>friday</h6>
//                 </td>
//                 <td>
//                   <h6>saturday</h6>
//                 </td>
//               </tr>
//               {Object.keys(initialDayState).map((field, index) => (
//                 <tr key={index}>
//                   <td>{field.replace(/([A-Z])/g, " $1").trim()}</td>
//                   {[
//                     "monday",
//                     "tuesday",
//                     "wednesday",
//                     "thursday",
//                     "friday",
//                     "saturday",
//                   ].map((day, dayIndex) => (
//                     <td key={dayIndex}>
//                       {[
//                         "shiftStartTime",
//                         "shiftEndTime",
//                         "lunchBreakStartTime",
//                         "lunchBreakEndTime",
//                         "takeLunchBreakBeforeMinute",
//                         "teaBreakStartTime",
//                         "teaBreakEndTime",
//                       ].includes(field) ? (
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                           <DemoContainer
//                             components={["TimePicker"]}
//                             sx={{ padding: "2px", marginLeft: "2px" }}
//                           >
//                             <TimePicker
//                               name="time"
//                               // value={shiftData[day][field]}
//                               onChange={(value) =>
//                                 handleTimeChange(value, field, day)
//                               }
//                               viewRenderers={{
//                                 hours: renderTimeViewClock,
//                                 minutes: renderTimeViewClock,
//                                 seconds: renderTimeViewClock,
//                               }}
//                             />
//                           </DemoContainer>
//                         </LocalizationProvider>
//                       ) : (
//                         <input
//                           type="text"
//                           name={field}
//                           value={shiftData[day][field]}
//                           onChange={(e) => handleChange(e, day)}
//                         />
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="button-bu">
//           <button
//             type="button"
//             className="update-button"
//             disabled={!validateForm()}
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             Update
//           </button>
//           <button type="button" className="reset-button" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default Shiftpractice;

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text" sx={{ color: "red" }}>
        Text
      </Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
