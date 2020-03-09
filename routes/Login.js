const express = require("express")
const users = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')
const router = express.Router()

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
                req.session.isLoggedIn = true
                req.session.key = req.body.username
                
                res.json({"error" : false, "messages" : [{message: "Login success."}]})
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

module.exports = users
