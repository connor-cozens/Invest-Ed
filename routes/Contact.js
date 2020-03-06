const express = require("express")
const contact = express.Router()
const cors = require('cors')

//const User = require("../models/User")
contact.use(cors())

contact.get('/', (req,res, next) => {
    res.send('Contact Us')
})



module.exports = contact
