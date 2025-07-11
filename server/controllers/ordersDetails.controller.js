const OrdersDetails = require('../models/ordersmodel');

// Controller to get selected commission details
const getOrders = async (req, res) => {
  try {
    const commissions = await OrdersDetails.getOrderDetails();
    res.json({
      success: true,
      data: commissions,
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Orders details',
    });
  }
};

module.exports = {
  getOrders
};
