const express = require("express")
const logout = express.Router()
const cors = require('cors')

logout.get('/', (req,res, next) => {
    if(req.session.key) {
        req.session.destroy(function(){
            res.json({"error" : false,"message" : "Logout successful."})
        })
        } else {
            res.json({"error" : true ,"message" : "Logout unsuccessful."})
        }
    })
module.exports = logout
