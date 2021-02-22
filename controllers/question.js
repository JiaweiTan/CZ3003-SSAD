const { Question } = require("../models/question");
const { Quiz } = require("../models/quiz");

exports.GetAllQuestion = async (req, res) => {
  try {
    var sortBy = req.query?.sortBy || "default";
    sortBy = sortBy == "default" ? "difficulty" : sortBy[0];
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
    var questions = await Question.find()
      .skip((paginationInfo.page - 1) * paginationInfo.itemsPerPage)
      .limit(paginationInfo.itemsPerPage)
      .sort(paginationInfo.sortBy)
      .exec();
    var count = await Question.find().countDocuments({});
    var questionData = { questions, count };
    return res.status(200).json(questionData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetQuestion = (req, res, next) => {
  try {
    Question.findOne({ _id: req.params.question_id }, function (err, question) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(question);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateQuestion = async (req, res, next) => {
  try {
    var newQuestion = req.body;
    var questionData = await Question.create(newQuestion);
    await Quiz.updateOne(
      { _id: { $eq: newQuestion.quiz_id } },
      {
        $push: { question_list: questionData._id.toString() }
      },
      { new: true }
    );
    return res.status(200).json(questionData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.UpdateQuestion = async (req, res) => {
  try {
    var updatedQuestion = req.body;
    var questionData = await Question.findByIdAndUpdate(
      req.params.question_id,
      {
        $set: updatedQuestion,
      },
      { new: true }
    );
    return res.status(200).json(questionData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.DeleteQuestion = async (req, res) => {
  try {
    var questionId = req.params?.question_id;
    var success = await Question.deleteOne({ _id: questionId });
    await Quiz.updateOne(
      { question_list: { $in: questionId } },
      { $pull: { question_list: questionId } },
      { multi: true }
    );
    return success ? res.status(200).end() : res.status(400).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
