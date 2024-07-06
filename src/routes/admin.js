const express = require("express");
const Router = express.Router();
const userController = require('../controller/userController');

// Route to get all users
Router.get('/', userController.getUser);

// Route to create a new user
Router.post('/', userController.createUser);

// Route to update a user by ID
Router.put('/:id', userController.updateUser);

// Route to delete a user by ID
Router.delete('/:id', userController.deleteUser);

// Route to get a user profile by ID
Router.get('/profile/:id', userController.userProfile);

// Route to get a user by email (using query parameter)
Router.get('/byEmail', userController.getUserByEmail);

// Route to get a user by phone number (using query parameter)
Router.get('/byPhoneNumber', userController.getUserByPhoneNumber);

// Route to get a user by first name (using query parameter)
Router.get('/byFirstName', userController.getUserByFirstName);

// Route to get a user by ID
Router.get('/:id', userController.getUserById);

module.exports = Router;
