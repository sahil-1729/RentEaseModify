const express=require('express')
const Router=express.Router()
const authController=require('../controller/authController')

Router.get('/signup',authController)
Router.post('/signup',authController)
Router.get('/otp',authController)
Router.post('/otp',authController)
Router.get('/login',authController)
Router.post('/login',authController)
Router.post('/changePassword',authController)
Router.post('/logout',authController)


module.exports=Router