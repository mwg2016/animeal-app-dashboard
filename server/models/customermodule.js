const knex = require('../config/db');

const getCustomerDetails = async() => {
try {
    const results = await knex('commission_details')
    .join('vet_records', 'commission_details.doctor_id', 'vet_records.id')
    .select(  'commission_details.*',
        'vet_records.first_name',
        'vet_records.last_name');
    return results;
} catch (error) {
    throw new Error('Error fetching Customers details: ' + error.message);
}
}

module.exports={getCustomerDetails};