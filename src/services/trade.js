const { Share, Trade, Portfolio } = require('../models');
const badRequestException = require('../errors/badRequestException');
const tradeTypes = require('../constants/tradeTypes');

exports.trade = async ({ symbol, portfolioId, tradeType, quantity }) => {
  const share = await Share.findOne({
    where: {
      symbol,
    },
  });

  if (!share) {
    throw new badRequestException('Symbol does not exist');
  }

  if (!(await Portfolio.portfolioExists(portfolioId))) {
    throw new badRequestException('Portfolio does not exist');
  }

  if (tradeType === tradeTypes.SELL) {
    const availableShares = await Trade.getAvailableShares(
      share.id,
      portfolioId
    );
    if (availableShares < quantity) {
      throw new badRequestException('Insufficient shares available for sell');
    }
  }

  return Trade.create({
    ShareId: share.id,
    PortfolioId: portfolioId,
    tradeRate: share.latestPrice,
    tradeType,
    quantity,
  });
};
