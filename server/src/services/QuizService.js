import QuizRepository from '../repositories/QuizRepository.js';
import CommonError from '../errors/CommonError.js';
import deleteImage from '../utils/DeleteImage.js';
import photoUrl from '../utils/PhotoUrl.js';
import jwt from '../utils/jwt.js';

export default {
    async index({ id }, { token }) {
        jwt.checkToken(token);

        const quizRepo = new QuizRepository({ select: "*", where: { author: id } });

        var allQuizzes = await quizRepo.findAll();

        allQuizzes = allQuizzes.map(quiz => {
            quiz.quiz_photo = photoUrl(quiz.quiz_photo);

            return quiz;
        });

        return allQuizzes;
    },

    async create({ name, description }, { user_id, token }, file = { filename: '' }) {
        jwt.checkToken(token);

        if(!name || !description) {
            deleteImage(file.filename);
            throw new CommonError("All fields are required", 400);
        }

        if(!user_id) {
            deleteImage(file.filename);
            throw new CommonError("User ID not found, try to log out and log in again!", 400);
        }

        const quizRepo = new QuizRepository({});

        const [result] = await quizRepo.create({ name, description, author: user_id, quiz_photo: file.filename });

        return result;
    },

    async show({ id }, { token }) {
        jwt.checkToken(token);

        if(!id) {
            throw new CommonError("ID is required!", 400);
        }

        const quizRepo = new QuizRepository({ where: { quiz_id: id }});

        const quiz = await quizRepo.findOne();

        if(!quiz) {
            throw new CommonError("Quiz id not found!", 400);
        }

        quiz.quiz_photo = photoUrl(quiz.quiz_photo);

        return quiz;
    }, 

    async update({ name, description }, { id }, { user_id, token }, file) {
        jwt.checkToken(token);

        if(!id || !user_id) {
            throw new CommonError("ID is required!", 400);
        }

        const quizRepo = new QuizRepository({ where: { quiz_id: id }});
        const quiz = await quizRepo.findOne();

        if(quiz.author !== Number(user_id)) {
            throw new CommonError("Only the author can update this quiz", 401);
        }

        const newData = {
            ...quiz,
            name: !name ? quiz.name : name,
            description: !description ? quiz.description : description,
            quiz_photo: !file ? quiz.quiz_photo : file.filename
        }

        if(file) {
            deleteImage(quiz.quiz_photo);
        }
        
        const result = await quizRepo.update(newData);

        newData.quiz_photo = photoUrl(newData.quiz_photo);

        return result;
    },

    async delete({ id }, { user_id, token }) {
        jwt.checkToken(token);
        
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

        deleteImage(quiz.quiz_photo);

        const result = await quizRepo.delete();

        return result;
    }
}