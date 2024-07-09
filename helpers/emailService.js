const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file


const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendMail({ to, subject, text }) {
  const mailOptions = {
    from: "RentEase <no-reply@rentease.com>",
    to,
    subject,
    text,
  };
  return new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error); // Properly reject the promise with the error
      }
      return resolve(info); // Properly resolve the promise with the info
    });
  });
}


module.exports = sendMail;
