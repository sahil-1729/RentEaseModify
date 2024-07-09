const express=require("express")
const Router=express.Router()
const userAuthenticate=require("../middleware/userAuthenticate")
const intializeCalendarRepository=require("../middleware/intializeCalendarRepository")
const calendarController=require("../controller/calendarController")
Router.use(userAuthenticate)
Router.use(intializeCalendarRepository)

Router.get("/",calendarController.readCalendar)

Router.get("/:id",calendarController.readCalendarById)

Router.post("/",calendarController.createCalendarEvent)

Router.put("/:id",calendarController.updateCalendarEvent)

Router.delete("/:id",calendarController.deleteCalendarEventById)

Router.delete("/",calendarController.deleteCalendarEventDetails)

module.exports=Router