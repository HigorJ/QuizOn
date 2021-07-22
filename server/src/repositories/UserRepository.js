import knex from '../database/connection.js';

class UserRepository {
    constructor({ select = ['user_id', 'name', 'email', 'user_photo'], where = {} }) {
        this.tableName = 'users';
        this.select = select;
        this.where = where;
    }

    async findAll() {
        return await knex(this.tableName).select(this.select);
    }

    async findOne() {
        return await knex(this.tableName).select(this.select).where(this.where).first();
    }

    async create(data) {
        return await knex(this.tableName).insert(data);
    }

    async update(data) {
        return await knex(this.tableName).where(this.where).update(data);
    }

    async delete() {
        return await knex(this.tableName).where(this.where).del();
    }
}

export default UserRepository;