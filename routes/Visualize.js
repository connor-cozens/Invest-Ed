const express = require("express")
const visualize = express.Router()
const cors = require('cors')

visualize.use(cors())

//need to change this part
//const User = require("../models/User")

//ENDPOINT 1 - TARGET FUNDER DATA
visualize.get('/target-funder', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 2 - IMPLEMENTER DATA
visualize.get('/implementor', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 3 - INITIATIVE DATA
visualize.get('/initiative', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 4 - AN ARRAY OF ATTRIBUTES RELATED TO TARGET FUNDERS
visualize.get('/target-funder-attributes', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 5 - AN ARRAY OF ATTRIBUTES RELATED TO IMPLEMENTERS
visualize.get('/implementor-attributes', (req,res, next) => {
    res.send('Visualize')
})

 //ENDPOINT 6 - AN ARRAY OF RELATIONSHIPS BETWEEN TARGET FUNDERS AND INITIATIVES
visualize.get('/target-funder-initiatives', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 7 - AN ARRAY OF RELATIONSHIPS BETWEEN iMPLEMENTERS AND INITIATIVES
visualize.get('/implementors-initiatives', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 8 - TARGET FUNDER SPECIFIC DATA RELATED TO INITIATIVES
visualize.get('/target-funder-initiative-specific', (req,res, next) => {
    res.send('Visualize')
})

//ENDPOINT 9 - IMPLEMENTER SPECIFIC DATA RELATED TO INITIATIVES
visualize.get('/implementor-initiative-specific', (req,res, next) => {
    res.send('Visualize')
})


module.exports = visualize