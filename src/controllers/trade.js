const tradeService = require('../services/trade');
const validationException = require('../errors/validationException');
const { tradeSchema } = require('../validations/trade');

exports.trade = async (req, res) => {
  const { error, value } = tradeSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) throw new validationException(error);

  const trade = await tradeService.trade(value);
  res.status(201).send(trade);
};
