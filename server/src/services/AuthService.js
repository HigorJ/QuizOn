import passwordHash from '../utils/PasswordEncrypt.js';
import UserRepository from '../repositories/UserRepository.js';
import CommonError from '../errors/CommonError.js';
import photoUrl from '../utils/PhotoUrl.js';

export default {
    async login({ email, password }) {
        if(!email || !password) {
            throw new CommonError("Email and Password are required!", 400);
        }

        const userRepo = new UserRepository({select: '*', where: {"email": email}});
        const user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("Email or password incorrect!", 400);
        }

        await passwordHash.checkHash(password, user.password);

        delete user.password;

        user.user_photo = photoUrl(user.user_photo);
        
        return user;
    },

    async changePassword({ user_id, password, newPassword }) {
        const userRepo = new UserRepository({ select: ['user_id', 'password'], where: {user_id: user_id} });
        const user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("Incorrect ID!", 400);
        }

        await passwordHash.checkHash(password, user.password);

        let newHash = await passwordHash.createHash(newPassword);

        await userRepo.update({ password: newHash });
        
        return { message: "Successfully" };
    }
}