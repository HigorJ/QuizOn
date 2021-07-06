import passwordHash from '../utils/PasswordEncrypt.js';
import UserRepository from '../repositories/UserRepository.js';
import CommonError from '../errors/CommonError.js';
import deleteImage from '../utils/DeleteImage.js';

export default {
    async create({ name, email, password }, file = { filename: '' }) {
        if(!name || !email || !password) {
            deleteImage(file.filename);
            throw new CommonError("All fields are required!", 400);
        }

        const userRepo = new UserRepository({ where: { "email": email }});
        const user = await userRepo.findOne();

        if(user) {
            deleteImage(file.filename);
            throw new CommonError("Email already exists!", 400);
        }
        
        const hash = await passwordHash.createHash(password);

        await userRepo.create({ name, email, password: hash, user_photo: file.filename });

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

        await passwordHash.checkHash(password, user.password);

        delete user.password;

        if(user.user_photo !== "") {
            user.user_photo = `http://localhost:3333/uploads/${user.user_photo}`;
        }
        
        return user;
    }, 

    async update({ name, email, password }, id, file) {
        if(!id || !password) {
            throw new CommonError("ID and password are required!", 400);
        }

        const userRepo = new UserRepository({ where: {"user_id": id}})

        let user = await userRepo.findOne();

        if(!user) {
            throw new CommonError("Incorrect ID!", 400);
        }

        await passwordHash.checkHash(password, user.password);

        let newData = {
            ...user,
            name: !name ? user.name : name,
            email: !email ? user.email : email,
            user_photo: !file ? user.user_photo : file.filename
        }

        if(file) {
            deleteImage(user.user_photo);
        }
        
        delete newData.password;

        let updateResult = await userRepo.update(newData);

        if(newData.user_photo !== "") {
            newData.user_photo = `http://localhost:3333/uploads/${newData.user_photo}`;
        }

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

        deleteImage(user.user_photo);

        await userRepo.delete();

        return { message: "User successfully deleted!" };
    }
}