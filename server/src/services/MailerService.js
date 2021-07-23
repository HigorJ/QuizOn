import crypto from 'crypto';

import mailer from '../utils/NodemailerConfig.js';
import CommonError from "../errors/CommonError.js";
import UserRepository from '../repositories/UserRepository.js';
import passwordEncrypt from '../utils/PasswordEncrypt.js';

export default {
    async forgotPassword({ email }) {
        if(!email) {
            throw new CommonError('Email is required!', 400);
        }

        const userRepository = new UserRepository({ where: { email }});
        let user = await userRepository.findOne();

        if(!user) {
            throw new CommonError('User not exists!', 400);
        }

        let password_expires_token = crypto.randomBytes(20).toString('hex');
        let token_expires_validate = Date.now() + 300000;

        const sendEmail = await mailer(email, password_expires_token);

        await userRepository.update({
            password_expires_token,
            token_expires_validate
        });

        if(!sendEmail) {
            throw new CommonError('Error when sending the e-mail. Try again later.', 500);
        }

        return { message: "Successfully" };
    },

    async changePassword({ email, newPassword }, { token }) {
        if(!newPassword || !email) {
            throw new CommonError('Password and email are required!', 400);
        }

        const userRepository = new UserRepository({ select: '*', where: { email, password_expires_token: token } });
        let user = await userRepository.findOne();

        if(!user) {
            throw new CommonError('Invalid Email or Token!', 400);
        }

        if(user.password_expires_token !== token) {
            throw new CommonError('Invalid token!', 400);
        }

        if(user.token_expires_validate < Date.now()) {
            throw new CommonError('Token expired!', 400);
        }

        let hash = await passwordEncrypt.createHash(newPassword);

        await userRepository.update({ password: hash, password_expires_token: "", token_expires_validate: "" });

        return { message: "Successfully" };
    }
}