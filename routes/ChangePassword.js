const express = require("express")
const pass = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')
const router = express.Router()
const passport = require('passport')

const User = require("../models/User")

pass.post('/', (req,res) =>{
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user){
            var result = bcrypt.compareSync(req.body.password, user.password)
            if(result){
                bcrypt.hash(req.body.newPassword, 10, (err, hash) =>{
                user.update(
                    {password: hash},
                    {where: 
                    {
                        username: req.body.username
                    }
                    }
                )
                .then(function(rowsUpdated) {
                    res.json(rowsUpdated)
                  })
                })
            
            }else{
                res.json({"error" : true, "messages" : [{message: "Password change failed."}]})
            }
        
        
        }else{
            res.json({"error": true, "messages" : [{message: "User does not exist"}]})
        }
    })
    .catch(err => {
        res.json({"error": true, "messages" : [{message: "An error occurred"}]})
    })
})
module.exports = pass