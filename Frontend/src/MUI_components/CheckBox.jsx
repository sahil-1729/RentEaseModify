import React, { useState } from "react";

export default function CheckBox(props) {
  const handleCheckBoxClick = (value) => {
    if (props.onClick) {
      // const temp = check.find((val) => {
      //   console.log("val - ", val);
      //   console.log(val["param"]);

      //      return parseInt(val.param) == value ? true : false;

      // });

      const temp = check.map((val) => {
        if (val.param === value) {
          val.check = !val.check;
          if (!val.check) {
            value = null;
          }
        }
        return val;
      });
      console.log("temp - ", temp);

      setCheck(temp);
      console.log(value);
      props.onClick(value);
    }
  };

  const checkboxValues = [props.val1, props.val2, props.val3];
  const [check, setCheck] = useState([
    { param: checkboxValues[0], check: false },
    { param: checkboxValues[1], check: false },
    { param: checkboxValues[2], check: false },
  ]);

  return (
    <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
      {checkboxValues.map((value, index) => {
        {
          /* console.log(value); */
        }
        return (
          <label
            style={{
              border: "2px solid red",
              padding: "0.5rem",
              borderRadius: "0.5rem",
            }}
            key={index}
          >
            <input
              type="checkbox"
              // checked={temp.check}
              // value={temp.check ? value : -1}
              onClick={() => handleCheckBoxClick(value)}
            />
            &nbsp;
            {value}
          </label>
        );
      })}
    </div>
  );
}
