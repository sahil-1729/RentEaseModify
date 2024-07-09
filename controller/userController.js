const UserRepository = require("../repository/userRepository");
const userRepo = new UserRepository();
const checkUser = require("../helpers/userHelper");

const getUser = async (req, res) => {
  try {
    const users = await userRepo.getUser();
    return checkUser(users)
      ? res.status(200).send(users)
      : res.status(404).send("Users not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    const user = await userRepo.getUserByEmail(email);
    return checkUser(user)
      ? res.status(200).send(user)
      : res.status(404).send("User not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getUserByPhoneNumber = async (req, res) => {
  try {
    const phoneNumber = req.query.phoneNumber;
    if (!phoneNumber) {
      return res.status(400).send("Phone number is required");
    }
    const user = await userRepo.getUserByPhoneNumber(phoneNumber);
    return checkUser(user)
      ? res.status(200).send(user)
      : res.status(404).send("User not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getUserByFirstName = async (req, res) => {
  try {
    const firstName = req.query.firstName;
    if (!firstName) {
      return res.status(400).send("First name is required");
    }
    const user = await userRepo.getUserByFirstName(firstName);
    return checkUser(user)
      ? res.status(200).send(user)
      : res.status(404).send("User not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("ID is required");
    }
    const user = await userRepo.getUserById(id);
    return checkUser(user)
      ? res.status(200).send(user)
      : res.status(404).send("User not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const createUser = async (req, res) => {
  try {
    const { email, phonenumber, firstname, lastname, password } = req.body;
    if (!email || !phonenumber || !firstname || !lastname || !password) {
      return res.status(400).send("Please fill up all details");
    }
    const userExists = await userRepo.getUserByEmail(email);
    if (userExists) {
      return res.status(409).send("User already exists");
    }
    const user = await userRepo.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepo.getUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const updatedUser = await userRepo.updateUser(id, req.body);
    res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepo.getUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const deleteduser = await userRepo.deleteUser(id);
    if (deleteduser) {
      console.log("yes");
      res.status(200).send("user deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const userProfile = async (req, res) => {
  try {
    const email=req.email;
    if (!email) {
      return res.status(400).send("Please login first");
    }
    const user = await userRepo.getUserByEmail(email);
    console.log(user)
    return checkUser(user)
      ? res.status(200).send(user)
      : res.status(404).send("User not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
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
