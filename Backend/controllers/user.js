const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../models/user");

exports.GetUser = (req, res, next) => {
  try {
    User.findOne({ _id: req.params.user_id }, function (err, user) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(user);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetAllUsers = async (req, res) => {
  try {
    var sortBy = req.query?.sortBy || "default";
    sortBy = sortBy == "default" ? "username" : sortBy[0];
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
    var users = await User.find()
      .skip((paginationInfo.page - 1) * paginationInfo.itemsPerPage)
      .limit(paginationInfo.itemsPerPage)
      .sort(paginationInfo.sortBy)
      .exec();
    var count = await User.find().countDocuments({});
    var usersData = { users, count };
    return res.status(200).json(usersData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.RegisterUser = async (req, res) => {
  try {
    // Check if this email already exists
    let userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return res.status(500).send("Email is already registered!");
    } else {
      // Insert the new user if they do not exist yet
      let user = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const token = jwt.sign({ _id: user._id }, "privatekey");
      res.json({ token, user });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.LoginUser = async (req, res) => {
  try {
    //  Now find the user by their email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Incorrect email or password.");
    }
    // Check if Password matches with Database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Incorrect email or password.");
    }
    const token = jwt.sign({ _id: user._id }, "PrivateKey");
    res.json({ token, user });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    let updatedUser = req.body;
    if (updatedUser.password != null) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
    }
    let userData = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $set: updatedUser,
      },
      { new: true }
    );
    return res.status(200).json(userData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    var userId = req.params?.user_id;
    var success = await User.deleteOne({ _id: userId });
    return success ? res.status(200).end() : res.status(400).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetAllUserProgress = async (req, res) => {
  try {
    User.findOne({ _id: req.params.user_id }, function (err, user) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        return res.status(200).json(user.completed_quiz);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateUserProgress = async (req, res) => {
  // Check if userId Exists
  // Append it in and update the completed_quiz
  // completed_quiz List contains a list of quizzes that is comma separated
  var userId = req.params.user_id;
  var quizId = req.body.quiz_id;
  try {
    let updateStatus = await User.updateOne(
      { _id: {$eq: userId} }, 
      { $addToSet: { completed_quiz: quizId } }
    );
    if (updateStatus.nModified) {
      await User.updateOne(
        { _id: {$eq: userId} }, 
        { $inc: { score: 1 } }
      );
    }
    await User.findById(userId, function (err, user) {
      return res.status(200).json(user.completed_quiz).end();
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateUserAchievement = async (req, res) => {
  // Same logic as Create user progress
  var userId = this.req.params.user_id;
  var achievementId = this.req.params.achievement_id;
  try {
    return await User.findById(userId, (error, userData) => {
      var user_achievement = userData.achievement;
      if (user_achievement == undefined) {
        userData.achievement = achievementId;
      } else {
        var achievementArray = user_achievement.split(",");
        var result = achievementArray.includes(achievementId);
        if (!result) {
          userData.achievement = userData.achievement + "," + achievementId;
        }
      }
      userData.save((updatedUserData) => {
        return updatedUserData.achievement;
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.ForgetPasswordEmail = (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        var devUrl = process.env.BASE_URL;
        var resetToken = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        var resetLink = devUrl + "/reset/" + user._id + "/" + resetToken;
        const msg = {
          to: user.email,
          from: "admin@email.com",
          subject: "Reset your password",
          html:
            "<p>Hello " +
            user.name +
            ",</p><p>Follow this link to reset your password for <a href='mailto:" +
            user.email +
            "'>" +
            user.email +
            "</a> account. </p><p>" +
            "<a href='" +
            resetLink +
            "'>" +
            "Reset link</a>" +
            "</p> <p>If you didn't ask to reset your password, you can ignore this email." +
            " </p> <p>Thanks,</p><p>From the game team</p>",
        };
        sgMail.send(msg);
        res.sendStatus(200);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.ForgetPassword = (req, res, next) => {
  try {
    User.findOne(
      {
        _id: req.body.userid,
      },
      function (_err, user) {
        if (!user) {
          res.status(400).send("User not found");
        }
        var hashedPassword = req.body.oldpassword;

        bcrypt.compare(
          hashedPassword,
          user.password,
          async function (error, isMatch) {
            var newpassword = await bcrypt.hash(req.body.newpassword, 12);
            if (isMatch) {
              User.findOneAndUpdate(
                { _id: req.body.userid },
                {
                  $set: {
                    password: newpassword,
                  },
                },
                function () {
                  res.status(200).send("Password updated");
                }
              );
            } else {
              res.status(400).send("Wrong password");
            }
          }
        );
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetLeaderboard = async (req, res) => {
  try {
    // Return the top 50 players
    var sortSelection = { score: -1 };
    var users = await User.find().sort(sortSelection).limit(50).exec();
    var count = users.length;
    var usersData = { users, count };
    return res.status(200).json(usersData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
