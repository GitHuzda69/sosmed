const mongoose = require("mongoose");

const GoogleSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Google", GoogleSchema);
