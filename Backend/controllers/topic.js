const { Quiz } = require("../models/quiz");
const { Topic } = require("../models/topic");
const { Course } = require("../models/course");

exports.GetAllTopic = async (req, res) => {
  try {
    var sortBy = req.query?.sortBy || "default";
    sortBy = sortBy == "default" ? "topic_name" : sortBy[0];
    var sortDesc = req.query?.sortDesc || "default";
    sortDesc = sortDesc == "default" ? "" : sortDesc[0];
    sortDesc === "true"
      ? (sortBy = { [sortBy]: -1 })
      : (sortBy = { [sortBy]: 1 });
    var paginationInfo = {
      page: req.query.page,
      itemsPerPage: req.query?.itemsPerPage - 0,
      sortBy: sortBy,
      sortDesc: sortDesc,
    };
    var topics = await Topic.find()
      .skip((paginationInfo.page - 1) * paginationInfo.itemsPerPage)
      .limit(paginationInfo.itemsPerPage)
      .sort(paginationInfo.sortBy)
      .exec();
    var count = await Topic.find().countDocuments({});
    var topicData = { topics, count };
    return res.status(200).json(topicData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetTopicList = (req, res, next) => {
  try {
    Topic.find({}, function (err, topic) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(topic);
      }
    })
  }
  catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
}


exports.GetTopic = (req, res, next) => {
  try {
    Topic.findOne({ _id: req.params.topic_id }, function (err, topic) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(topic);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateTopic = async (req, res, next) => {
  try {
    var newTopic = req.body;
    var topicData = await Topic.create(newTopic);
    await Course.updateOne(
      { _id: { $eq: newTopic.course_id } },
      {
        $push: { topic_list: topicData._id.toString() }
      },
      { new: true }
    );
    return res.status(200).json(topicData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.UpdateTopic = async (req, res) => {
  try {
    var updatedTopic = req.body;
    var topicData = await Topic.findByIdAndUpdate(
      req.params.topic_id,
      {
        $set: updatedTopic,
      },
      { new: true }
    );
    return res.status(200).json(topicData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.DeleteTopic = async (req, res) => {
  try {
    var topicId = req.params?.topic_id;
    var success = await Topic.deleteOne({ _id: topicId });
    await Course.updateOne(
      { topic_list: { $in: topicId } },
      { $pull: { topic_list: topicId } },
      { multi: true }
    );
    return success ? res.status(200).end() : res.status(400).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetTopicQuiz = async (req, res, next) => {
  try {
    Topic.findOne({ _id: req.params?.topic_id }, async function (err, topic) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        var quizIdList = topic.quiz_list;
        var quizzes = await Quiz.find({
          _id: { $in: quizIdList },
        });
        var count = await Quiz.find({
          _id: { $in: quizIdList },
        }).countDocuments({});
        res.json({ quizzes, count });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
