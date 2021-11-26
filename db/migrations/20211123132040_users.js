exports.up = function(knex) {
  return knex.schema
  .createTable('users', require('./schemas/Users.js')) // User Schema
};
  
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};