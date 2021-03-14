const axios = require('axios');
const { questionInfo } = require('../__mock__/question');

const BASE_URL = "https://ssad-api.herokuapp.com/api/v1"

async function getQuestion() {
    const response = await axios.get(BASE_URL + "/question/" + questionInfo._id);
    return response.data;
}

async function getAllQuestion() {
    const response = await axios.get(BASE_URL + "/question");
    return response.data;
}

async function createQuestion() {
    const response = await axios.post(BASE_URL + "/question");
    return response.data;
}

async function updateQuestion() {
    const response = await axios.put(BASE_URL + "/question/" + questionInfo._id);
    return response.data;
}

async function deleteQuestion() {
    const response = await axios.delete(BASE_URL + "/question/" + questionInfo._id);
    return response;
}

module.exports = { getQuestion, getAllQuestion, createQuestion, updateQuestion, deleteQuestion };