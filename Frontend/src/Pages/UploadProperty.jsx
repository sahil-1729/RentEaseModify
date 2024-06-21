import React from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const PropertyUpload = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Upload Property Information
        </Typography>
        <form
          action="/api/user/property"
          method="POST"
          encType="multipart/form-data"
        >
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="propertyType">Property Type:</InputLabel>
            <Select id="propertyType" name="propertyType" required>
              <MenuItem value="sell">Sell</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="buildingName"
            name="buildingName"
            label="Building Name"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="availableFrom"
            name="availableFrom"
            label="Available From"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="noOfBalconies"
            name="noOfBalconies"
            label="No Of Balconies"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="floor"
            name="floor"
            label="Floor"
            variant="outlined"
            fullWidth
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="facing">Facing:</InputLabel>
            <Select id="facing" name="facing" required>
              <MenuItem value="east">East</MenuItem>
              <MenuItem value="west">West</MenuItem>
              <MenuItem value="north">North</MenuItem>
              <MenuItem value="south">South</MenuItem>
              <MenuItem value="northeast">Northeast</MenuItem>
              <MenuItem value="northwest">Northwest</MenuItem>
              <MenuItem value="southeast">Southeast</MenuItem>
              <MenuItem value="southwest">Southwest</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="availableFor">Available For:</InputLabel>
            <Select id="availableFor" name="availableFor" required>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="man">Man</MenuItem>
              <MenuItem value="woman">Woman</MenuItem>
              <MenuItem value="bachelor">Bachelor</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="couple">Couple</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="squareFeet"
            name="squareFeet"
            label="Square Feet"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="securityDeposit"
            name="securityDeposit"
            label="Security Deposit"
            type="number"
            variant="outlined"
            fullWidth
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="furnishing">Furnishing:</InputLabel>
            <Select id="furnishing" name="furnishing" required>
              <MenuItem value="furnished">Furnished</MenuItem>
              <MenuItem value="semi-furnished">Semi-furnished</MenuItem>
              <MenuItem value="unfurnished">Unfurnished</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="flooring"
            name="flooring"
            label="Flooring"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="ageOfConstruction"
            name="ageOfConstruction"
            label="Age of Construction"
            type="number"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="waterAvailability"
            name="waterAvailability"
            label="Water Availability"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="numberOfLifts"
            name="numberOfLifts"
            label="Number of Lifts"
            type="number"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="electricityStatus"
            name="electricityStatus"
            label="Electricity Status"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="landmark"
            name="landmark"
            label="Landmark"
            variant="outlined"
            fullWidth
          />

          <TextField
            id="noOfBedroom"
            name="noOfBedroom"
            label="Number of Bedrooms"
            type="number"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="noOfBathroom"
            name="noOfBathroom"
            label="Number of Bathrooms"
            type="number"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="rentalValue"
            name="rentalValue"
            label="Rental Value"
            type="number"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="description"
            name="description"
            aria-label="Description"
            minRows={3}
            placeholder="Description"
            style={{ width: "100%" }}
          />

          <TextField
            id="street"
            name="address.street"
            label="Street"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="area"
            name="address.area"
            label="Area"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="city"
            name="address.city"
            label="City"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="state"
            name="address.state"
            label="State"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="postalCode"
            name="address.postalCode"
            label="Postal Code"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            id="country"
            name="address.country"
            label="Country"
            variant="outlined"
            fullWidth
            required
          />

          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default PropertyUpload;
