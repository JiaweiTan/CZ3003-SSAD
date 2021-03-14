const { getAllTopic, getTopic, createTopic, updateTopic, deleteTopic, getTopicQuiz } = require('./topic');
const axios = require('axios');
const { topicList, topicInfo } = require('../__mock__/topic');
jest.mock('axios');

describe('Topic Routes', () => {
    test('returns the topic lists', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(topicList)
        });
        const topicDataList = await getAllTopic();
        expect(JSON.parse(topicDataList).topics[0]).toHaveProperty('_id');
    });

    test('return user information', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(topicInfo)
        });
        const topicInfoList = await getTopic();
        expect(JSON.parse(topicInfoList)._id).toBe(topicInfo._id);
    });

    test('create topic', async () => {
        axios.post.mockResolvedValue({
            data: JSON.stringify(topicInfo)
        });
        const topicInfoList = await createTopic();
        expect(JSON.parse(topicInfoList)._id).toBe(topicInfo._id);
    });

    test('update user', async () => {
        axios.put.mockResolvedValue({
            data: JSON.stringify(topicInfo)
        });
        const topicInfoList = await updateTopic();
        expect(JSON.parse(topicInfoList)._id).toBe(topicInfo._id);
    });

    test('delete topic', async () => {
        axios.delete.mockResolvedValue({
            data: 200
        });
        const response = await deleteTopic();
        expect(response.data).toBe(200);
    });

    test('get topic quiz', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(topicInfo)
        });
        const topicInfoList = await getTopicQuiz();
        expect(JSON.parse(topicInfoList)._id).toBe(topicInfo._id);
    });
})