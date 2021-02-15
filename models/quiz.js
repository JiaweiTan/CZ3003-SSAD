const mongoose = require("mongoose");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    quiz_name: {
      type: String,
      required: true,
    },
    quiz_desc: {
      type: String,
      required: true,
    },
    question_list: {
      type: String,
    },
    created_by: {
      type: String,
    },
  })
);

exports.Quiz = Quiz;
