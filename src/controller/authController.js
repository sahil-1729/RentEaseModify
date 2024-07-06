const UserRepository = require("../repository/userRepository");
const userRepo = new UserRepository();
const { comparePassword, hashPassword } = require("../helpers/hashingService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const user = await userRepo.getUserByEmail(email);
        if (!user) {
            return res.status(200).send("Invalid credentials");
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send("Invalid credentials");
        }

        req.session.user = {
            email: user.email
        };
        res.status(200).send("Logged in successfully");
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
            return res.status(200).send("User already exists");
        }

        const newUser = await userRepo.createUser({
            firstname,
            lastname,
            email,
            phonenumber,
            password
        });

        req.session.user = {
            email: newUser.email
        };
        res.status(201).send("Successfully signed up");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

const changepassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).send("Current password and new password are required");
        }

        const email = req.session.user.email;
        const user = await userRepo.getUserByEmail(email);

        const match = await comparePassword(currentPassword, user.password);
        if (!match) {
            return res.status(400).send("Current password is incorrect");
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send("Password changed successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out, please try again");
        }
        res.clearCookie('connect.sid'); // Adjust the cookie name if different
        res.status(200).send("Logged out successfully");
    });
};

module.exports = { login, signup, changepassword, logout };
