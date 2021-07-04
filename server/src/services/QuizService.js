import QuizRepository from '../repositories/QuizRepository.js';
import CommonError from '../errors/CommonError.js';

export default {
    async index({ id }) {
        const quizRepo = new QuizRepository({ select: "*", where: { author: id } });

        var allQuizzes = await quizRepo.findAll();

        return allQuizzes;
    },

    async create({ name, description, user_id }) {
        if(!name || !description) {
            throw new CommonError("All fields are required", 400);
        }

        if(!user_id) {
            throw new CommonError("User ID not found, try to log out and log in again!", 400);
        }

        const quizRepo = new QuizRepository({});

        const result = quizRepo.create({ name, description, author: user_id });

        return result;
    },

    async show({ id }) {
        if(!id) {
            throw new CommonError("ID is required!", 400);
        }

        const quizRepo = new QuizRepository({ where: { quiz_id: id }});

        const quiz = await quizRepo.findOne();

        if(!quiz) {
            throw new CommonError("Quiz id not found!", 400);
        }

        return quiz;
    }, 

    async update({ name, description }, { id }, { user_id }) {
        if(!id || !user_id) {
            throw new CommonError("ID is required!", 400);
        }

        const quizRepo = new QuizRepository({ where: { quiz_id: id }});
        const quiz = await quizRepo.findOne();

        if(quiz.author !== Number(user_id)) {
            throw new CommonError("Only the author can update this quiz", 401);
        }

        const result = await quizRepo.update({ name, description, author: user_id });

        return result;
    },

    async delete({ id }, { user_id }) {
        if(!id || !user_id) {
            throw new CommonError("ID is required!", 400);
        }

        const quizRepo = new QuizRepository({ where: { quiz_id: id }});
        const quiz = await quizRepo.findOne();
        
        if(!quiz) {
            throw new CommonError("Invalid Quiz ID!", 400);
        }

        if(quiz.author !== Number(user_id)) {
            throw new CommonError("Only the author can delete this quiz!", 401);
        }

        const result = await quizRepo.delete();

        return result;
    }
}