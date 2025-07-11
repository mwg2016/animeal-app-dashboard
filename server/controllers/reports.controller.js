const getReports = require('../models/reportsmodel')

const reportsDetails = async(req, res) => {
    try {
         const report = await getReports.getReportsDetails();
         res.json({
            success: true,
            data: report,
          });
    } catch (error) {
        console.error('Reports fetch error:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to fetch Reports details',
        });
    }
};

module.exports = {reportsDetails};