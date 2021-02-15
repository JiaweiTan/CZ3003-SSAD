const mongoose = require("mongoose");

const Achievement = mongoose.model(
  "Achievement",
  new mongoose.Schema({
    achievement_desc: {
      type: String,
      required: true,
    },
  })
);

exports.Achievement = Achievement;
