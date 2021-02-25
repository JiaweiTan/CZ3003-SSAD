const { User } = require("../models/user");
const { Achievement } = require("../models/achievement");

exports.GetAchievement = (req, res, next) => {
  try {
    Achievement.findOne(
      { _id: req.params.achievement_id },
      function (err, achievement) {
        if (err) {
          err.status = 400;
          next(err);
        } else {
          res.json(achievement);
        }
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateAchievement = async (req, res, next) => {
  try {
    var newAchievement = req.body;
    var achievementData = await Achievement.create(newAchievement);
    return res.status(200).json(achievementData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.UpdateAchievement = async (req, res) => {
  try {
    var updatedAchievement = req.body;
    var achievementData = await Achievement.findByIdAndUpdate(
      req.params.achievement_id,
      {
        $set: updatedAchievement,
      },
      { new: true }
    );
    return res.status(200).json(achievementData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.DeleteAchievement = async (req, res) => {
  try {
    var achievementId = req.params?.achievement_id;
    var success = await Achievement.deleteOne({ _id: achievementId });
    return success ? res.status(200).end() : res.status(400).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetUserAchievement = async (req, res, next) => {
  try {
    User.findOne({ _id: req.params.user_id }, async function (err, user) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        var userAchievementIds = user.achievement;
        var achievements = await Achievement.find({
          _id: { $in: userAchievementIds },
        });
        var count = userAchievementIds?.length;
        return res.status(500).json({ achievements, count });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
