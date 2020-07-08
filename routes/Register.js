const express = require("express")
const register = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')

const SchemaValidator = require('../middlewares/SchemeValidatorRegister')
const validateRequest = SchemaValidator(true);

const User = require("../models/User")

register.post('/', validateRequest, (req, res) =>{

    if(req.user){
        const today = new Date()
        const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.confirmPassword,
        organization: req.body.organization,
        accessLevel: req.body.accessLevel,
        created: today
    }
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(!user){
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    userData.password = hash
                    User.create(userData)
                    .then(user =>{
                        res.json({"error" : false, "messages" : [{message: "Registered successfully."}]})
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({"error" : true , "messages" : [{message: "Error while adding user."}]})
                    })
                })
            }else{
                res.json({"error": true, "messages": [{message: "User already exists"}]})
            }
        })
        .catch(err => {
            res.json({"error" : true , "messages" : [{message: "Error while adding user."}]})
        })
    }else{
        res.json({"error" : true , "messages" : [{message: "Error: Not authorized to access this page"}]})
    }
})

module.exports = register
