const { Attempt } = require("../models/attempt");

exports.CreateAttempt = async (req, res, next) => {
  try {
    var newAttempt = req.body?.attempt;
    var attemptData = await Attempt.create(newAttempt);
    return res.status(200).json(attemptData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
