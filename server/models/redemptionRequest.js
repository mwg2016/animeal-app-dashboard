// models/paymentModel.js

const knex = require('../config/db');

const getRedemptionRequests = async () => {
  try {
    const requests = await knex('redemption_requests')
      .select(
        'id',
        'vet_id',
        'vet_name',
        'bank_name',
        'account_number',
        'account_type',
        'ifsc_code',
        'redemption_amount',
        'status',
        'created_at'
      )
      .orderBy('created_at', 'desc');
    return requests;
  } catch (error) {
    throw new Error('Error fetching redemption requests: ' + error.message);
  }
};

const approveRedemptionRequest = async (id) => {
  try {
    await knex('redemption_requests')
      .where({ id })
      .update({
        status: 'approved',
        updated_at: new Date()
      });
    return true;
  } catch (error) {
    throw new Error('Error approving redemption request: ' + error.message);
  }
};
const cancelRedemptionRequest = async (id) => {
  try {
    await knex('redemption_requests')
      .where({ id })
      .update({
        status: 'cancelled',
        updated_at: new Date()
      });
    return true;
  } catch (error) {
    throw new Error('Error approving redemption request: ' + error.message);
  }
};

module.exports = {
  getRedemptionRequests,
  approveRedemptionRequest,
  cancelRedemptionRequest
};
