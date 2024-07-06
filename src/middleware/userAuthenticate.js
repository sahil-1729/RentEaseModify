const userAuthenticate=async (req,res,next)=>{
    if(!req.session.email){
        return res.status(401).send("Unauthorized: Please login again")
    }
    try{
        req.email=req.session.email
        next()
    }catch(err){
        return res.status(401).send("Unauthorized: Please login again")
    }
}

module.exports=userAuthenticate;