import QuestionService from '../services/QuestionService.js';

export default {
    async create(req, res, next) {
        try {
            const response = await QuestionService.create(req.body, req.params);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async show(req, res, next) {
        try {
            const response = await QuestionService.show(req.params);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const response = await QuestionService.update(req.body, req.params);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const response = await QuestionService.delete(req.params);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}