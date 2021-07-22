import AuthService from "../services/AuthService.js";

export default {
    async show(req, res, next) {
        try {
            const response = await AuthService.show(req.body);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}