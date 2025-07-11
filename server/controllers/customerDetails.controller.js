const customerDetails = require('../models/customermodule');


// Controller to get selected commission details
const getCustomers = async (req, res) => {
  try {
    const customers = await customerDetails.getCustomerDetails();
    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error('Customers fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers details',
    });
  }
};

module.exports = { getCustomers };
