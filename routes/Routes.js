const AdminRouter = require("./admin");
const AuthRouter = require("./auth");
const ChatRouter=require("./message")
const CalendarRouter = require("./calendar");
const PropertyRouter = require("./property");
const UserRouter = require("./user");
const propertyLCVRouter = require("./propertyLCV");

module.exports = function (app) {
  app.use("/admin", AdminRouter);
  app.use("/auth", AuthRouter);
  app.use("/calendar", CalendarRouter);
  app.use("/properties", PropertyRouter);
  app.use("/property", propertyLCVRouter);
  app.use("/user", UserRouter);
  app.use("/chat",ChatRouter)
};
