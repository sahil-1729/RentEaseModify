const {v4:uuidv4}=require("uuid")   
const PropertyLCV=require("../repository/propertyLCV")


const intializePropertyLCVRepository= async (req,res,next)=>{
    try{ 
        const email=req.session.user.email
        const id=req.params.id
        const token=req.cookies.propertyViewsToken || uuidv4();
        console.log(token)
        if(!email){
            return res.status(404).json({message:"User not found"})
        }
        const propertyLCVRepo=new PropertyLCV(email,id,token)
        await propertyLCVRepo.init()
        req.propertyLCVRepo=propertyLCVRepo
        next()        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports=intializePropertyLCVRepository