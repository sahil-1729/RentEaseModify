const createCalendarEvent = async (req, res) => {
    const details = req.body;
    const calendarRepo = req.calendarRepo;

    try {
        await calendarRepo.createCalendarEvent(details);
        res.status(200).json({ message: 'Calendar event created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const readCalendar = async (req, res) => {
    const calendarRepo = req.calendarRepo;

    try {
        const calendarDetails = await calendarRepo.readCalendar();
        res.send(calendarDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const readCalendarById = async (req, res) => {
    const calendarRepo = req.calendarRepo;
    const eventId = req.params.id;

    try {
        const calendarEvent = await calendarRepo.readCalendarById(eventId);
        res.send(calendarEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCalendarEvent = async (req, res) => {
    const details = req.body;
    const calendarRepo = req.calendarRepo;

    try {
        await calendarRepo.updateCalendarEvent(details);
        res.status(200).json({ message: 'Calendar event updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCalendarEventById = async (req, res) => {
    const calendarRepo = req.calendarRepo;
    const eventId = req.params.id;

    try {
        await calendarRepo.deleteCalendarEventById(eventId);
        res.status(200).json({ message: 'Calendar event deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCalendarEventDetails = async (req, res) => {
    const { event, endDate } = req.body;
    const calendarRepo = req.calendarRepo;

    try {
        await calendarRepo.deleteCalendarEventDetails(event, endDate);
        res.status(200).json({ message: 'Calendar event deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createCalendarEvent,
    readCalendar,
    readCalendarById,
    updateCalendarEvent,
    deleteCalendarEventById,
    deleteCalendarEventDetails,
};
