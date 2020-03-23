const express = require("express")
const dashboardOrg = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboardOrg.use(cors())

//GET form from DB
dashboardOrg.get('/form', (req, res) =>{
    //res.send("hello!")
})

//GET form from temp DB
dashboardOrg.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST form to temp DB
dashboardOrg.post('/new-form', (req, res) =>{
    //res.send("hello!")
})

//POST form to temp DB
dashboardOrg.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})


module.exports = dashboardOrg