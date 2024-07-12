const { v4: uuidv4 } = require("uuid");

const propertyViews = (req, res, next) => {
  if (!req.cookies.propertyViewsToken) {
    res.cookie("propertyViewsToken", uuidv4(), { maxAge: 24 * 60 * 60 * 1000 }); // 1 day
  }
  next();
};

module.exports = propertyViews;
