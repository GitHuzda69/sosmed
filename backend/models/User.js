const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    facebook: {
      type: String,
      max: 50,
      unique: true,
    },
    google: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
    },
    displayname: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    connectFB: {
      type: Boolean,
      default: true,
    },
    connectGO: {
      type: Boolean,
      default: true,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    googleOtp: {
      type: String,
    },
    facebookOtp: {
      type: String,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
