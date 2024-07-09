const PropertyRepository = require("./propertyRepository");
const UserRepository = require("./userRepository");

class CalendarRepository extends UserRepository {
    constructor(email) {
        super();
        this.email = email;
        this.user = null;
    }
    
    async init() {
        this.user = await this.getUserByEmail(this.email);
        if (!this.user) {
            throw new Error("User not found");
        }
    }

    async readCalendar() {
        return this.user.calendar;
    }

    async readCalendarById(id) {
        const calendarEvent = this.user.calendar.id(id);
        if (!calendarEvent) {
            throw new Error("Calendar event not found");
        }
        return calendarEvent;
    }

    async createCalendarEvent(calendarDetails) {
        const { event, endDate, propertyId } = calendarDetails;
        this.user.calendar.push({
            event,
            endDate,
            propertyId
        });
        await this.user.save();
        return this.user;
    }

    async updateCalendarEvent(calendarDetails) {
        const { event, endDate, propertyId } = calendarDetails;
        const existingCalendarDetails = this.user.calendar.find((cal) =>
            cal.propertyId.toString() === propertyId
        );
        if (existingCalendarDetails) {
            existingCalendarDetails.event = event;
            existingCalendarDetails.endDate = endDate;
            await this.user.save();
            return this.user;
        } else {
            throw new Error("Calendar event not found");
        }
    }

    async deleteCalendarEventById(eventId) {
        const eventIndex = this.user.calendar.findIndex((cal) => cal._id.toString() === eventId);
        if (eventIndex !== -1) {
            this.user.calendar.splice(eventIndex, 1);
            await this.user.save();
            return this.user;
        } else {
            throw new Error("Calendar event not found");
        }
    }

    async deleteCalendarEventDetails(event, endDate) {
        const eventIndex = this.user.calendar.findIndex((cal) =>
            cal.event === event && cal.endDate === endDate
        );
        if (eventIndex !== -1) {
            this.user.calendar.splice(eventIndex, 1);
            await this.user.save();
            return this.user;
        } else {
            throw new Error("Calendar event not found");
        }
    }
}

module.exports = CalendarRepository;
