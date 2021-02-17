exports.up = function up(knex) {
    const update_users = knex.schema.table('accounts', (table) => {
        table.specificType('roles_mask', 'tinyint').unsigned().notNullable();
        table.specificType('verified', 'tinyint').unsigned().notNullable().defaultTo(1);
    });

    const update_roles_mask_1 = knex('accounts').update({ 'roles_mask': 8 }).where({ 'role': 1 });
    const update_roles_mask_2 = knex('accounts').update({ 'roles_mask': 4 }).where({ 'role': 2 });
    const update_roles_mask_3 = knex('accounts').update({ 'roles_mask': 2 }).where({ 'role': 3 });
    const update_roles_mask_4 = knex('accounts').update({ 'roles_mask': 1 }).where({ 'role': 4 });

    return Promise.all([update_users, update_roles_mask_1, update_roles_mask_2, update_roles_mask_3, update_roles_mask_4]);
};

exports.down = function down(knex) {
    return knex.schema.table('accounts', (table) => {
        table.dropColumn('roles_mask');
        table.dropColumn('verified');
    });
};
