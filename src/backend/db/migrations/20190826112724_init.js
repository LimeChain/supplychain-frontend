const SF = require('../../utilities/SF');

exports.up = async function up(knex) {
    const create_accounts = knex.schema.createTable('accounts', (table) => {
        table.increments('account_id').unsigned().notNullable().primary();
        table.specificType('role', 'tinyint').unsigned().notNullable();
        table.string('email').notNullable();
        table.string('pass').notNullable();
        table.string('salt', 256).notNullable();
        table.specificType('opt_in', 'tinyint').unsigned().notNullable();
        table.text('name').notNullable();

        table.charset('utf8mb4');
        table.engine('InnoDB');
    });

    const create_transactions = knex.schema.createTable('transactions', (table) => {
        table.increments('id').unsigned().notNullable().primary();
        table.integer('account_id').unsigned().notNullable();
        table.string('transaction_hash').notNullable();
        table.specificType('transaction_status', 'tinyint').unsigned().notNullable();
        table.specificType('timestamp', 'bigint').unsigned().notNullable();
        table.text('type').notNullable();
        table.text('desc').notNullable();
    });

    const salt = await SF.generateSalt();
    const add_mogul_user_1 = knex('accounts').insert({
        role: 2,
        email: 'user1@random.bg',
        salt: salt,
        pass: await SF.hashPassword('MogulUser1', salt),
        opt_in: 0,
        name: 'MogulUser1',
    })
    const add_mogul_user_2 = knex('accounts').insert({
        role: 2,
        email: 'user2@random.bg',
        salt: salt,
        pass: await SF.hashPassword('MogulUser2', salt),
        opt_in: 0,
        name: 'MogulUser2',
    })
    const add_admin = knex('accounts').insert({
        role: 1,
        email: 'admin@mogulstudios.com',
        salt: salt,
        pass: await SF.hashPassword('moguladmin', salt),
        opt_in: 0,
        name: 'MogulAdministrator',
    })

    return Promise.all([create_accounts, create_transactions, add_mogul_user_1, add_mogul_user_2, add_admin]);
};

exports.down = function down(knex) {
    knex.schema.dropTable('accounts');
    knex.schema.dropTable('transactions');
};
