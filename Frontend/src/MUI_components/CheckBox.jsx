import React from "react";

export default function CheckBox(props) {
  const handleCheckBoxClick = (value) => {
    if (props.onClick) {
      props.onClick(value);
    }
  };

  const checkboxValues = [props.val1, props.val2, props.val3];

  return (
    <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
      {checkboxValues.map((value, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={value}
            onClick={() => handleCheckBoxClick(value)}
          />
          {value}
        </label>
      ))}
    </div>
  );
}
