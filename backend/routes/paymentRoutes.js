const express = require('express');
const router = express.Router();
const { createPaymentIntent, getStripeConfig } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/config', getStripeConfig);

module.exports = router;
