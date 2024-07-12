const express=require("express")
const Router=express.Router()
const intializePropertyLCVRepository=require("../middleware/intalizePropertyLCVRepository")
const propertyLCVController=require("../controller/propertyLCVController")

Router.use("/:id",intializePropertyLCVRepository)
Router.post("/:id/like",propertyLCVController.likeProperty)
Router.get("/:id/comment",propertyLCVController.getComments)
Router.post("/:id/comment",propertyLCVController.createComment)
Router.put("/:id/comment",propertyLCVController.updateComment)
Router.delete("/:id/comment",propertyLCVController.deleteComment)
Router.get("/:id/view",propertyLCVController.viewProperty)

module.exports=Router