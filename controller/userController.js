const UserRepository = require("../repository/userRepository");
const userRepo = new UserRepository();
const checkUser = require("../helpers/userHelper");
const filterUser = require("../helpers/userFilter");

const getUser = async (req, res) => {
  try {
    const users = await userRepo.getUser();
    const filteredUser = users.map(user => filterUser(user));
    return checkUser(filteredUser)
      ? res.status(200).json(filteredUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await userRepo.getUserByEmail(email);
    const filteredUser = filterUser(user);
    return checkUser(filteredUser)
      ? res.status(200).json(filteredUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserByPhoneNumber = async (req, res) => {
  try {
    const phoneNumber = req.query.phoneNumber;
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    const user = await userRepo.getUserByPhoneNumber(phoneNumber);
    const filteredUser = filterUser(user);
    return checkUser(filteredUser)
      ? res.status(200).json(filteredUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserByFirstName = async (req, res) => {
  try {
    const firstName = req.query.firstName;
    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    }
    const user = await userRepo.getUserByFirstName(firstName);
    const filteredUser = filterUser(user);
    return checkUser(filteredUser)
      ? res.status(200).json(filteredUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const user = await userRepo.getUserById(id);
    const filteredUser = filterUser(user);
    return checkUser(filteredUser)
      ? res.status(200).json(filteredUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, phonenumber, firstname, lastname, password } = req.body;
    if (!email || !phonenumber || !firstname || !lastname || !password) {
      return res.status(400).json({ message: "Please fill up all details" });
    }
    const userExists = await userRepo.getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await userRepo.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepo.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await userRepo.updateUser(id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepo.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = await userRepo.deleteUser(id);
    if (deletedUser) {
      console.log("yes");
      res.status(200).json({ message: "User deleted" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const email = req.email;
    if (!email) {
      return res.status(400).json({ message: "Please login first" });
    }
    const user = await userRepo.getUserByEmail(email);
    const filteredUser = filterUser(user);
    return checkUser(filteredUser)
      ? res.status(200).json(filteredUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUser,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByFirstName,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userProfile,
};
