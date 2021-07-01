import passwordHash from '../utils/PasswordEncrypt.js';
import UserRepository from '../repositories/UserRepository.js';
import CommonError from '../errors/CommonError.js';

export default {
    async create({ name, email, password }) {
        if(!name || !email || !password) {
            throw new CommonError("All fields are required!", 400);
        }

        const userRepo = new UserRepository({ where: { "email": email }});
        const user = await userRepo.findOne();

        if(user) {
            throw new CommonError("Email already exists!", 400);
        }
        
        const hash = await passwordHash.createHash(password);

        await userRepo.create({ name, email, password: hash });

        return { message: "Successfully" };
    },

    async show({ email, password }) {
        if(!email || !password) {
            throw new CommonError("Email and Password are required!", 400);
        }

        const userRepo = new UserRepository({ where: {"email": email}});
        const user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("Email or password incorrect!", 400);
        }

        const userChecked = await passwordHash.checkHash(password, user);

        delete userChecked.password;

        return userChecked;
    }, 

    async update({ name, email, password }, id) {
        if(!id || !password) {
            throw new CommonError("ID and password are required!", 400);
        }

        const userRepo = new UserRepository({ where: {"user_id": id}})

        let user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("Incorrect ID!", 400);
        }

        await passwordHash.checkHash(password, user);

        let newData = {
            ...user,
            name: !name ? user.name : name,
            email: !email ? user.email : email,
        }

        delete newData.password;

        let updateResult = await userRepo.update(newData);

        return { updateResult, newData };
    }, 

    async delete(password, id) {
        if(!id || !password) {
            throw new CommonError("ID and password are required!", 400);
        }

        const userRepo = new UserRepository({ where: {"user_id": id}});
        let user = await userRepo.findOne()

        if(!user) {
            throw new CommonError("Incorrect ID!", 400);
        }
            
        await passwordHash.checkHash(password, user.password);

        await userRepo.delete();

        return { message: "User successfully deleted!" };
    }
}