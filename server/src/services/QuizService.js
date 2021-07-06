import QuizRepository from '../repositories/QuizRepository.js';
import CommonError from '../errors/CommonError.js';
import deleteImage from '../utils/DeleteImage.js';

export default {
    async index({ id }) {
        const quizRepo = new QuizRepository({ select: "*", where: { author: id } });

        var allQuizzes = await quizRepo.findAll();

        allQuizzes = allQuizzes.map(item => {
            return {
                ...item,
                quiz_photo: item.quiz_photo !== "" ? `http://localhost:3333/uploads/${item.quiz_photo}` : ""
            }
        });

        return allQuizzes;
    },

    async create({ name, description }, { user_id }, file = { filename: '' }) {
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

    async show({ id }) {
        if(!id) {
            throw new CommonError("ID is required!", 400);
        }

        const quizRepo = new QuizRepository({ where: { quiz_id: id }});

        const quiz = await quizRepo.findOne();

        if(!quiz) {
            throw new CommonError("Quiz id not found!", 400);
        }

        if(quiz.quiz_photo !== "") {
            quiz.quiz_photo = `http://localhost:3333/uploads/${quiz.quiz_photo}`;
        }

        return quiz;
    }, 

    async update({ name, description }, { id }, { user_id }, file) {
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

        if(newData.quiz_photo !== "") {
            newData.quiz_photo = `http://localhost:3333/uploads/${newData.quiz_photo}`;
        }

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

        deleteImage(quiz.quiz_photo);

        const result = await quizRepo.delete();

        return result;
    }
}