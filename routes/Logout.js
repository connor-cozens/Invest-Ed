const express = require("express")
const logout = express.Router()
const cors = require('cors')
const passport = require('passport')

logout.get('/', (req, res) => {
    console.log('key: ' + req.session.key)
    if(req.session.key !== undefined) {
        req.logout();
        req.session.destroy(function(error){
            if (error) {
              res.json({"error" : true ,"message" : error})
            }
            else {
              res.json({"error" : false})
            }
        })
    }
    else {
        res.json({"error" : true ,"message" : "Logout unsuccessful."})
    }
})
module.exports = logout
