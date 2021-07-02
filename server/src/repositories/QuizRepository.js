import knex from '../database/connection.js';

class QuizRepository {
    constructor({ select = '*', where = {}}) {
        this.tableName = 'quizzes';
        this.select = select;
        this.where = where;
    }

    async findAll() {
        return await knex(this.tableName)
            .select(this.select)
            .modify((queryBuilder) => {
                if(this.where.author) {
                    queryBuilder.where(this.where);
                }
            });
    }

    async create(data) {
        return await knex(this.tableName).insert(data);
    }

    async findOne() {
        return await knex(this.tableName).select(this.select).where(this.where).first();
    }

    async update(data) {
        return await knex(this.tableName).update(data).where(this.where);
    }

    async delete() {
        return await knex(this.tableName).where(this.where).del();
    }
}

export default QuizRepository;