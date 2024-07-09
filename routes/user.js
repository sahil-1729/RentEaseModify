const express=require('express')
const Router=express.Router()
const userController=require('../controller/userController')
const userAuthenticate=require("../middleware/userAuthenticate")
Router.get('/profile',userAuthenticate,userController.userProfile)
//Router.get('/chat/:id',userController)

module.exports=Router