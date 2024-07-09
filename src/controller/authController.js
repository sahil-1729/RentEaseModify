const UserRepository = require("../repository/userRepository");
const userRepo = new UserRepository();
const { comparePassword, hashPassword } = require("../helpers/hashingService");
const sendMail = require("../helpers/emailService");
const generateOTP = require("../helpers/generateOTP");
const OTP_EXPIRATION_TIME = 10 * 60 * 1000;

const tempUsers = new Map(); // Temporary storage for user details, OTPs, and timestamps

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send("Invalid credentials");
    }

    req.session.user = {
      email: user.email,
      id: user._id, // Include additional user info as needed
    };
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;
    if (!firstname || !lastname || !email || !phonenumber || !password) {
      return res.status(400).send("All fields are required");
    }

    const user = await userRepo.getUserByEmail(email);
    if (user) {
      return res.status(400).send("User already exists");
    }

    const OTP = generateOTP();
    const timeStamp = Date.now();

    sendMail({
      to: email,
      subject: "Email verification",
      text: `Hi ${firstname} ${lastname}, your OTP for Rentease is ${OTP}`,
    });

    tempUsers.set(email, { firstname, lastname, phonenumber, password, OTP, timeStamp });
    res.status(201).send("OTP is sent to your email");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

const otpverification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otp || !email) {
      return res.status(400).send("Email and OTP are required");
    }

    const tempUser = tempUsers.get(email);
    if (!tempUser) {
      return res.status(400).send("Invalid or expired OTP");
    }

    const currentTime = Date.now();
    if (currentTime - tempUser.timeStamp > OTP_EXPIRATION_TIME) {
      tempUsers.delete(email);
      return res.status(400).send("OTP has expired");
    }

    if (tempUser.OTP !== otp) {
      return res.status(400).send("Invalid OTP");
    }

    const newUser = await userRepo.createUser({
      firstname: tempUser.firstname,
      lastname: tempUser.lastname,
      email,
      password: tempUser.password,
      phonenumber: tempUser.phonenumber,
    });

    if (!newUser) {
      return res.status(500).send("User registration failed");
    }

    req.session.user = {
      email: newUser.email,
      id: newUser._id, // Include additional user info as needed
    };
    tempUsers.delete(email);
    res.status(200).json({ message: "User is registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

const changepassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).send("Email, current password, and new password are required");
    }

    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      return res.status(400).send("User not found");
    }

    const match = await comparePassword(currentPassword, user.password);
    if (!match) {
      return res.status(400).send("Current password is incorrect");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    const updateUser = await userRepo.updateUser(user._id, user);
    if (updateUser) {
      res.status(200).send("Password changed successfully");
    } else {
      res.status(500).send("Failed to update password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Could not log out, please try again");
      }
      res.clearCookie("connect.sid"); // Adjust the cookie name if different
      res.status(200).send("Logged out successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not log out, please try again");
  }
};

module.exports = { login, signup, changepassword, logout, otpverification };
