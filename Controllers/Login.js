const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config')

// Connecting to database
const knex = require('../db/knex');

async function Login (req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const { email, password } = req.body;

      let user = await knex.select().from('users').where('email', email).then((user) => { return user[0] });
      if (!user) {
          return res.status(400).json({ msg: 'Invalid Email' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Password" });
      }
      const payload = {
        // User details from table
        // data showed after login store vuex "setUser" state
          user: {
              id: user.id,
              username: user.username,
              email: user.email
          },
      };
      jwt.sign(
          payload,

          config.get("jwtSecret"),
          {
            expiresIn: 400000,
          },

          (err, token) => {
            if (err) throw err;
            res.cookie("jwt", token, {
              secure: true,
              httpOnly: true,
              maxAge: 2 * 60 * 60 * 1000,
            })

            res.json({ token });
          }
        );
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
}


module.exports = {
  Login
};