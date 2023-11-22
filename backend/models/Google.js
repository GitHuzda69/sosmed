const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
     email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
     },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Google", UserSchema);