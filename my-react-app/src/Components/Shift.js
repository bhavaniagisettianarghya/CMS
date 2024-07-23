import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Shift.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export const Shift = () => {
  const initialDayState = {
    shiftStartTime: "",
    shiftEndTime: "",
    lunchBreakStartTime: "",
    lunchBreakEndTime: "",
    takeLunchBreakBeforeMinute: "",
    teaBreakStartTime: "",
    teaBreakEndTime: "",
    takeTeaBreakBeforeMinute: "",
    halfDayAfterTime: "",
    HalfDayBeforeTime: "",
    lateInCountAfterMinutes: "",
    earlyOutCountBeforeMinutes: "",
    minimumHalfDayHours: "",
    minimumFullDayHours: "",
    maximumPersonalBreak: "",
    maximumPunchOutTime: "",
    maximumPunchOutHours: "",
  };

  const [shiftData, setShiftData] = useState({
    shiftName: "",
    hasAutoWeekOff: "",
    weekOffDays: "",
    hasAlternativeWeekOff: "",
    maximumLateIn: "",
    maximumEarlyOut: "",
    applyHalfDayIfLateInLimitExceeded: "",
    requiredReasonOFLateIn: "",
    requiredReasonOfEarlyOut: "",
    multiplePuchInOutAllow: "",
    requiredOutOfRangeReason: "",
    allowShortLeave: "",
    applySandwichLeave: "",
    takeBreakSettings: "",
    addPaidLeaveOnExtraDay: "",
    sameRulesForAllDays: false,
    monday: { ...initialDayState },
    tuesday: { ...initialDayState },
    wednesday: { ...initialDayState },
    thursday: { ...initialDayState },
    friday: { ...initialDayState },
    saturday: { ...initialDayState },
  });

  useEffect(() => {
    if (shiftData.sameRulesForAllDays) {
      setShiftData((prevState) => {
        const updatedData = { ...prevState };
        Object.keys(initialDayState).forEach((key) => {
          const firstDayValue = prevState.monday[key];
          ["tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(
            (day) => {
              updatedData[day][key] = firstDayValue;
            }
          );
        });
        return updatedData;
      });
    } else {
      setShiftData((prevState) => {
        const updatedData = { ...prevState };
        ["tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(
          (day) => {
            updatedData[day] = { ...initialDayState };
          }
        );
        return updatedData;
      });
    }
  }, [shiftData.sameRulesForAllDays]);

  const handleChange = (e, day = "") => {
    const { name, value } = e.target;

    setShiftData((prevState) => {
      const updatedData = { ...prevState };

      if (day) {
        updatedData[day][name] = value;
        if (shiftData.sameRulesForAllDays) {
          [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ].forEach((d) => {
            updatedData[d][name] = value;
          });
        }
      } else {
        updatedData[name] = value;
      }

      return updatedData;
    });
  };
 
  const handleTimeChange = (value, name, day) => {
    setShiftData((prevState) => {
      const updatedData = { ...prevState };
      updatedData[day][name] = value;
      if (shiftData.sameRulesForAllDays) {
        [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ].forEach((d) => {
          updatedData[d][name] = value;
        });
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(shiftData);
    try {
      await axios.post("/api/editShiftTimings", shiftData);
      alert("Shift timings updated successfully!");
    } catch (error) {
      console.error("Error updating shift timings:", error);
    }
  };

  const handleReset = () => {
    const resetData = {
      shiftName: "",
      hasAutoWeekOff: "",
      weekOffDays: "",
      hasAlternativeWeekOff: "",
      maximumLateIn: "",
      maximumEarlyOut: "",
      applyHalfDayIfLateInLimitExceeded: "",
      requiredReasonOFLateIn: "",
      requiredReasonOfEarlyOut: "",
      multiplePuchInOutAllow: "",
      requiredOutOfRangeReason: "",
      allowShortLeave: "",
      applySandwichLeave: "",
      takeBreakSettings: "",
      addPaidLeaveOnExtraDay: "",
      sameRulesForAllDays: false,
      monday: { ...initialDayState },
      tuesday: { ...initialDayState },
      wednesday: { ...initialDayState },
      thursday: { ...initialDayState },
      friday: { ...initialDayState },
      saturday: { ...initialDayState },
    };
    setShiftData(resetData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = () => {
    return shiftData.shiftName.trim() !== "";
  };

  
  return (
    <div className="edit-shift-timings-aaa">
      <h2>SHIFT DETAILS</h2>
      <form onSubmit={handleSubmit}>
        <div className="fff-form">
          <label>
            SHIFT NAME * :
            <input
              type="text"
              name="shiftName"
              value={shiftData.shiftName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            HAS AUTO WEEK OFF * :
            <input
              type="text"
              name="hasAutoWeekOff"
              value={shiftData.hasAutoWeekOff}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            WEEK OFF DAYS * :
            <input
              type="text"
              name="weekOffDays"
              value={shiftData.weekOffDays}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            HAS ALTERNATIVE WEEK OFF * :
            <input
              type="text"
              name="hasAlternativeWeekOff"
              value={shiftData.hasAlternativeWeekOff}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            MAXIMUM LATE IN * :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimePicker"]}
                sx={{ padding: "2px", marginLeft: "2px" }}
              >
                <TimePicker
                  value={shiftData.maximumLateIn}
                  onChange={(value) =>
                    handleChange({ target: { name: "maximumLateIn", value } })
                  }
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </label>

          <label>
            MAXIMUM EARLY OUT * :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimePicker"]}
                sx={{ padding: "2px", marginLeft: "2px" }}
              >
                <TimePicker
                  value={shiftData.maximumEarlyOut}
                  onChange={(value) =>
                    handleChange({ target: { name: "maximumEarlyOut", value } })
                  }
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </label>

          <label>
            APPLY HALF DAY IF LATE IN LIMIT EXCEEDED(THE PROCESS RESET AND
            REPEAT ACCORDINGLY) * :
            <input
              type="text"
              name="applyHalfDayIfLateInLimitExceeded"
              value={shiftData.applyHalfDayIfLateInLimitExceeded}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            REQUIRED REASON OF LATE IN * :
            <input
              type="text"
              name="requiredReasonOFLateIn"
              value={shiftData.requiredReasonOFLateIn}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            REQUIRED REASON OF EARLY OUT * :
            <input
              type="text"
              name="requiredReasonOfEarlyOut"
              value={shiftData.requiredReasonOfEarlyOut}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            MULTIPLE PUNCH IN/OUT ALLOW * :
            <input
              type="text"
              name="multiplePuchInOutAllow"
              value={shiftData.multiplePuchInOutAllow}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            REQUIRED OUT OF RANGE REASON * :
            <input
              type="text"
              name="requiredOutOfRangeReason"
              value={shiftData.requiredOutOfRangeReason}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            ALLOW SHORT LEAVE * :
            <input
              type="text"
              name="allowShortLeave"
              value={shiftData.allowShortLeave}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            APPLY SANDWICH LEAVE * :
            <input
              type="text"
              name="applySandwichLeave"
              value={shiftData.applySandwichLeave}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            TAKE BREAKS SETTING * :
            <input
              type="text"
              name="takeBreakSettings"
              value={shiftData.takeBreakSettings}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            ADD PAID LEAVE ON EXTRA DAY * :
            <input
              type="text"
              name="addPaidLeaveOnExtraDay"
              value={shiftData.addPaidLeaveOnExtraDay}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <center>
          <div className="checkbox-ccc">
            <input
              type="checkbox"
              name="sameRulesForAllDays"
              checked={shiftData.sameRulesForAllDays}
              onChange={(e) =>
                setShiftData((prevState) => ({
                  ...prevState,
                  sameRulesForAllDays: e.target.checked,
                }))
              }
            />
            <h6>Same Rules for All Days</h6>
          </div>
        </center>
        <div className="table1">
          <table>
            <tbody>
              <tr>
                <td>
                  <h6>TYPE</h6>
                </td>
                <td>
                  <h6>monday</h6>
                </td>
                <td>
                  <h6>tuesday</h6>
                </td>
                <td>
                  <h6>wednesday</h6>
                </td>
                <td>
                  <h6>thursday</h6>
                </td>
                <td>
                  <h6>friday</h6>
                </td>
                <td>
                  <h6>saturday</h6>
                </td>
              </tr>
              {Object.keys(initialDayState).map((field, index) => (
                <tr key={index}>
                  <td>{field.replace(/([A-Z])/g, " $1").trim()}</td>
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                  ].map((day, dayIndex) => (
                    <td key={dayIndex}>
                      {[
                        "shiftStartTime",
                        "shiftEndTime",
                        "lunchBreakStartTime",
                        "lunchBreakEndTime",
                        "takeLunchBreakBeforeMinute",
                        "teaBreakStartTime",
                        "teaBreakEndTime",
                      ].includes(field) ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["TimePicker"]}
                            sx={{ padding: "2px", marginLeft: "2px" }}
                          >
                            <TimePicker
                              value={shiftData[day][field]}
                              onChange={(value) =>
                                handleTimeChange(value, field, day)
                              }
                              viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={shiftData[day][field]}
                          onChange={(e) => handleChange(e, day)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-bu">
          <button
            type="button"
            className="update-button"
            disabled={!validateForm()}
            onClick={handleSubmit}
          >
            Update
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shift;





 

// import React from "react";

// export const Shift = () => {

//   const handlesubmit = (e) => {

//    e.preventDefault();
  
//     const first=e.target.fname.value;
//     const last=e.target.lname.value;
//     console.log("Firstname : " + first, "\n", "Lastname : " + last)
//   };

//   return (
//     <>
//       <form onSubmit={handlesubmit}>
//         <input type="text" placeholder="Firstname" name="fname" />
//         <input type="text" placeholder="Lastname" name="lname" />
//         <button type="submit">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }

// export default Shift;