const { User, Portfolio, Share, Trade } = require('../models');
const tradeTypes = require('../constants/tradeTypes');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      const users = await User.bulkCreate(
        [
          { name: 'User1' },
          { name: 'User2' },
          { name: 'User3' },
          { name: 'User4' },
          { name: 'User5' },
        ],
        {
          returning: ['id'],
          transaction: t,
        }
      );

      const portfolios = await Portfolio.bulkCreate(
        users.map((user) => ({
          UserId: user.id,
        })),
        {
          returning: ['id'],
          transaction: t,
        }
      );

      const shares = await Share.bulkCreate(
        [
          { symbol: 'ABC', latestPrice: 50.25 },
          { symbol: 'DEF', latestPrice: 75.5 },
          { symbol: 'GHI', latestPrice: 100.75 },
          { symbol: 'JKL', latestPrice: 30.0 },
          { symbol: 'MNO', latestPrice: 22.5 },
        ],
        {
          returning: ['id', 'latestPrice'],
          transaction: t,
        }
      );

      const tradeData = [];

      for (let i = 0; i < 5; i++) {
        tradeData.push({
          tradeType: tradeTypes.BUY,
          quantity: 10,
          tradeRate: shares[i].latestPrice,
          PortfolioId: portfolios[i].id,
          ShareId: shares[i].id,
        });

        tradeData.push({
          tradeType: tradeTypes.SELL,
          quantity: 8,
          tradeRate: shares[i].latestPrice,
          PortfolioId: portfolios[i].id,
          ShareId: shares[i].id,
        });
      }

      await Trade.bulkCreate(tradeData, {
        transaction: t,
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await Trade.destroy({ where: {} });
    await Share.destroy({ where: {} });
    await Portfolio.destroy({ where: {} });
    await User.destroy({ where: {} });
  },
};
