const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trade');

router.post('/', tradeController.trade);

module.exports = router;
