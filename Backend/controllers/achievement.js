const { User } = require("../models/user");
const { Achievement } = require("../models/achievement");

exports.GetAllAchievement = async (req, res) => {
  try {
    var sortBy = req.query?.sortBy || "default";
    sortBy = sortBy == "default" ? "achievement_desc" : sortBy[0];
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
    var achievements = await Achievement.find()
      .skip((paginationInfo.page - 1) * paginationInfo.itemsPerPage)
      .limit(paginationInfo.itemsPerPage)
      .sort(paginationInfo.sortBy)
      .exec();
    var count = await Achievement.find().countDocuments({});
    var achievementData = { achievements, count };
    return res.status(200).json(achievementData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};


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
