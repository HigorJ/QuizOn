import passwordHash from '../utils/PasswordEncrypt.js';
import UserRepository from '../repositories/UserRepository.js';
import CommonError from '../errors/CommonError.js';
import deleteImage from '../utils/DeleteImage.js';
import photoUrl from '../utils/PhotoUrl.js';

export default {
    async index() {
        const userRepo = new UserRepository({});
        var users = await userRepo.findAll();

        if(!users) {
            throw new CommonError("Error, try again.", 500);
        }

        users = users.map(user => {
            user.user_photo = photoUrl(user.user_photo);

            return user;
        });
        
        return users;
    },

    async create({ name, email, password }, file = { filename: '' }) {
        if(!name || !email || !password) {
            deleteImage(file.filename);
            throw new CommonError("All fields are required!", 400);
        }

        const userRepo = new UserRepository({where: { "email": email }});
        const user = await userRepo.findOne();

        if(user) {
            deleteImage(file.filename);
            throw new CommonError("Email already exists!", 400);
        }
        
        const hash = await passwordHash.createHash(password);

        await userRepo.create({ name, email, password: hash, user_photo: file.filename });

        return { message: "Successfully" };
    },

    async show({ user_id }) {
        if(!user_id) {
            throw new CommonError("Email and Password are required!", 400);
        }

        const userRepo = new UserRepository({where: { user_id }});
        const user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("User not found!", 400);
        }

        user.user_photo = photoUrl(user.user_photo);
        
        return user;
    }, 

    async update({ name, email, password, newPassword }, id, file) {
        if(!id || !password) {
            throw new CommonError("ID and password are required!", 400);
        }

        const userRepo = new UserRepository({ select: ['name', 'email', 'user_photo', 'password'], where: {"user_id": id}})
        let user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("Incorrect ID!", 400);
        }

        await passwordHash.checkHash(password, user.password);

        let newData = {
            name: !name ? user.name : name,
            email: !email ? user.email : email,
            user_photo: !file ? user.user_photo : file.filename,
        }

        if(file) {
            deleteImage(user.user_photo);
        }

        let updateResult = await userRepo.update(newData);

        newData.user_photo = photoUrl(newData.user_photo);

        return { updateResult, newData };
    }, 

    async delete(password, id) {
        if(!id || !password) {
            throw new CommonError("ID and password are required!", 400);
        }

        const userRepo = new UserRepository({ select: ['user_photo', 'password'], where: {"user_id": id}});
        let user = await userRepo.findOne()

        if(!user) {
            throw new CommonError("Incorrect ID!", 400);
        }
            
        await passwordHash.checkHash(password, user.password);

        deleteImage(user.user_photo);

        await userRepo.delete();

        return { message: "User successfully deleted!" };
    }
}