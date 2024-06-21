import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Card from "../MUI_components/Card";
import Divider from "@mui/material/Divider";
import Accordion from "../MUI_components/Accordion";
import MapIcon from "@mui/icons-material/Map";
import StreetviewIcon from '@mui/icons-material/Streetview';
import  Slider from "../MUI_components/Slider";
import FiltersContext from "../context/filters";

const PropertyList = () => {
   const {
    searchValue,
    setSearchValue,  
    rentalValue,
    setRentalValue,
    noOfBedrooms,
    setNoOfBedrooms,
    ageOfConstruction,
    setAgeOfConstruction,
    availableFor,
    setAvailableFor,
    furnishing,
    setfurnishing}=useContext(FiltersContext)
  const [details, setDetails] = useState([]);
  const queryParams = {
    search: searchValue, // Use the entire state object as the search value
    rentalValue: searchValue ? null : (rentalValue && rentalValue[1] ? rentalValue[1] : null),
    ageOfConstruction: searchValue ? null : ageOfConstruction,
    furnishing: searchValue ? null : furnishing,
    availableFor: searchValue ? null : availableFor,
    noOfBedrooms: searchValue ? null : noOfBedrooms,
  };
  console.log(rentalValue)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/property", {
          params: queryParams,
        });
  
        console.log(response.data[0]);
        setDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [rentalValue, ageOfConstruction, furnishing, availableFor, noOfBedrooms,searchValue]);
  

  return (
    <div>
      <div>
      </div>
      <NavBar />
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "3rem", paddingLeft: "10rem" }}>
        <div style={{ width: "50%" }}>
          <Accordion
            head1="Budget"
            head2="Age of Property"
            head3="Furnishing"
            head4="Available for"
            head5="Number of Bedrooms"
            Slider={Slider} 
          />
        </div>
        <div style={{}}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "15.5rem" }}>
            <div style={{ paddingLeft: "0rem", fontWeight: "700", fontSize: "2rem" }}>&nbsp; {details.length} results</div>
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
          <div className="DisplayProd" style={{ width: "60%", display: "flex", justifyContent: "center", flexDirection: "column", gap: "1.5rem", flexWrap: "wrap" }}>
            {details.map((val) => (
              <Card
                rentalValue={val.rentalValue}
                address={val.address}
                noOfBedroom={val.noOfBedroom}
                squareFeet={val.squareFeet}
                description={val.description}
                image={val.images}
                _id={val._id}
                flooring={val.flooring}
                furnishing={val.furnishing}
                ageOfConstruct={val.ageOfConstruction}
              />
            ))}
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
