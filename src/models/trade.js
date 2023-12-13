const tradeTypes = require('../constants/tradeTypes');

module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    tradeType: {
      type: DataTypes.ENUM(tradeTypes.BUY, tradeTypes.SELL),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tradeRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Trade.belongsTo(sequelize.models.Portfolio);
  Trade.belongsTo(sequelize.models.Share);

  Trade.getAvailableShares = async function (shareId, portfolioId) {
    const shareTotals = await Trade.findOne({
      where: {
        PortfolioId: portfolioId,
        ShareId: shareId,
      },
      group: ['ShareId'],
      attributes: [
        'ShareId',
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              'CASE WHEN "Trade"."tradeType" = \'BUY\' THEN "Trade"."quantity" ELSE 0 END'
            )
          ),
          'totalSharesBought',
        ],
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              'CASE WHEN "Trade"."tradeType" = \'SELL\' THEN "Trade"."quantity" ELSE 0 END'
            )
          ),
          'totalSharesSold',
        ],
      ],
    });

    const totalSharesBought = shareTotals
      ? parseInt(shareTotals.get('totalSharesBought')) || 0
      : 0;
    const totalSharesSold = shareTotals
      ? parseInt(shareTotals.get('totalSharesSold')) || 0
      : 0;

    return totalSharesBought - totalSharesSold;
  };

  return Trade;
};
