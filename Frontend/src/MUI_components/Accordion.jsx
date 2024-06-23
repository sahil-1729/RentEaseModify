import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBox from "./CheckBox";
import filtersContext from "../context/filters";
import Slider from "./Slider";
import { useContext } from "react";
import FiltersContext from "../context/filters";

export default function BasicAccordion() {
  const {
    setRentalValue,
    setNoOfBedrooms,
    setAgeOfConstruction,
    setAvailableFor,
    setfurnishing,
  } = useContext(FiltersContext);

  const handleFilterCLick = (value, setter, resetters) => {
    setter(value);
    console.log(value);
    resetters.forEach((resetter) => resetter(null));
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "medium", fontSize: "1.25rem" }}>
            Budget
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Slider ? (
            <Slider
              onChange={(value) =>
                handleFilterCLick(value, setRentalValue, [
                  setAgeOfConstruction,
                  setAvailableFor,
                  setNoOfBedrooms,
                  setfurnishing,
                ])
              }
            />
          ) : (
            ""
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: "medium", fontSize: "1.25rem" }}>
            Age of Property
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="1"
            val2="2"
            val3="11"
            // val4="4"
            // val5="5"
            onClick={(value) =>
              handleFilterCLick(value, setAgeOfConstruction, [
                setAvailableFor,
                setNoOfBedrooms,
                setfurnishing,
                setRentalValue,
              ])
            }
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: "medium", fontSize: "1.25rem" }}>
            Furnishing
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="unfurnished"
            val2="furnished"
            val3="semi-furnished"
            onClick={(value) =>
              handleFilterCLick(value, setfurnishing, [
                setRentalValue,
                setAgeOfConstruction,
                setAvailableFor,
                setNoOfBedrooms,
              ])
            }
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: "medium", fontSize: "1.25rem" }}>
            Available For
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="Bachelor"
            val2="Family"
            val3="Single Women"
            onClick={(value) =>
              handleFilterCLick(value, setAvailableFor, [
                setAgeOfConstruction,
                setRentalValue,
                setNoOfBedrooms,
                setfurnishing,
              ])
            }
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: "medium", fontSize: "1.25rem" }}>
            Bedroom
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="1"
            val2="2"
            val3="3"
            onClick={(value) =>
              handleFilterCLick(value, setNoOfBedrooms, [
                setAgeOfConstruction,
                setAvailableFor,
                setAvailableFor,
                setfurnishing,
              ])
            }
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
