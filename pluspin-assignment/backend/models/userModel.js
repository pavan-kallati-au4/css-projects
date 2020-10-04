const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    trim: true,
  },
  otp: {
    type: Number,
    select: false,
  },
  dob: {
    type: Date,
    default: Date.now
  },
  contactNumber: {
    type: Number,
    default: ""
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  address: {
    type: String,
    default: "",
  },
  bpvalues: {
    type: Array,
    default: []
  },
  sugarlevels: {
    type: Array,
    default: []
  },
  height: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;