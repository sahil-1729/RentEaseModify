import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Card from "../MUI_components/Card";
import Divider from "@mui/material/Divider";
import Accordion from "../MUI_components/Accordion";
import MapIcon from "@mui/icons-material/Map";
import StreetviewIcon from "@mui/icons-material/Streetview";
import Slider from "../MUI_components/Slider";
import FiltersContext from "../context/filters";
import "./PropertyList.css";

const PropertyList = () => {
  const {
    searchValue,
    setSearchValue,
    rentalValue,
    noOfBedrooms,
    ageOfConstruction,
    availableFor,
    furnishing
  } = useContext(FiltersContext);
  const [details, setDetails] = useState([]);
  const queryParams = {
    search: searchValue, // Use the entire state object as the search value
    rentalValue: searchValue
      ? null
      : rentalValue && rentalValue[1]
      ? rentalValue[1]
      : null,
    ageOfConstruction: searchValue ? null : ageOfConstruction,
    furnishing: searchValue ? null : furnishing,
    availableFor: searchValue ? null : availableFor,
    noOfBedrooms: searchValue ? null : noOfBedrooms,
  };
  // console.log("", rentalValue);
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/properties/`, {
          params: queryParams,
        });

        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setSearchValue("");
  }, [
    rentalValue,
    ageOfConstruction,
    furnishing,
    availableFor,
    noOfBedrooms,
    searchValue,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        // gap: "10rem",
        // paddingLeft: "14rem",
      }}
    >
      <NavBar />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10rem",
          // paddingLeft: "14rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={
            {
              //  width: "50%"
              // flexBasis: "70%",
              // paddingLeft: "12.5rem",
            }
          }
        >
          <Accordion
            head1="Budget"
            head2="Age of Property"
            head3="Furnishing"
            head4="Available for"
            head5="Number of Bedrooms"
            Slider={Slider}
          />
        </div>
        <div
          style={
            {
              //  paddingRight: "12.5rem"
            }
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // paddingRight: "15.5rem",
            }}
          >
            <div
              style={{
                paddingLeft: "0rem",
                fontWeight: "700",
                fontSize: "2rem",
              }}
            >
              &nbsp; {details.length} results
            </div>
            <a href="http://www.mappls.com">
              <StreetviewIcon />
            </a>
            <a href="http://www.mappls.com">
              <MapIcon />
            </a>
          </div>
          <br />
          <Divider />
          <br />
          <div
            className="DisplayProd"
            style={{
              // width: "60%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {
              details.map((val)=>{
                const addressString = `${val.address.street}, ${val.address.area}, ${val.address.city}, ${val.address.state}, ${val.address.postalCode}, ${val.address.country}`;
                const image=val.images[0].fileName  
              return (
              <Card
              key={val._id}                  rentalValue={val.rentalValue}
                  address={addressString}
                  noOfBedroom={val.noOfBedroom}
                  squareFeet={val.squareFeet}
                  description={val.description}
                  image={image}
                  _id={val._id}
                  flooring={val.flooring}
                  furnishing={val.furnishing}
                  ageOfConstruct={val.ageOfConstruction}
                />
              );
              })}
          </div>
          <br />
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default PropertyList;
