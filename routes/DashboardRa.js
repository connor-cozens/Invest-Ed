const express = require("express")
const dashboardRA = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboard.use(cors())

dashboard.get('/form', (req, res) =>{
    //req.query.tagNum
    
    //res.send("hello!")
})

dashboard.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/new-form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/modified-form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/new-form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/modified-form-temp', (req, res) =>{
    //res.send("hello!")
})



module.exports = dashboardRA