const express = require("express")
const dashboardOrg = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboard.use(cors())

dashboard.get('/form', (req, res) =>{
    //res.send("hello!")
})

dashboard.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/new-form', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})


module.exports = dashboardOrg