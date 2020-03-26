const express = require("express")
const visualize = express.Router()
const cors = require('cors')
var async = require('async');
const sql = require("mysql2")

visualize.use(cors())

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD66^',
    database: 'inves431_girlsEd',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})


//ENDPOINT 1 - TARGET FUNDER DATA
visualize.get('/target-funder', (req,res, next) => {
    
    var tagNum = req.params.tagNum

    //funder queries
    var query1 = "SELECT * FROM funder"
    var query2 = "SELECT * FROM funderasiabases"
    var query3 = "SELECT * FROM funderasiaoperations"
    var query4 = "SELECT * FROM fundereducationsubsectors"
    var query5 = "SELECT * FROM funderinternationalbases"
    var query6 = "SELECT * FROM funderorganizationtraits"

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
 
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })
})

//ENDPOINT 2 - IMPLEMENTER DATA
visualize.get('/implementor', (req,res, next) => {
    var tagNum = req.params.tagNum

    //funder queries
    var query1 = "SELECT * FROM implementor"

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
 
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })
})

//ENDPOINT 3 - INITIATIVE DATA
visualize.get('/initiative', (req,res, next) => {
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
      
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })

})

//ENDPOINT 4 - AN ARRAY OF ATTRIBUTES RELATED TO TARGET FUNDERS
visualize.get('/target-funder-attributes', (req,res, next) => {
    var tagNum = req.params.tagNum

    //funder queries
    var query1 = "SELECT profitMotive, funderName FROM funder ORDER BY profitMotive"
    var query2 = "SELECT organizationalForm, funderName from funder ORDER BY organizationalForm"
    var query3 = "SELECT * FROM funds ORDER BY funderName"

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
 
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })
   

})

//ENDPOINT 5 - AN ARRAY OF ATTRIBUTES RELATED TO IMPLEMENTERS
visualize.get('/implementor-attributes', (req,res, next) => {
    var tagNum = req.params.tagNum

    //funder queries
    var query1 = "SELECT * FROM implementor ORDER by profitMotive"

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
 
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })
   
})

 //ENDPOINT 6 - AN ARRAY OF RELATIONSHIPS BETWEEN TARGET FUNDERS AND INITIATIVES
visualize.get('/target-funder-initiatives', (req,res, next) => {
    var tagNum = req.params.tagNum
   
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