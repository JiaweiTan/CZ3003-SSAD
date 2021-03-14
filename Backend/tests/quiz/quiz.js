const axios = require('axios');
const { quizInfo } = require('../__mock__/quiz');

const BASE_URL = "https://ssad-api.herokuapp.com/api/v1"

async function getAllQuiz() {
    const response = await axios.get(BASE_URL + "/quiz");
    return response.data;
}

async function createQuiz() {
    const response = await axios.post(BASE_URL + "/quiz");
    return response.data;
}

async function updateQuiz() {
    const response = await axios.put(BASE_URL + "/quiz/" + quizInfo._id);
    return response.data;
}

async function deleteQuiz() {
    const response = await axios.delete(BASE_URL + "/quiz/" + quizInfo._id);
    return response;
}

module.exports = { getAllQuiz, createQuiz, updateQuiz, deleteQuiz };