const express = require("express")
const index = express.Router()

const User = require("../models/User")

index.get('/', (req,res) => {
    console.log('User id: ' + req.user);
    console.log('User authenticated: ' + req.isAuthenticated());
    //If session id sent from client in the request header is valid
    if (req.isAuthenticated()){
      //Query db with this user id (req.user)
      User.findOne({
          where: {
              id: req.user
          }
      })
      .then(user => {
          //If found user using user id deserialized from the session id, send user info
          if(user){
            res.json({"error": false, "message":
              [{"username": user.username,
                "email": user.email,
                "firstname": user.firstName,
                "lastname": user.lastName,
                "accessLevel": user.accessLevel,
                "organization": user.organization,
                "editedForms": user.editedForms
              }]
            })
          } else {
            res.json({"error": true, "message": "Error retrieving user"})
          }
        })
        .catch(error => {
          res.json({"error": true, "message": error})
        })
    }
    //If req.isAuthenticated() returns false, then should not be authorized access to user info
    else {
      res.json({"error": true, "message": "Not authorized to view this content"})
    }
})

module.exports = index
