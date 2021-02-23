const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    course_name: {
      type: String,
      required: true,
    },
    course_desc: {
      type: String,
      required: true,
    },
    topic_list: {
      type: Array,
    },
  })
);

exports.Course = Course;
