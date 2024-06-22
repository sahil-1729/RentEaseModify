import React from "react";
import { useState } from "react";
const FiltersContext = React.createContext();

export const FiltersProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState(null);
  const [rentalValue, setRentalValue] = useState(null);
  const [ageOfConstruction, setAgeOfConstruction] = useState(null);
  const [noOfBedrooms, setNoOfBedrooms] = useState(null);
  const [availableFor, setAvailableFor] = useState(null);
  const [furnishing, setfurnishing] = useState(null);
  const [tags, setTags] = React.useState([]);

  return (
    <FiltersContext.Provider
      value={{
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
        setfurnishing,
        tags,
        setTags,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContext;
