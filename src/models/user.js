const mongoose = require("mongoose");
const formatDateTime = require("../helpers/formatDateTime");
const {hashPassword}=require("../helpers/hashingService")

const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  phonenumber: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    unique:true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
  isAdmin: {
    required: true,
    type: Boolean,
    default: false,
  },
  calendar: [
    {
      event: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        default: function () {
          return formatDateTime(new Date());
        },
      },
      endDate: {
        type: String,
        required: true,
      },
      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    try {
      user.password = await hashPassword(user.password);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
