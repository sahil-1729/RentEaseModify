const express=require('express')
const Router=express.Router()
const authController=require('../controller/authController')

Router.post('/signup',authController.signup)
Router.post('/otpverification',authController.otpverification)
Router.get('/login',(req,res)=>{
    res.render("login")
})
Router.post('/login',authController.login)
Router.post('/changePassword',authController.changepassword)
Router.post('/logout',authController.logout)


module.exports=Router