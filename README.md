# Login Template

## Starting Server
> - npm run dev

## Database
> - createdb -U {postgres_username} login_template
> - npx knex migrate:rollback
> - npx knex migrate:latest
> - npx seed:run

## API Functions
> - Get all users
> - Register
> - Login
> - Verify

## Routes
> - (http://localhost:3000)
> - (http://localhost:3000/users)
> - (http://localhost:3000/register)
> - (http://localhost:3000/login)
> - (http://localhost:3000/verify)

## Heroku Commonds
> - heroku addons:create heroku-postgresql:hobby-dev
> - heroku run knex migrate:rollback
> - heroku run knex migrate:latest
> - heroku run knex seed:run