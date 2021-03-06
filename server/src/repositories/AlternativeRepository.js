import knex from '../database/connection.js';

class AlternativeRepository {
    constructor({ select = '*', where = {}, andWhere = {}, orderBy = 'alternative_id'}) {
        this.tableName = 'alternatives'
        this.select = select;
        this.where = where;
        this.andWhere = andWhere;
        this.orderBy = orderBy;
    }

    async create(alternatives, question_source_id) {
        return await Promise.all(alternatives.map(async (alternative) => {
            return (await knex('alternatives').insert({ ...alternative, question_source_id }))[0];
        }));
    }

    async showWithJoin(otherTable, tableColumn, otherTableColumn) {
        return await knex(this.tableName)
                        .innerJoin(otherTable, tableColumn, otherTableColumn)
                        .where(this.where)
                        .andWhere(this.andWhere)
                        .select([...this.select])
                        .orderBy(this.orderBy);
    }

    async update(alternatives, question_source_id) {
        return await Promise.all(alternatives.map(async (alternative) => {
            await knex(this.tableName)
                    .update({ ...alternative })
                    .where({
                        'alternative_id': alternative.alternative_id,
                    }).andWhere('question_source_id', question_source_id);
        }));
    }
}

export default AlternativeRepository;