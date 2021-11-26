const { v4 } =  require('uuid');
const bcrypt = require('bcryptjs');
const knex = require('../db/knex.js');


//   Post new user
async function CreateUser (req, res) {
  let {
    username,
    email,
    password
  } = req.body

  // Hashing the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let exists = await knex.select().from('users').where('email', email).then((user) => { return user[0] });

  if (exists) {
    res.status(401).json({
      msg: "email address already exists"
    })
  }

  // *** Validation Starts *** //
  else if (username === '' || username === null) {
    res.status(400).json({
      msg: "Please enter a username"
    })
  }
  else if (email === '' || email === null) {
    res.status(400).json({
      msg: "Please enter a vaild email address"
    })
  }
  else if (password === '' || password === null) {
    res.status(400).json({
      msg: "Please enter a vaild password"
    })
  }
  // *** Validation ends *** //

  else {
    //  Register user if they dont exsits in database
    let registerUser = knex('users')
    .insert({
      id: v4(),
      username: username,
      email: email,
      password: hash
    })
    .returning('*')
    .then((user) => { return user});

    try {
      res.status(200).json({
        msg: "User has been succesfully added"
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  }  
}

  
module.exports = {
  CreateUser
};