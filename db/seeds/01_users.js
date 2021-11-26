const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('Password', salt);
      // Inserts seed entries
      return knex('users').insert([
        {id: v4(), username: 'Shane', email: 'shane@gmail.io', password: hash},
        {id: v4(), username: 'Morne', email: 'morne@gmail.io', password: hash},
        {id: v4(), username: 'Kolkoto', email: 'kolkoto@gmail.io', password: hash}
      ]);
    });
};
