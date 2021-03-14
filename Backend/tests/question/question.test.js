const { getQuestion, getAllQuestion, createQuestion, updateQuestion, deleteQuestion } = require('./question');
const axios = require('axios');
const { questionList, questionInfo } = require('../__mock__/question');
jest.mock('axios');

describe('Question Routes', () => {
    test('returns the question list', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(questionList)
        });
        const questionDataList = await getAllQuestion();
        expect(JSON.parse(questionDataList).questions[0]).toHaveProperty('_id');
    });

    test('return question information', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(questionInfo)
        });
        const questionInfoList = await getQuestion();
        expect(JSON.parse(questionInfoList)._id).toBe(questionInfo._id);
    });

    test('create question', async () => {
        axios.post.mockResolvedValue({
            data: JSON.stringify(questionInfo)
        });
        const questionItem = await createQuestion();
        expect(JSON.parse(questionItem)._id).toBe(questionInfo._id);
    });

    test('update question', async () => {
        axios.put.mockResolvedValue({
            data: JSON.stringify(questionInfo)
        });
        const questionItem = await updateQuestion();
        expect(JSON.parse(questionItem)._id).toBe(questionInfo._id);
    });

    test('delete question', async () => {
        axios.delete.mockResolvedValue({
            data: 200
        });
        const response = await deleteQuestion();
        expect(response.data).toBe(200);
    });
})