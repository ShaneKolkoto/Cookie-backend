const userSchema = (table) => {
  table.uuid('id').primary().unique()
  table.string('username').notNullable()
  table.string('email').unique().notNullable()
  table.string('password').notNullable()
  table.timestamps(true, true)
}

module.exports = userSchema;