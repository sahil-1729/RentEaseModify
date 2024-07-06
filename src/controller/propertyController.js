const PropertyRepository=require("../repository/propertyRepository")
const propertyRepo=new PropertyRepository();

const getProperties=async (req,res)=>{
    try{
        const properties=await propertyRepo.getProperties()
        res.send(properties);
    }catch(err){
        console.log(err)
    }
}