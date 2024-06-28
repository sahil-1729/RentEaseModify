import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Panel from "../components/360_view/Panel";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import Lizard from "../Baby.jpg";

import "./Card.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate as Navigate,
} from "react-router-dom";

export default function MultiActionAreaCard({
  _id,
  image,
  description,
  address,
  buildingName,
  rentalValue,
  squareFeet,
  noOfBedroom,
  flooring,
  furnishing,
  ageOfConstruct,
}) {
  flooring = `flooring : ${flooring}`;
  ageOfConstruct = `Age : ${ageOfConstruct}`;
  furnishing = `furnishing : ${furnishing}`;

  const temp = description.substr(0, 360) + "...";
  description = description.length > 360 ? temp : description;

  return (
    <div className="bContainer">
      <div className="scontainer">
        <div className="image">
          <img src={image} />
        </div>
        <div className="propDetail">
          <h5>{address}</h5>
          <div className="numDetail">
            <div>{rentalValue}&nbsp;/month</div>
            <div>{squareFeet} &nbsp; sq.ft</div>
            <div>{noOfBedroom} &nbsp; BHK</div>
          </div>
          <div>{description}</div>
          <div>Tags</div>
        </div>
      </div>
      {/* <div > */}
      <Link
        className="cta"
        style={{
          textDecoration: "none",
          color: "black",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 400,
        }}
        to={`/specific/${_id}`}
      >
        <button>Contact owner</button>
      </Link>

      {/* </div> */}
    </div>
  );
}
