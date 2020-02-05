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
    body('firstname', 'first name field cannot be empty').notEmpty(),
    body('lastname', 'last name field cannot be empty').notEmpty(),
    body('email', 'email field cannot be empty').notEmpty(),
    body('email', 'invalid email address').isEmail(),
    body('accesslevel', 'access level must be selected').notEmpty(),
    body('accesslevel', 'access level must be selected').custom(((value, {req}) => value != "Select")),
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
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const organization = req.body.organization;
      const accesslevel = req.body.accesslevel;

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
              db.query('INSERT INTO credentials (email, password, firstname, lastname, accesslevel, organization) VALUES (?, ?, ?, ?, ?, ?)', [email, hash, firstname, lastname, accesslevel, organization], (err, results, fields) => {
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
