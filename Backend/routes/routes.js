const express = require("express");
const router = express.Router();

var userController = require("../controllers/user");
var courseController = require("../controllers/course");
var topicController = require("../controllers/topic");
var quizController = require("../controllers/quiz");
var questionController = require("../controllers/question");
var attemptController = require("../controllers/attempt");
var achievementController = require("../controllers/achievement");

router.get("/user/:user_id", userController.GetUser);
router.get("/user", userController.GetAllUsers);
router.post("/user/register", userController.RegisterUser);
router.post("/user/login", userController.LoginUser);
router.put("/user/:user_id", userController.UpdateUser);
router.get("/user/:user_id/progress", userController.GetAllUserProgress);
router.post("/user/:user_id/progress", userController.CreateUserProgress);
// router.post("/user/achievement", userController.CreateUserAchievement);
router.delete("/user/:user_id", userController.DeleteUser);
router.post("/user/password/reset", userController.ForgetPassword);
router.post("/user/password/forget", userController.ForgetPasswordEmail);

router.get("/course/:course_id", courseController.GetCourse);
router.get("/course_all", courseController.GetAllCourse);
router.get("/course_user/:user_id", courseController.GetUserCourse);
router.post("/course", courseController.CreateCourse);
router.put("/course/:course_id", courseController.UpdateCourse);
router.delete("/course/:course_id", courseController.DeleteCourse);

router.get("/topic/:topic_id", topicController.GetTopic);
router.get("/topic_all", topicController.GetAllTopic);
router.post("/topic", topicController.CreateTopic);
router.put("/topic/:topic_id", topicController.UpdateTopic);
router.delete("/topic/:topic_id", topicController.DeleteTopic);
router.get("/topic/quizzes/:topic_id", topicController.GetTopicQuiz);

router.get("/quiz", quizController.GetAllQuiz);
router.post("/quiz", quizController.CreateQuiz);
router.put("/quiz/:quiz_id", quizController.UpdateQuiz);
router.delete("/quiz/:quiz_id", quizController.DeleteQuiz);

router.get("/question", questionController.GetAllQuestion);
router.get("/question/:question_id", questionController.GetQuestion);
router.post("/question", questionController.CreateQuestion);
router.put("/question/:question_id", questionController.UpdateQuestion);
router.delete("/question/:question_id", questionController.DeleteQuestion);

router.post("/question/attempt", attemptController.CreateAttempt);


router.get("/achievement_all", achievementController.GetAllAchievement);
router.get(
  "/achievement/:achievement_id",
  achievementController.GetAchievement
);
router.post("/achievement", achievementController.CreateAchievement);
router.put(
  "/achievement/:achievement_id",
  achievementController.UpdateAchievement
);
router.delete(
  "/achievement/:achievement_id",
  achievementController.DeleteAchievement
);
router.get(
  "/achievement/user/:user_id",
  achievementController.GetUserAchievement
);

router.get("/leaderboard", userController.GetLeaderboard);

//Additional endpoints - For frontend
router.get("/list/course", courseController.GetCourseList);
router.get("/list/question", questionController.GetQuestionList);
router.get("/list/quiz", quizController.GetQuizList);
router.get("/list/topic", topicController.GetTopicList);

module.exports = router;
