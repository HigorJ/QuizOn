import QuizService from '../services/QuizService.js';

export default {
    async index(req, res, next) {
        try {
            const response = await QuizService.index(req.params, req.headers);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const response = await QuizService.create(req.body, req.headers, req.file);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async show(req, res, next) {
        try {
            const response = await QuizService.show(req.params, req.headers);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }, 

    async update(req, res, next) {
        try {
            const response = await QuizService.update(req.body, req.params, req.headers, req.file);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const response = await QuizService.delete(req.params, req.headers);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}