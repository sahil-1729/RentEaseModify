import Calendar from "react-calendar";
import "./Cal.css";
import "./Prop.css";
import { useEffect, useState } from "react";
var FinalDate;
const DateValue = () => {
  console.log("The final date", FinalDate);
  return FinalDate;
};

const Calen = ({ setInputDate }) => {
  // const [value, onChange] = useState<Value>(new Date());

  const [selectedDate, changeDate] = useState(null);
  const carnage = (date) => {
    // console.log("before", selectedDate);
    const dateToBeUpdated = date;
    // selectedDate = e
    changeDate(dateToBeUpdated);
    FinalDate = dateToBeUpdated.toDateString();
    setInputDate(FinalDate);
    console.log("selected date", selectedDate);
    // console.log("clicked");
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
        <Calendar
          value={selectedDate}
          onClickDay={(e) => {
            carnage(e);
            // onChange()
          }}
        />
         <div>
          {selectedDate == null ? (
            <div></div>
          ) : (
            <div>
              <h3>Date : {selectedDate.toDateString()}</h3>
              {/* <h2>Add new event</h2> */}

            </div>
          )}
          </div>
      </div>
    </div>
  );
};
export { Calen, DateValue };
