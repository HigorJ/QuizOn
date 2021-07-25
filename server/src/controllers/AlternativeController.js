import AlternativeService from '../services/AlternativeService.js';

export default {
    async show(req, res, next) {
        try {
            const response = await AlternativeService.show(req.params, req.headers);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}


            