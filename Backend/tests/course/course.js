

const axios = require('axios');
const { courseInfo } = require('../__mock__/course');

const BASE_URL = "https://ssad-api.herokuapp.com/api/v1"

async function getCourse() {
    const response = await axios.get(BASE_URL + "/course/" + courseInfo._id);
    return response.data;
}

async function getAllCourse() {
    const response = await axios.get(BASE_URL + "/course_all");
    return response.data;
}

async function getUserCourse() {
    const userID = "603b7e5c441a5600150d4099"
    const response = await axios.get(BASE_URL + "/course_user/" + userID);
    return response.data;
}


async function createCourse() {
    const response = await axios.post(BASE_URL + "/question");
    return response.data;
}

async function updateCourse() {
    const response = await axios.put(BASE_URL + "/question/" + courseInfo._id);
    return response.data;
}

async function deleteCourse() {
    const response = await axios.delete(BASE_URL + "/question/" + courseInfo._id);
    return response;
}

module.exports = { getCourse, getAllCourse, getUserCourse, createCourse, updateCourse, deleteCourse };