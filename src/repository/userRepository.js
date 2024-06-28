const User = require('../models/user');

class UserRepository {
    async getUser() {
        return await User.find();
    }

    async getUserById(id) {
        return await User.findOne({ _id: id });
    }

    async getUserByEmail(email) {
        return await User.findOne({ email: email });
    }

    async getUserByPhoneNumber(phonenumber) {
        return await User.findOne({ phonenumber: phonenumber });
    }

    async getUserByFirstName(firstName) {
        return await User.findOne({ firstName: firstName });
    }

    async createUser(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    async updateUser(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = UserRepository;
