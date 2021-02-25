const { Quiz } = require("../models/quiz");
const { Topic } = require("../models/topic");

exports.GetQuizList = (req, res, next) => {
  try {
    Quiz.find({}, function (err, quiz) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(quiz);
      }
    })
  }
  catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
}

exports.GetAllQuiz = async (req, res) => {
  try {
    var sortBy = req.query?.sortBy || "default";
    sortBy = sortBy == "default" ? "quiz_name" : sortBy[0];
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
    var quiz = await Quiz.find()
      .skip((paginationInfo.page - 1) * paginationInfo.itemsPerPage)
      .limit(paginationInfo.itemsPerPage)
      .sort(paginationInfo.sortBy)
      .exec();
    var count = await Quiz.find().countDocuments({});
    var quizData = { quiz, count };
    return res.status(200).json(quizData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateQuiz = async (req, res, next) => {
  try {
    var newQuiz = req.body;
    var quizData = await Quiz.create(newQuiz);
    await Topic.updateOne(
      { _id: { $eq: newQuiz.topic_id } },
      {
        $push: { quiz_list: quizData._id.toString() }
      },
      { new: true }
    );
    return res.status(200).json(quizData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.UpdateQuiz = async (req, res) => {
  try {
    var updatedQuiz = req.body;
    var quizData = await Quiz.findByIdAndUpdate(
      updatedQuiz._id,
      {
        $set: updatedQuiz,
      },
      { new: true }
    );
    return res.status(200).json(quizData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.DeleteQuiz = async (req, res) => {
  try {
    var quizId = req.params?.quiz_id;
    var success = await Quiz.deleteOne({ _id: quizId });
    await Topic.updateOne(
      { quiz_list: { $in: quizId } },
      { $pull: { quiz_list: quizId } },
      { multi: true }
    );
    return success ? res.status(200).end() : res.status(400).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
