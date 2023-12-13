module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    symbol: {
      type: DataTypes.STRING(3),
      unique: true,
      allowNull: false,
    },
    latestPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Share;
};
