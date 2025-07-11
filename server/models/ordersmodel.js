// models/commissionModel.js

const knex = require('../config/db'); 

const getOrderDetails = async () => {
  try {
    const results = await knex('commission_details')
      .select('order_id', 'client_name', 'doctor_id','order_total','payment_status', 'created_at');
    return results;
  } catch (error) {
    throw new Error('Error fetching commission details: ' + error.message);
  }
};

module.exports = { getOrderDetails };
