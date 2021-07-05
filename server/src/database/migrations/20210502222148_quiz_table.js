export async function up(knex) {
    knex.schema.hasTable('quizzes').then((exists) => {
        if(!exists) {
            return knex.schema.createTable('quizzes', (table) => {
                table.increments('quiz_id').primary();
                table.string('name').notNullable();
                table.string('description').notNullable();
                table.string('quiz_photo');
                table.integer('author').unsigned().notNullable();

                table.foreign('author').references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            });
        }
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('quizzes');
}
