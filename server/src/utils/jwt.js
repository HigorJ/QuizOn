import jwt from 'jsonwebtoken';
import CommonError from '../errors/CommonError.js';

export default {
    generate(user_id) {
        try {
            return jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        } catch (error) {
            throw new CommonError('Error generating token!', 500);
        }
        
    },

    checkToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new CommonError('Invalid token!', 400);
        }
    }
}