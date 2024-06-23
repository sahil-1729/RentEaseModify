import React, { useState } from "react";

export default function CheckBox(props) {
  const handleCheckBoxClick = (value) => {
    if (props.onClick) {
      props.onClick(value);

      // setCheck();
    }
  };

  const [check, setCheck] = useState([false, false, false]);
  const checkboxValues = [props.val1, props.val2, props.val3];

  return (
    <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
      {checkboxValues.map((value, index) => (
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
            // checked={check}
            value={value}
            onClick={() => handleCheckBoxClick(value)}
          />
          &nbsp;
          {value}
        </label>
      ))}
    </div>
  );
}
