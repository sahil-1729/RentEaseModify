import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FiltersContext from "../context/filters";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([0, 800000]);
  const [step, setStep] = React.useState(50000);
  const {setRentalValue}=React.useContext(FiltersContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newww = newValue
    setRentalValue([newww[0],newww[1]])
    if (value[0] > 100000 && value[1] > 100000) {

      setStep(100000);
        console.log("step changed ", step)
    }
    else if(value[0] < 100000 && value[1] < 100000){
        setStep(10000)
        console.log("step changed to ", step)
    }else{
        setStep(50000)
    }
    console.log(newValue);
  };

  return (
    <div style={{ paddingLeft: "1.5rem" }}>
      <Box sx={{ width: 250 }}>
        <Slider
          max={1000000}
          getAriaLabel={() => "Property range"}
          value={value}
          marks
          step={step}
          onChange={handleChange}
          valueLabelDisplay="on"
          getAriaValueText={valuetext}
        />
        <div style={{display : "flex", textAlign : "center"}}>
            {value[0] > 100000 ? <div>{value[0]/100000} L </div> : <div>Rs {value[0]}</div>} &nbsp; - &nbsp;
            {value[1] > 100000 ? <div>{value[1]/100000} L </div> : <div>Rs {value[1]}</div>} 
        </div>
      </Box>
    </div>
  );
}
