const bcrypt = require('bcrypt');
const saltRounds = 10;
// User model
const user = require('../models/User');

module.exports = (app, db, body, oneOf, validationResult) => {
  app.get('/login', (req, res) => {
    db.query("SELECT * FROM credentials", (err, rows, fields) => {
      if (err) {
        throw err
      } else {
        res.send(rows);
      }
    })
  });

  app.post('/register', ([
    body('email', 'email field cannot be empty').notEmpty(),
    body('email', 'invalid email address').isEmail(),
    body('password', 'password field cannot be empty').notEmpty(),
    body('confirmpassword', 'passwords do not match').exists().custom((value, {req}) => value === req.body.password)
  ]),
  (req, res) => {
    const errors = validationResult(req).errors;
    const errorPayload = validationResult(req);

    if (errors.length > 0) {
      errorPayload.err = true;
      console.log(`errors: ${JSON.stringify(errorPayload)}`);
      res.json(errorPayload);
    }
    else {
      const email = req.body.email;
      const password = req.body.password;

      user.findOne({where: {email: email}})
        .then((address) => {
          // If finds a user that already exists with email = email, then respond with error
          if (address) {
            const obj = {errors: [{email: email, msg: "email already taken"}], err: true};
            console.log(`errors: ${JSON.stringify(obj)}`);
            res.json(obj);
          }
          else {
            bcrypt.hash(password, saltRounds, function(err, hash) {
              db.query('INSERT INTO credentials (email, password) VALUES (?, ?)', [email, hash], (err, results, fields) => {
                if (err) {
                  throw err
                } else {
                  const obj = {err: false};
                  res.json(obj);
                }
              });
            });
          }
        });
    }
  });
}
