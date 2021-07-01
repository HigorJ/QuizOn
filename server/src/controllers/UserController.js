import UserService from '../services/UserService.js';

export default {
    async create(req, res, next) {
        try {
            const response = await UserService.create(req.body);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async show(req, res, next) {
        try {
            const response = await UserService.show(req.body);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const response = await UserService.update(req.body, req.params.id);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {

        try {
            const response = await UserService.delete(req.body.password, req.params.id)

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}