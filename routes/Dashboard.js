const express = require("express")
const dashboard = express.Router()
const cors = require('cors')

//const SchemaValidator = require('../middlewares/SchemeValidatorRegister')
//const validateRequest = SchemaValidator(true);

//const User = require("../models/User")

const db = require("../database/invest-ed_db")
//const Data = require("../models/Invest-Ed_DB/Initiative")
//const Data2 = require("../models/Invest-Ed_DB/Countries")
dashboard.use(cors())

dashboard.post('/newForm', (req, res) =>{
    res.send("hello!")
})

module.exports = dashboard