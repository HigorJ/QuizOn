
export async function up(knex) {
    knex.schema.hasTable('alternatives').then((exists) => {
        if(!exists) {
            return knex.schema.createTable('alternatives', (table) => {
                table.increments('alternative_id').primary();
                table.string('alternative_text').notNullable();
                table.boolean('is_correct').notNullable();
                table.integer('question_source_id').unsigned().notNullable();

                table.foreign('question_source_id').references('question_id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE');
            });
        }
    });
}

export async function down(knex) {
    knex.schema.dropTableIfExists('alternatives');
}
