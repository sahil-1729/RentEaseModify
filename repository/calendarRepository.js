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
    const newEvent = {
      event,
      endDate,
      propertyId,
    };
    this.user.calendar.push(newEvent);
    await this.user.save();
    return newEvent;
  }

  async updateCalendarEvent(calendarId, calendarDetails) {
    const { event, endDate, propertyId } = calendarDetails;
    const calendarEvent = this.user.calendar.id(calendarId);

    if (!calendarEvent) {
      throw new Error("Calendar event not found");
    }

    calendarEvent.event = event;
    calendarEvent.endDate = endDate;
    calendarEvent.propertyId = propertyId;
    
    await this.user.save();
    return calendarEvent;
  }

  async deleteCalendarEventById(eventId) {
    const eventIndex = this.user.calendar.findIndex((cal) => cal._id.toString() === eventId);
    if (eventIndex !== -1) {
      this.user.calendar.splice(eventIndex, 1);
      await this.user.save();
      return { message: "Calendar event deleted successfully" };
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
      return { message: "Calendar event deleted successfully" };
    } else {
      throw new Error("Calendar event not found");
    }
  }
}

module.exports = CalendarRepository;
