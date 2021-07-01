import path from 'path';
import knex from 'knex';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(path.dirname(''), 'src', 'database', 'database.sqlite'),
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    }
  }
});

export default connection;