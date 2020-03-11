const express = require("express")
const index = express.Router()

//const User = require("../models/User")

index.get('/', (req,res) => {
    console.log('User id: ' + req.user);
    console.log('User authenticated: ' + req.isAuthenticated());
    //If session id sent from client in the request header is valid
    if (req.isAuthenticated()){
      res.json({"error": false, "message": req.user}) //This is a dummy json. Instead would want to send user info based on querying db with this user id (in req.user)
    }
    else {
      res.json({"error": true, "message": "Not authorized to view this content"})
    }

})
module.exports = index
