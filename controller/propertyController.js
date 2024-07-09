const Property = require("../models/property");
const PropertyRepository = require("../repository/propertyRepository");
const UserRepository = require("../repository/userRepository");
const propertyRepo = new PropertyRepository();
const userRepo = new UserRepository();
const { deleteFiles } = require("../helpers/fileHelper");
const path = require("path");

const getProperties = async (req, res) => {
  try {
    const properties = await propertyRepo.getProperties();
    res.status(200).send(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getPropertyByPropertyId = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyRepo.getPropertyByPropertyId(id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.status(200).send(property);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getPropertyByUserPhoneNumber = async (req, res) => {
  try {
    const contactNo = req.params.contactNo;
    const properties = await propertyRepo.getPropertyByUserPhoneNumber(contactNo);
    res.status(200).send(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const createProperty = async (req, res) => {
  try {
    const email = req.email;
    const findUser = await userRepo.getUserByEmail(email);
    if (!findUser) {
      return res.status(400).send("User not found");
    }
    const contactNo = findUser.phonenumber;
    const {
      propertyType,
      buildingName,
      facing,
      squareFeet,
      securityDeposit,
      furnishing,
      flooring,
      floor,
      ageOfConstruction,
      waterAvailability,
      numberOfLifts,
      electricityStatus,
      landmark,
      noOfBedroom,
      noOfBathroom,
      rentalValue,
      description,
      availableFor,
      availableFrom,
      noOfBalconies,
    } = req.body;

    const address = {
      street: req.body["address.street"],
      area: req.body["address.area"],
      city: req.body["address.city"],
      state: req.body["address.state"],
      postalCode: req.body["address.postalCode"],
      country: req.body["address.country"],
    };

    const images = req.files.map((file) => ({
      fileName: file.path,
    }));

    if (
      !propertyType ||
      !buildingName ||
      !facing ||
      !squareFeet ||
      !securityDeposit ||
      !furnishing ||
      !flooring ||
      !ageOfConstruction ||
      !waterAvailability ||
      !numberOfLifts ||
      !electricityStatus ||
      !landmark ||
      !noOfBedroom ||
      !noOfBathroom ||
      !rentalValue ||
      !description ||
      !availableFor ||
      !availableFrom ||
      !noOfBalconies ||
      !floor ||
      !address.street ||
      !address.area ||
      !address.city ||
      !address.state ||
      !address.postalCode ||
      !address.country
    ) {
      return res.status(400).send("Please fill out all the details.");
    }

    const propertyDetails = new Property({
      images,
      propertyType,
      buildingName,
      facing,
      contactNo,
      squareFeet,
      securityDeposit,
      furnishing,
      floor,
      flooring,
      ageOfConstruction,
      waterAvailability,
      numberOfLifts,
      landmark,
      noOfBedroom,
      availableFor,
      availableFrom,
      noOfBalconies,
      noOfBathroom,
      rentalValue,
      description,
      electricityStatus,
      address,
    });

    await propertyRepo.createProperty(propertyDetails);
    res.status(201).send("Successfully uploaded property");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("Property not found");
    }

    const updatedProperty = req.body;
    const updateData = await propertyRepo.updateProperty(id, updatedProperty);
    res.status(200).send(updateData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyRepo.getPropertyByPropertyId(id);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    await deleteFiles(property.images);
    const delProperty = await propertyRepo.deleteProperty(id);

    res.status(200).send("Property deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getProperties,
  getPropertyByPropertyId,
  getPropertyByUserPhoneNumber,
  createProperty,
  updateProperty,
  deleteProperty,
};
