const express = require('express');
const router = express.Router();
const { fetchAndSaveCustomers } = require('../controllers/custom_backend/getAllCustomers.controller');

router.get('/sync', fetchAndSaveCustomers);

module.exports = router;
