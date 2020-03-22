const express = require("express")
const dashboardRA = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboard.use(cors())

//    FOR ACCESSING DATABASE DIRECTLY
dashboard.get('/form', (req, res) =>{
    //req.query.tagNum
    
    //res.send("hello!")
})
dashboard.post('/new-form', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})

//    FOR ACCESSING TEMP DATABASE
dashboard.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/new-form-temp', (req, res) =>{
    //res.send("hello!")
})

dashboard.post('/modified-form-temp', (req, res) =>{
    //res.send("hello!")
})



module.exports = dashboardRA