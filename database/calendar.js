const express = require('express');
const Router = express.Router();
const { authenticate } = require('./user');
const { User } = require('./database');
const  Property = require('./propertySchema');
Router.post('/api/calendar', authenticate, async (req, res) => {
    const details = req.body;
    const { event, endDate, propertyId } = details;
    const email = req.email;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the propertyId is already in the user's calendar
        const existingCalendarEvent = user.calendar.find(
            (cal) => cal.propertyId.toString() === propertyId
        );

        if (existingCalendarEvent) {
            // If the propertyId is already in the calendar, update the event and endDate
            existingCalendarEvent.event = event;
            existingCalendarEvent.endDate = endDate;
        } else {
            // If the propertyId is not in the calendar, add it along with the event and endDate
            user.calendar.push({
                event,
                endDate,
                propertyId,
            });
        }

        // Find the user by propertyId and contactNo
        const property = await Property.findOne({ _id: propertyId });
        const propertyOwner = await User.findOne({ phonenumber: property.contactNo });

        // Update the userId based on property ownership
        if (propertyOwner) {
            user.userId = propertyOwner._id;
        }

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'Calendar updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = Router;



Router.get('/api/calendar',authenticate, async(req,res)=>{
    const email=req.email
    try {
        const Details=await User.find({email:email})
        const CalendarDetails=Details[0].calendar
        console.log(CalendarDetails)
        res.send(CalendarDetails)
        //res.render('calendar',{CalendarDetails})

    } catch (error) {
        
    }
})

Router.post('/api/calendar/:id', authenticate, async (req, res) => {
    const eventId = req.params.id; // Get the event ID from the URL parameters
    const email = req.email;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Find the calendar event to delete by its ID
        const eventIndex = user.calendar.findIndex((cal) => cal._id.toString() === eventId);

        if (eventIndex !== -1) {
            // If the event is found, remove it from the calendar
            user.calendar.splice(eventIndex, 1);
            
            // Save the updated user data
            await user.save();

            res.status(200).json({ message: 'Calendar event deleted successfully' });
        } else {
            res.status(404).json({ error: 'Calendar event not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.delete('/api/calendar', authenticate, async (req, res) => {
    const { event, endDate } = req.body;
    const email = req.email;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Find the calendar event to delete
        const eventIndex = user.calendar.findIndex((cal) => {
            return cal.event === event && cal.endDate === endDate;
        });

        if (eventIndex !== -1) {
            // If the event is found, remove it from the calendar
            user.calendar.splice(eventIndex, 1);
            
            // Save the updated user data
            await user.save();

            res.status(200).json({ message: 'Calendar event deleted successfully' });
        } else {
            res.status(404).json({ error: 'Calendar event not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = Router;
