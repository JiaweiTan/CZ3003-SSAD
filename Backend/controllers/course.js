const { User } = require("../models/user");
const { Course } = require("../models/course");

exports.GetCourseList = (req, res, next) => {
  try {
    Course.find({}, function (err, course) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(course);
      }
    })
  }
  catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
}

exports.GetCourse = (req, res, next) => {
  try {
    Course.findOne({ _id: req.params.course_id }, function (err, course) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        res.json(course);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetAllCourse = async (req, res) => {
  try {
    var sortBy = req.query?.sortBy || "default";
    sortBy = sortBy == "default" ? "course_name" : sortBy[0];
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
    var courses = await Course.find()
      .skip((paginationInfo.page - 1) * paginationInfo.itemsPerPage)
      .limit(paginationInfo.itemsPerPage)
      .sort(paginationInfo.sortBy)
      .exec();
    var count = await Course.find().countDocuments({});
    var coursesData = { courses, count };
    return res.status(200).json(coursesData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.GetUserCourse = async (req, res, next) => {
  try {
    User.findOne({ _id: req.params.user_id }, async function (err, user) {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        var userCourseIds = user.courses;
        var userCourseIdsList = userCourseIds?.split(",");
        var courses = await Course.find({
          _id: { $in: userCourseIdsList },
        });
        var count = await Course.find({
          _id: { $in: userCourseIdsList },
        }).countDocuments({});
        return res.status(500).json({ courses, count });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.CreateCourse = async (req, res, next) => {
  try {
    var newCourse = req.body;
    var courseData = await Course.create(newCourse);
    return res.status(200).json(courseData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.UpdateCourse = async (req, res) => {
  try {
    var updatedCourse = req.body;
    var courseData = await Course.findByIdAndUpdate(
      req.params.course_id,
      {
        $set: updatedCourse,
      },
      { new: true }
    );
    return res.status(200).json(courseData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};

exports.DeleteCourse = async (req, res) => {
  try {
    var courseId = req.params?.course_id;
    var success = await Course.deleteOne({ _id: courseId });
    return success ? res.status(200).end() : res.status(400).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e).end();
  }
};
