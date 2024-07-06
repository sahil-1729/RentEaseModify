const session=require("express-session")

const userSession=session({
    secret:process.env.RENTALTOKEN,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*7
    }
})

module.exports=userSession