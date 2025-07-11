// controllers/paymentController.js

const paymentModel = require('../models/redemptionRequest');

const getPaymentRequests = async (req, res) => {
  try {
    const requests = await paymentModel.getRedemptionRequests();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch payment requests' });
  }
};

const approvePaymentRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await paymentModel.approveRedemptionRequest(id);
    res.status(200).json({ message: 'Payment request approved successfully' });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ error: 'Failed to approve payment request' });
  }
};
const cancelPaymentRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await paymentModel.cancelRedemptionRequest(id);
    res.status(200).json({ message: 'Payment request cancelled' });
  } catch (error) {
    console.error('Error cancelling request:', error);
    res.status(500).json({ error: 'Failed to cancel payment request' });
  }
};

module.exports = {
  getPaymentRequests,
  approvePaymentRequest,
  cancelPaymentRequest
};
