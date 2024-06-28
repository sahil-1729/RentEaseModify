const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Unauthorized: Please log in again.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.RENTALTOKEN);
    req.email = decodedToken.email; // Store email in the req object for later use
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send('Session expired. Please log in again.');
    }
    return res.status(401).send('Unauthorized: Please log in again.');
  }
}

module.exports = authenticate;
