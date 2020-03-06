const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

const SchemaValidator = require('../middlewares/SchemeValidatorLogin')
const validateRequest = SchemaValidator(true);

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

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
                req.session.key = req.session.username
                // req.session.destroy(function(){
                    
                //   });
                res.json({"error" : false,"message" : "Login success."});
            }else{
                res.json({"error" : "true","message" : "Login failed." });
            }
        }else{
            res.status(400).json({error: 'User does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error:err})

    })
})

module.exports = users