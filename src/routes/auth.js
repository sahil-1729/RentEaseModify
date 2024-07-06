const express=require('express')
const Router=express.Router()
const authController=require('../controller/authController')

Router.post('/signup',authController.signup)
Router.post('/login',authController.login)
Router.post('/changePassword',authController.changepassword)
Router.post('/logout',authController.logout)


module.exports=Router