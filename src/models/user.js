const mongoose = require("../config/database");
const formatDateTime = require("../helpers/formatDateTime");
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
    minlength: 10, // Corrected typo: changed 'minLength' to 'minlength'
    maxlength: 10, // Corrected typo: changed 'max' to 'maxlength'
  },
  email: {
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

const User = mongoose.model("User", userSchema);
User.then(() => {
  console.log("User model created");
}).catch((err) => {
  console.log(err);
});

module.exports = User;
