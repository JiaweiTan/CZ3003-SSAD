const { getAllQuiz, createQuiz, updateQuiz, deleteQuiz } = require('./quiz');
const axios = require('axios');
const { quizList, quizInfo } = require('../__mock__/quiz');
jest.mock('axios');

describe('Quiz Routes', () => {
    test('returns the quiz list', async () => {
        axios.get.mockResolvedValue({
            data: JSON.stringify(quizList)
        });
        const quizDataList = await getAllQuiz();
        expect(JSON.parse(quizDataList).quizzes[0]).toHaveProperty('_id');
    });


    test('create quiz', async () => {
        axios.post.mockResolvedValue({
            data: JSON.stringify(quizInfo)
        });
        const quizItem = await createQuiz();
        expect(JSON.parse(quizItem)._id).toBe(quizInfo._id);
    });

    test('update quiz', async () => {
        axios.put.mockResolvedValue({
            data: JSON.stringify(quizInfo)
        });
        const quizItem = await updateQuiz();
        expect(JSON.parse(quizItem)._id).toBe(quizInfo._id);
    });

    test('delete quiz', async () => {
        axios.delete.mockResolvedValue({
            data: 200
        });
        const response = await deleteQuiz();
        expect(response.data).toBe(200);
    });
})