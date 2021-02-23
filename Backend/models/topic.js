const mongoose = require("mongoose");

const Topic = mongoose.model(
  "Topic",
  new mongoose.Schema({
    topic_name: {
      type: String,
      required: true,
    },
    topic_desc: {
      type: String,
      required: true,
    },
    quiz_list: {
      type: Array,
    },
  })
);

exports.Topic = Topic;
