const express = require("express")
const dashboardRA = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboard.use(cors())

//GET from from DB
dashboard.get('/form', (req, res) =>{
    //req.query.tagNum
    
    //res.send("hello!")
})

//GET form from temp DB
dashboard.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST new form to temp DB
dashboard.post('/new-form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST modified form to temp DB
dashboard.post('/modified-form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST new form to DB
dashboard.post('/new-form', (req, res) =>{
    //res.send("hello!")
})

//Post modified form to DB
dashboard.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})



module.exports = dashboardRA