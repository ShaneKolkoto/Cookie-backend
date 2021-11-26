const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()

const knex = require('./db/knex');

// Importing Controller functions
const Login = require('./Controllers/Login.js');
const Verify = require('./Controllers/Verify.js');
const Register = require('./Controllers/Register.js');

const port = process.env.PORT || 3000;

const app = express();

// app.use(cors({
//   credentials: true,
//   methods: "*"
// }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(methodOverride());
// app.use(session({
//   name: "cookies_sessions",
//   secret: 'yryGGeugidx34otGDuSF5sD9R8g0Gu3r8',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     path: "/",
//     secure: true,
//     httpOnly: true
//   }
// }));

app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})


app.get('/', (req, res) => {
  console.log(process.env.DATABASE_URL)
  try {
    const message = "Login template"
    res.status(200).json({
      msg: message
    })
  } catch (error) {
    res.status(500).json([{
      error: error
    }])
  }
})

app.get('/users', async (req, res) => {
  let users = await knex.select('*').from('users');
  try {
    if (!users) {
      res.status(401).json({
        msg: 'Database error'
      })
    }
    else{
      res.status(200).json({
        data: users
      })
    }
  } catch (error) {
    res.status(500).json([{
      error: error
    }])
  }
})

app.post('/register', async (req, res) => {
  return Register
  .CreateUser(req, res)
})

app.post('/login', async (req, res) => {
  return Login
  .Login(req, res)
})

app.get('/verify', async (req, res) => {
  return Verify
  .VerifyUser(req, res)
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})