const express = require("express")
const dashboard = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboard.use(cors())

dashboard.post('/newForm', (req, res) =>{
    res.send("hello!")
})

module.exports = dashboard