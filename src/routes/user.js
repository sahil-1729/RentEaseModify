const express=require('express')
const Router=express.Router()
const userController=require('../controller/userController')

Router.get('/profile',userController)
Router.get('/chat/:id',userController)

module.exports=Router