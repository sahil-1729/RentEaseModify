const session=require("express-session")
const Mongostore=require("connect-mongo")

const userSession=session({
    secret:process.env.RENTALTOKEN,
    resave:false,
    saveUninitialized:false,
    store:Mongostore.create({
        mongoUrl:process.env.DBURL,
        ttl:14*24*60*60
    }),  
    cookie:{
        maxAge:1000*60*60*24*7
    }
})

module.exports=userSession