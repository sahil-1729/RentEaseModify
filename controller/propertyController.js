const Property = require("../models/property");
const PropertyRepository = require("../repository/propertyRepository");
const UserRepository = require("../repository/userRepository");
const propertyFilterRepository=require("../repository/propertyFilterRepository")
const propertyRepo = new PropertyRepository();
const userRepo = new UserRepository();
const propertyFilterRepo=new propertyFilterRepository()
const { deleteFiles } = require("../helpers/fileHelper");
const path = require("path");
const { addTheUrl } = require("../helpers/urlHelper");

const getProperties = async (req, res) => {
  try {
    let properties = await propertyRepo.getProperties();
    properties=addTheUrl(req,properties)
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});
  }
};

const getPropertyByFilters=async (req,res)=>{
  try{
    const filters=req.query.filters?JSON.parse(req.query.filters):{};
    const sortBy=req.query.sortBy?JSON.parse(req.query.sortBy):null;
    let properties=await propertyFilterRepo.getPropertiesBasedOnFilters(filters,sortBy)
    if(!properties){
      res.status(404).json({message:"No property found"})
    }
    properties=addTheUrl(req,properties)
    res.status(200).json(properties)

  }catch(err){
    console.log(err)
    res.status(500).json({message:"Internal Server Error"});
  }
}

const getPropertyByPropertyId = async (req, res) => {
  try {
    const id = req.params.id;
    let property = await propertyRepo.getPropertyByPropertyId(id);
    if (!property) {
      return res.status(404).json({message:"Property not found"});
    }
    property=addTheUrl(req,[property])[0]
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});;
  }
};

const getPropertyByUserPhoneNumber = async (req, res) => {
  try {
    const contactNo = req.params.contactNo;
    const properties = await propertyRepo.getPropertyByUserPhoneNumber(contactNo);
    properties=addTheUrl(req,properties)
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});;
  }
};

const createProperty = async (req, res) => {
  try {
    const email = req.email;
    const findUser = await userRepo.getUserByEmail(email);
    if (!findUser) {
      return res.status(400).json({message:"User not found"});
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
      return res.status(400).json({message:"Please fill out all the details."});
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
    res.status(201).json({message:"Successfully uploaded property"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});;
  }
};

const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({message:"Property not found"});
    }

    const updatedProperty = req.body;
    const updateData = await propertyRepo.updateProperty(id, updatedProperty);
    res.status(200).json({message:"Property has been updated"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});;
  }
};

const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyRepo.getPropertyByPropertyId(id);

    if (!property) {
      return res.status(404).json({message:"Property not found"});
    }

    await deleteFiles(property.images);
    const delProperty = await propertyRepo.deleteProperty(id);

    res.status(200).json({message:"Property deleted"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});;
  }
};

module.exports = {
  getProperties,
  getPropertyByPropertyId,
  getPropertyByUserPhoneNumber,
  getPropertyByFilters,
  createProperty,
  updateProperty,
  deleteProperty,
};
