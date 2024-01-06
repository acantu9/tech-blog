const router = require('express').Router();
const session = require('express-session');
const server = require('./server');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

// routes here

module.exports = router;