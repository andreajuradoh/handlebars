const enviroment = process.env.NODE_ENV || 'development';

const config = require('../knexfile.js')[enviroment];

console.log(config);
module.exports = require('knex')(config);