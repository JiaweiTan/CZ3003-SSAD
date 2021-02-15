const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    head_color: {
      type: Number,
    },
    body_color: {
      type: Number,
    },
    leg_color: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    courses: {
      type: String,
    },
    completed_quiz: {
      type: String,
    },
    achievement: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
  })
);

exports.User = User;
