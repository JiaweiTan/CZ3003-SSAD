const mongoose = require("mongoose");

const Attempt = mongoose.model(
  "Attempt",
  new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
    },
    question_id: {
      type: String,
      required: true,
    },
    option_id: {
      type: String,
      required: true,
    },
  })
);

exports.Attempt = Attempt;
