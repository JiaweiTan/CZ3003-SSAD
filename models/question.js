const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    question_desc: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    option: [
      {
        answer_desc: String,
        is_correct: Boolean,
      },
    ],
  })
);

exports.Question = Question;
