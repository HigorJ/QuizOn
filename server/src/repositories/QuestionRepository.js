import knex from '../database/connection.js';

class QuesitonRepository {
    constructor({ select = "*", where = {}, orderBy = 'question_id'}) {
        this.tableName = 'questions';
        this.select = select;
        this.where =  where;
        this.orderBy = orderBy;
    }

    async create(data) {
        return await knex(this.tableName).insert(data);
    }

    async findAll() {
        return await knex(this.tableName)
                        .select(this.select)
                        .where(this.where)
                        .orderBy(this.orderBy);
    }

    async update(data) {
        return await knex(this.tableName).update(data).where(this.where);
    }

    async delete(andWhere) {
        return await knex(this.tableName).where(this.where).andWhere(andWhere).del();
    }

}

export default QuesitonRepository;