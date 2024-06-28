const express=require("express")
const Router=express.Router();
const userController=require('../controller/userController')

Router.get('/',userController)
Router.post('/',userController)
Router.put('/',userController)
Router.delete('/',userController)
Router.get('/profile',userController)
Router.get('/:id',userController)
Router.get('/:email',userController)
Router.get('/:phonenumber',userController)
Router.get('/:firstname',userController)
module.exports=Router