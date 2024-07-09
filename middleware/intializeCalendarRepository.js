const CalendarRepository=require("../repository/calendarRepository")

const intializeCalendarRepository=async (req,res,next)=>{
    try{
        const email=req.email;
        const calendarRepo=new CalendarRepository(email)
        await calendarRepo.init()
        req.calendarRepo=calendarRepo;
        next()
    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
}

module.exports=intializeCalendarRepository