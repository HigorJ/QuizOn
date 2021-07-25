import CommonError from "../errors/CommonError.js";
import AlternativeRepository from "../repositories/AlternativeRepository.js";
import jwt from "../utils/jwt.js";

export default {
    async show({ quiz_id, question_id }, { token }) {
        jwt.checkToken(token);

        if(!quiz_id) {
            throw new CommonError("Quiz id is required!", 400);
        }

        const altRepo = new AlternativeRepository({ 
            select: [
                'alternatives.alternative_id', 
                'alternatives.alternative_text', 
                'alternatives.is_correct'
            ],
            where: { 
                'alternatives.question_source_id': question_id
            },
            andWhere: {
                'questions.quiz_source_id': quiz_id, 
            },
            orderBy: 'alternatives.alternative_id',
        });

        const alternatives = await altRepo.showWithJoin('questions', 'alternatives.question_source_id', 'questions.question_id');

        return alternatives;
    }
}