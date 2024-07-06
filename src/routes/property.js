const express=require("express")
const Router=express.Router()
const propertyController=require("../controller/propertyController")

Router.get("/",propertyController.getProperties)

Router.get("/id/:id",propertyController.getPropertyByPropertyId)

Router.get("/contactNo/:contactNo",propertyController.getPropertyByUserPhoneNumber)

Router.post("/",propertyController.createProperty)

Router.put("/",propertyController.updateProperty)

Router.delete("/",propertyController.deleteProperty)

module.exports=Router