const express = require("express")
const index = express.Router()
const cors = require('cors')

//const User = require("../models/User")
//users.use(cors())

index.get('/', (req,res, next) => {
    res.send('Home page')
    //next()
})
module.exports = index