const { getAllUser, getUser, registerUser, loginUser, updateUser, deleteUser } = require('./user');
const axios = require('axios');
const { userList, userInfo } = require('../__mock__/user');
jest.mock('axios');

describe('User Routes', () => {
    test('returns the user lists', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(userList)
        });
        const userDataList = await getAllUser();
        expect(JSON.parse(userDataList).users[0]).toHaveProperty('_id');
    });

    test('return user information', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(userInfo)
        });
        const userInfoList = await getUser();
        expect(JSON.parse(userInfoList).username).toBe(userInfo.username);
    });

    test('sign up user', async () => {
        axios.post.mockResolvedValue({
            data: JSON.stringify(userInfo)
        });
        const userInfoList = await registerUser();
        expect(JSON.parse(userInfoList).username).toBe(userInfo.username);
    });

    test('login user', async () => {
        axios.post.mockResolvedValue({
            data: JSON.stringify(userInfo)
        });
        const userInfoList = await loginUser();
        expect(JSON.parse(userInfoList).username).toBe(userInfo.username);
    });

    test('update user', async () => {
        axios.put.mockResolvedValue({
            data: JSON.stringify(userInfo)
        });
        const userInfoList = await updateUser();
        expect(JSON.parse(userInfoList).username).toBe(userInfo.username);
    });

    test('delete user', async () => {
        axios.delete.mockResolvedValue({
            data: 200
        });
        const response = await deleteUser();
        expect(response.data).toBe(200);
    });
})