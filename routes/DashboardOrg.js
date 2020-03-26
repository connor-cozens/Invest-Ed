const express = require("express")
const dashboardOrg = express.Router()
const cors = require('cors')
var async = require('async');
const sql = require("mysql2")

//const db = require("../database/invest-ed_db")

dashboardOrg.use(cors())

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD66^',
    database: 'inves431_girlsEd',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})

//GET form from DB
dashboardOrg.get('/form:tagNum', (req, res) =>{
    var tagNum = req.params.tagNum
    
    //initiative queries
    var query1 = "SELECT * FROM initiative WHERE tagNumber =" + tagNum
    var query2 = "SELECT * FROM initiativeregion WHERE tagNumber =" + tagNum
    var query3 = "SELECT * FROM initiativecountryofoperation WHERE tagNumber =" + tagNum
    var query4 = "SELECT * FROM initiativeprogrammingactivities WHERE tagNumber =" + tagNum
    var query5 = "SELECT * FROM initiativefundingsource WHERE tagNumber =" + tagNum
    var query6 = "SELECT * FROM initiativelaunchcountry WHERE tagNumber =" + tagNum
    var query7 = "SELECT * FROM initiativetargetgeography WHERE tagNumber =" + tagNum
    var query8 = "SELECT * FROM initiativetargetpopulationsector WHERE tagNumber =" + tagNum
    var query9 = "SELECT * FROM initiativemonitoredoutcomes WHERE tagNumber =" + tagNum
    var query10 = "SELECT * FROM initiativemaineducationsubsector WHERE tagNumber =" + tagNum
    var query11 = "SELECT * FROM initiativeeducationsubsector WHERE initiativeTagNumber =" + tagNum
    var query11 = "SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =" + tagNum

     //implementor queries
     var query12 = "SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =" + tagNum

    //funder queries
    var query13 = "SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =" + tagNum


    var formData = {}


    async.parallel([
        function(queryDB) {
            pool.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table2 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table3 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table4 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table5 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table6 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table7 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table8 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table9 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table10 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table11 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table12 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table13 = results;
                    queryDB()
                } 
                
            })
        },
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })

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