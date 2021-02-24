const { Quiz } = require("../models/quiz");
const { Topic } = require("../models/topic");
const { Course } = require("../models/course");

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
    Topic.findOne({ _id: req.params.topic_id }, async function (err, topic) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        var quizIdStr = topic.quiz_list;
        var quizIdList = quizIdStr.split(",");
        var topicQuizData = await Quiz.find({
          _id: { $in: quizIdList },
        });
        var count = await Quiz.find({
          _id: { $in: quizIdList },
        }).countDocuments({});
        res.json({ topicQuizData, count });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};