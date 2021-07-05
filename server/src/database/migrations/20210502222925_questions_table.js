
export async function up(knex) {
    knex.schema.hasTable('questions').then((exists) => {
        if(!exists) {
            return knex.schema.createTable('questions', (table) => {
                table.increments('question_id').primary();
                table.string('question_text').notNullable();
                table.string('question_photo');
                table.integer('quiz_source_id').unsigned().notNullable();

                table.foreign('quiz_source_id').references('quiz_id').inTable('quizzes').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('quizzes');
}
