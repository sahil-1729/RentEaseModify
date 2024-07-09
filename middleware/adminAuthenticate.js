const User = require("../models/user");
const adminAuthenticate = async (req, res, next) => {
  try {
    if (!req.session.user.email) {
      return res.status(401).send("Unauthorized: Please login again");
    }
    const user = await User.findOne({ email: req.email });
    if (!user.isAdmin) {
      res.status(403).send("Forbidden: You dont have access to this resource");
    }
    req.email = req.session.email;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized: Please login again");
  }
};

module.exports = adminAuthenticate;
