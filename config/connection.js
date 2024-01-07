const { Sequelize } = require('sequelize');

const databaseHost = process.env.DB_HOST || '127.0.0.1';
const databasePort = process.env.DB_PORT || '3306';
const databaseUser = process.env.DB_USER || 'root';
const databasePassword = process.env.DB_PASSWORD || 'rootroot';
const databaseName = process.env.DB_NAME || 'blog_db';

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
 host: databaseHost,
 port: databasePort,
 dialect: 'mysql',
 logging: false,
});

module.exports = sequelize;