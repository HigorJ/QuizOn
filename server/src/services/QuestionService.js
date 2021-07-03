import QuizService from "./QuizService.js";
import QuesitonRepository from "../repositories/QuestionRepository.js";
import AlternativeRepository from "../repositories/AlternativeRepository.js";
import CommonError from '../errors/CommonError.js';
import InternalError from '../errors/InternalError.js';

export default {
    async create({ question_text, alternatives }, { quiz_id: quiz_source_id }) {
        if(!question_text || !quiz_source_id || ![alternatives]) {
            throw new CommonError("All fields are required!", 400);
        }

        const questionRepo = new QuesitonRepository({});

        const altRepo = new AlternativeRepository({});
        
        const [question_source_id] = await questionRepo.create({ question_text, quiz_source_id });
        const result = await altRepo.create(alternatives, question_source_id);
        
        if(!result) {
            throw new InternalError('Error, try again later!');
        }

        alternatives = alternatives.map((alternative, index) => {
            return { ...alternative, alternative_id: result[index] }
        });

        const data = {
            question_id: question_source_id,
            question_text,
            alternatives,
        }

        return data;
    }, 

    async show({ quiz_id: quiz_source_id }) {
        if(!quiz_source_id) {
            throw new CommonError("Quizz id is required!", 400);
        }

        const questionRepo = new QuesitonRepository({ where: { quiz_source_id: quiz_source_id }})
        
        const result = await questionRepo.findAll();

        return result;
    },

    async update({ question_text, alternatives }, { quiz_id, question_id }) {
        if(!alternatives[0].alternative_id || !question_text || !quiz_id || !question_id) {
            throw new CommonError("All fields are required!", 400);
        }

        QuizService.show({ id: quiz_id });

        const questionRepo = new QuesitonRepository({ where: { 'question_id': question_id }});
        const altRepo = new AlternativeRepository({});

        await questionRepo.update({ question_text, quiz_source_id: quiz_id })
        await altRepo.update(alternatives, question_id);

        return { message: "Successfully" };
    },

    async delete({ quiz_id, question_id }) {
        const questionRepo = new QuesitonRepository({ where: { 'question_id': question_id }});
        const result = await questionRepo.delete({ quiz_source_id: quiz_id });

        if(result !== 1) {
            throw new InternalError("Error, check if IDs are correct!");
        }

        return { message: "successfull" };
    }
}