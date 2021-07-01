import bcrypt from 'bcrypt';
import CommonError from '../errors/CommonError.js';

const SALT = 10;

export default {
    async createHash(password) {
        const hash = bcrypt.hashSync(password, SALT);

        return hash;
    }, 

    async checkHash(password, hash) {
        const check = bcrypt.compareSync(password, hash);

        if(!check) {
            throw new CommonError("Email or password incorrect!", 400);
        }

        return;
    }
}