import passwordHash from '../utils/PasswordEncrypt.js';
import UserRepository from '../repositories/UserRepository.js';
import CommonError from '../errors/CommonError.js';
import photoUrl from '../utils/PhotoUrl.js';

export default {
    async show({ email, password }) {
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
    }
}