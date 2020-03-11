const express = require("express")
const visualize = express.Router()
const cors = require('cors')

visualize.use(cors())

visualize.get('/', (req,res, next) => {
    res.send('Visualize')
})

module.exports = visualize
