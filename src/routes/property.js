const express = require("express");
const Router = express.Router();
const propertyController = require("../controller/propertyController");
const userAuthenticate = require("../middleware/userAuthenticate");
const configureMulterStorage = require("../helpers/multerHelper");

const upload = configureMulterStorage("/public");

Router.get("/", propertyController.getProperties);
Router.get("/id/:id", propertyController.getPropertyByPropertyId);
Router.get(
  "/contactNo/:contactNo",
  propertyController.getPropertyByUserPhoneNumber
);
Router.post(
  "/",
  userAuthenticate,
  upload.array("images"),
  propertyController.createProperty
);
Router.put("/:id", userAuthenticate, propertyController.updateProperty);
Router.delete("/:id", userAuthenticate, propertyController.deleteProperty);

module.exports = Router;
