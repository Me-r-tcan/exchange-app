module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  return User;
};
