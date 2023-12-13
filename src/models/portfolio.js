module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {});

  Portfolio.belongsTo(sequelize.models.User);

  Portfolio.portfolioExists = async function (id) {
    const result = await Portfolio.findByPk(id);
    return result !== null;
  };

  return Portfolio;
};
