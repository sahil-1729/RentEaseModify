import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Set the desired timezone (GMT+5:30)
dayjs.tz.setDefault("Asia/Kolkata");
var finalSelectedTime;
function TransferTime (){
    const o = {
        time : finalSelectedTime
    }
    return o
}
const BasicTimePicker = ({setInputTime}) => {
  const [selectedTime, setSelectedTime] = React.useState(null);

  const check = (e) => {
    // console.log(e);
    // console.log(e.toString());
    // console.log(e.time);
    const selectTime = e;
    setSelectedTime(selectTime);
    //print the selected time
    // console.log("Selected Time",selectedTime);
    // console.log(dayjs(selectTime).tz("Asia/Kolkata").format("HH:mm"));
    finalSelectedTime = dayjs(selectTime).tz("Asia/Kolkata").format("HH:mm")
    setInputTime(finalSelectedTime)
    // console.log("value of finalSelectedTime is ", finalSelectedTime, typeof finalSelectedTime)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          label="Choose a time"
          ampm={false}
          onAccept={(e) => {
            check(e);
          }}
          onChange={(e) => {
            check(e);
          }}
        />
        <div>
          {selectedTime == null ? (
            <div></div>
          ) : (
            <div>
              {/* {dayjs(selectedTime) .tz("Asia/Kolkata").format("HH:mm:ss")} &nbsp; */}
              {/* {selectedTime.toString()} */}
            </div>
          )}
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
export { BasicTimePicker, TransferTime }