export async function up(knex) {
    knex.schema.hasTable('users').then((exists) => {
        if(!exists) {
            return knex.schema.createTable('users', (table) => {
                table.increments('user_id').primary();
                table.string('name', 100).notNullable();
                table.string('email', 100).unique().notNullable();
                table.string('password', 40).notNullable();
                table.string('user_photo', 200);
                table.string('password_expires_token');
                table.timestamp('token_expires_validate');

                table.timestamp('created_at').defaultTo(knex.fn.now());
            });
        }
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('users');
}
