const express = require("express")
const logout = express.Router()
const cors = require('cors')

//const User = require("../models/User")
logout.use(cors())

logout.get('/', (req,res, next) => {
    if(req.session.key) {
        req.session.destroy(function(){
          res.redirect('/');
        });
        } else {
            res.redirect('/');
        }
    })
module.exports = logout