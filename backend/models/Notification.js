const mongoose = require("mongoose");

const NotifSchema = new mongoose.Schema(
  {
    own: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
    },
    type: {
      type: Number,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotifSchema);
