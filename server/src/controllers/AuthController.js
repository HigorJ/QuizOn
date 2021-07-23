import AuthService from "../services/AuthService.js";

export default {
    async login(req, res, next) {
        try {
            const response = await AuthService.login(req.body);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    async changePassword(req, res, next) {
        try {
            const response = await AuthService.changePassword(req.body);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}