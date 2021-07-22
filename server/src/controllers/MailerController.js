import MailerService from '../services/MailerService.js';

export default {
    async create(req, res, next) {
        try {
            const response = await MailerService.forgotPassword(req.body);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const response = await MailerService.changePassword(req.body, req.params);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}