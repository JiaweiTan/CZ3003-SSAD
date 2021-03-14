const { getCourse, getAllCourse, getUserCourse, createCourse, updateCourse, deleteCourse } = require('./course');
const axios = require('axios');
const { courseList, courseInfo, userCourse } = require('../__mock__/course');
jest.mock('axios');

describe('Course Routes', () => {
    test('returns the course list', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(courseList)
        });
        const courseDataList = await getAllCourse();
        expect(JSON.parse(courseDataList).courses[0]).toHaveProperty('_id');
    });

    test('return course information', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(courseInfo)
        });
        const courseInfoList = await getCourse();
        expect(JSON.parse(courseInfoList)._id).toBe(courseInfo._id);
    });

    test('return user course information', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(userCourse)
        });
        const userCourseInfoList = await getUserCourse();
        expect(JSON.parse(userCourseInfoList).courses[0]).toHaveProperty('_id');
    });

    test('create course', async () => {
        axios.post.mockResolvedValue({
            data: JSON.stringify(courseInfo)
        });
        const courseItem = await createCourse();
        expect(JSON.parse(courseItem)._id).toBe(courseInfo._id);
    });

    test('update course', async () => {
        axios.put.mockResolvedValue({
            data: JSON.stringify(courseInfo)
        });
        const courseItem = await updateCourse();
        expect(JSON.parse(courseItem)._id).toBe(courseInfo._id);
    });

    test('delete course', async () => {
        axios.delete.mockResolvedValue({
            data: 200
        });
        const response = await deleteCourse();
        expect(response.data).toBe(200);
    });
})