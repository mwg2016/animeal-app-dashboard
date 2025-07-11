const express = require('express');
const router = express.Router();

const vet_record = require('../controllers/vet.controller');
const vetController = require('../controllers/vetRequest.controller');
const getQrcode = require('../controllers/qrCode.controller');
const orderDetail = require('../controllers/ordersDetails.controller')
const customerDetails = require('../controllers/customerDetails.controller')
const login = require('../controllers/adminLogin.controller')
const reports = require('../controllers/reports.controller')
const paymentController = require('../controllers/paymentRequest.controller')
const profileController = require('../controllers/profile.controller')

router.get('/veterianlist', vet_record.getVetRecords);
router.post('/vetrecordsnew', vetController.addNewRecord);
router.patch('/status/:id', vetController.updateStatus);
router.get('/vetrecords/pending', vetController.getPendingRecords);
router.get('/vetrecords/rejected', vetController.getRejectedRecords);
router.get('/getqrcode', getQrcode.getQrcode);
router.get('/ordersdetails', orderDetail.getOrders);
router.get('/customers', customerDetails.getCustomers);
router.post('/login', login.adminLogin);
router.get('/reports', reports.reportsDetails);
router.get('/get-redemption-requests', paymentController.getPaymentRequests);
router.put('/approve-redemption/:id', paymentController.approvePaymentRequest);
router.put('/cancel-redemptixon/:id', paymentController.cancelPaymentRequest);
router.patch("/change-password",profileController.changePassword);

module.exports = router;