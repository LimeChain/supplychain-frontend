// Update with your config settings.
const Config = require('../../../config/config');

module.exports = {
    'dev': {
        client: 'mysql',
        connection: {
            database: Config.Database.NAME,
            user: Config.Database.USER,
            password: Config.Database.PASSWORD,
            host: Config.Database.HOST,
            port: Config.Database.PORT,
            charset: 'utf8mb4',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
        seeds: {
            directory: './seeds/dev',
        },
        debug: false,
    },

    'production': {
        client: 'mysql',
        connection: {
            database: Config.Database.NAME,
            user: Config.Database.USER,
            password: Config.Database.PASSWORD,
            host: Config.Database.HOST,
            port: Config.Database.PORT,
            charset: 'utf8mb4',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
        seeds: {
            directory: './seeds/prod',
        },
    },

};
