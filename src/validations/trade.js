const Joi = require('joi');
const tradeTypes = require('../constants/tradeTypes');

exports.tradeSchema = Joi.object({
  symbol: Joi.string().min(3).max(3).required(),
  quantity: Joi.number().integer().min(1).required(),
  portfolioId: Joi.number().integer().min(1).required(),
  tradeType: Joi.string().valid(tradeTypes.BUY, tradeTypes.SELL).required(),
});
