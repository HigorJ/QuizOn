import path from 'path';

export default {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(path.dirname(''), 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(path.dirname(''), 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
}