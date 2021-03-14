const axios = require('axios');
const { userInfo } = require('../__mock__/user');

const BASE_URL = "https://ssad-api.herokuapp.com/api/v1"

async function getUser() {
    const response = await axios.get(BASE_URL + "/user/" + userInfo._id);
    return response.data;
}

async function getAllUser() {
    const response = await axios.get(BASE_URL + "/user");
    return response.data;
}

async function registerUser() {
    const response = await axios.post(BASE_URL + "/user/register");
    return response.data;
}

async function loginUser() {
    const response = await axios.post(BASE_URL + "/user/login");
    return response.data;
}

async function updateUser() {
    const response = await axios.put(BASE_URL + "/user/" + userInfo._id);
    return response.data;
}

async function deleteUser() {
    const response = await axios.delete(BASE_URL + "/user/" + userInfo._id);
    return response;
}

module.exports = { getAllUser, getUser, registerUser, loginUser, updateUser, deleteUser };