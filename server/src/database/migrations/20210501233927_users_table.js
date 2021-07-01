export async function up(knex) {
    knex.schema.hasTable('users').then((exists) => {
        if(!exists) {
            return knex.schema.createTable('users', (table) => {
                table.increments('user_id').primary();
                table.string('name', 100).notNullable();
                table.string('email', 100).unique().notNullable();
                table.string('password', 40).notNullable();
            });
        }
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('users');
}
