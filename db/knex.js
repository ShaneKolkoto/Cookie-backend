const enviroment = process.env.NODE_ENV || 'development'
const config = require('../knexfile.js')[enviroment]
module.exports = require('knex')(config);