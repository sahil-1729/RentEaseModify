const userAuthenticate=async (req,res,next)=>{
    if(!req.session.user.email){
        return res.status(401).send("Unauthorized: Please login again")
    }
    try{
        req.email=req.session.user.email
        next()
    }catch(err){
        return res.status(401).send("Unauthorized: Please login again")
    }
}

module.exports=userAuthenticate;