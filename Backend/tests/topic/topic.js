const axios = require('axios');
const { topicInfo } = require('../__mock__/topic');

const BASE_URL = "https://ssad-api.herokuapp.com/api/v1"

async function getTopic() {
    const response = await axios.get(BASE_URL + "/topic/" + topicInfo._id);
    return response.data;
}

async function getAllTopic() {
    const response = await axios.get(BASE_URL + "/topic_all");
    return response.data;
}

async function createTopic() {
    const response = await axios.post(BASE_URL + "/topic");
    return response.data;
}

async function updateTopic() {
    const response = await axios.put(BASE_URL + "/topic/" + topicInfo._id);
    return response.data;
}

async function deleteTopic() {
    const response = await axios.delete(BASE_URL + "/topic/" + topicInfo._id);
    return response;
}

async function getTopicQuiz() {
    const response = await axios.get(BASE_URL + "/topic/quizzes/" + topicInfo._id);
    return response.data;
}


module.exports = { getTopic, getAllTopic, createTopic, updateTopic, deleteTopic, getTopicQuiz };
