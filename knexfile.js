// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'login_template',
      user:     'postgres',
      password: 'postgres',
      port: 5432,
      host: 'localhost'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds'
    },
    ssl: {
      rejectUnauthorized: false
    }
  }
};
