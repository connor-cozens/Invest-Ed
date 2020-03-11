const express = require("express")
const users = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')
const router = express.Router()
const passport = require('passport')

const SchemaValidator = require('../middlewares/SchemeValidatorLogin')
const validateRequest = SchemaValidator(true);

const User = require("../models/User")

users.post('/', validateRequest, (req,res) =>{
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user){
            var result = bcrypt.compareSync(req.body.password, user.password)
            if(result){
                //Will use this session key to identify session
                req.session.key = user.id
                userId = user.id //User id to serialize into the session
                //Login using passport's login function
                req.login(userId, (error) => {
                  if (error){
                    res.json({"error" : true, "messages" : [{message: error}]})
                  }else{
                    res.json({"error" : false, "messages" : [{message: "Login success."}]})
                  }
                })
            }else{
                res.json({"error" : true, "messages" : [{message: "Login failed."}]})
            }
        }else{
            res.json({"error": true, "messages" : [{message: "User does not exist"}]})
        }
    })
    .catch(err => {
        res.json({"error": true, "messages" : [{message: "An error occurred"}]})
    })
})

passport.serializeUser(function(userId, done) {
  done(null, userId);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});

module.exports = users
