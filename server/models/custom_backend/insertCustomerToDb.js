const knex = require('../../config/db');

const createCustomerTable = async () => {
    const exists = await knex.schema.hasTable('Customers');
    if (!exists) {
        await knex.schema.createTable('Customers', (table) => {
            table.string('mobile_number', 15).primary();
            table.string('customer_name', 255).notNullable();
            table.string('email', 191).unique();
            table.string('vet_code_linkage', 50);
            table.enu('customer_type', ['B2C', 'B2B', 'Clinic', 'Family', 'Other']);
            table.json('addresses');
            table.bigInteger('shopify_customer_id').unique().notNullable();
        });
    }
};

const insertOrUpdateCustomers = async (customers) => {
    return knex('Customers')
        .insert(customers)
        .onConflict('mobile_number')
        .merge([
            'customer_name',
            'email',
            'vet_code_linkage',
            'customer_type',
            'addresses',
            'shopify_customer_id'
        ]);
};

module.exports = {
    createCustomerTable,
    insertOrUpdateCustomers
};
