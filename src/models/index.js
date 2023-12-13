const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
  }
);

const db = {};
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Portfolio = require('./portfolio')(sequelize, Sequelize.DataTypes);
db.Share = require('./share')(sequelize, Sequelize.DataTypes);
db.Trade = require('./trade')(sequelize, Sequelize.DataTypes);

module.exports = db;
