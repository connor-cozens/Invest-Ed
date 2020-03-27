const express   = require("express")
const sql       = require("mysql2")
const async     = require('async');
const cors      = require('cors')
const genTagNum = require('../tagNumber')

const dashboard = express.Router()
dashboard.use(cors())


//Create pool connection to DB
const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD66^',
    database: 'inves431_girlsEd',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})

const poolTemp = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD66^',
    database: 'inves431_girlsEd_temp',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})


global.tempStore = []

//GET from from DB
dashboard.get('/form/:tagNum', cors(),(req, res) =>{
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
    var query10 = "SELECT * FROM initiativeMainEducationSubsector WHERE tagNumber =" + tagNum
    var query11 = "SELECT * FROM initiativeEducationSubsectors WHERE initiativeTagNumber =" + tagNum
    var query12 = "SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =" + tagNum

     //implementor queries
     var query13 = "SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =" + tagNum

    //funder queries
    var query14 = "SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =" + tagNum  


    var formData = {}
    var fundersData = {}
    var test = []
    var funderIndividual = []

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
        function(queryDB) {
            pool.query(query14, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table14 = results;
                    queryDB()
                    
                } 

            })    
        }     
         
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            funderQueries(formData.table14)   

          } 
          
     })

  
     function funderQueries(funderData){
  
        var final = 0
        //nest them here 
        for(var i = 0; i < funderData.length; i++){
       
            var query15 = "SELECT * FROM funderasiabases WHERE funderName ='" +funderData[i].funderName+"'"
            var query16 = "SELECT * FROM funderasiaoperations WHERE funderName ='" +funderData[i].funderName+"'"
            var query17 = "SELECT * FROM fundereducationsubsectors WHERE funderName ='" +funderData[i].funderName+"'"
            var query18 = "SELECT * FROM funderinternationalbases WHERE funderName ='" +funderData[i].funderName+"'"
            var query19 = "SELECT * FROM funderorganizationtraits WHERE funderName ='" +funderData[i].funderName+"'"
        
           
            async.parallel([
                function(queryDB) {
                    pool.query(query15, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    pool.query(query16, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    pool.query(query17, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    pool.query(query18, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    pool.query(query19, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                }
            
            ],
                
            function(err) {
                if (err){
                console.log(err)
                }else{
                    var temp = {}
                    final++;
                    test.push(funderIndividual)
                    temp.table1 = test
                    Object.assign(formData, temp.table1)
                  
               
                    if(final == funderData.length)
                        res.send(formData)

                } 
            
            })
        }


    } 
 

})


//GET form from temp DB
dashboard.get('/form-temp/:tagNum', (req, res) =>{
    var tagNum = req.params.tagNum
    

    //status & comments queries
    var query1 = "SELECT * FROM status INNER JOIN comments USING (tagNumber) WHERE tagNumber=" + tagNum
    var query2 = "SELECT * FROM sectionReviews WHERE tagNumber="+tagNum
    
    //initiative queries
    var query3 = "SELECT * FROM initiative WHERE tagNumber =" + tagNum
    var query4 = "SELECT * FROM initiativeregion WHERE tagNumber =" + tagNum
    var query5 = "SELECT * FROM initiativecountryofoperation WHERE tagNumber =" + tagNum
    var query6 = "SELECT * FROM initiativeprogrammingactivities WHERE tagNumber =" + tagNum
    var query7 = "SELECT * FROM initiativefundingsource WHERE tagNumber =" + tagNum
    var query8 = "SELECT * FROM initiativelaunchcountry WHERE tagNumber =" + tagNum
    var query8 = "SELECT * FROM initiativetargetgeography WHERE tagNumber =" + tagNum
    var query9 = "SELECT * FROM initiativetargetpopulationsector WHERE tagNumber =" + tagNum
    var query10 = "SELECT * FROM initiativemonitoredoutcomes WHERE tagNumber =" + tagNum
    var query11 = "SELECT * FROM initiativemaineducationsubsector WHERE tagNumber =" + tagNum
    var query12 = "SELECT * FROM initiativeeducationsubsectors WHERE initiativeTagNumber =" + tagNum
    var query13 = "SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =" + tagNum

     //implementor queries
     var query14 = "SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =" + tagNum

    //funder queries
    var query15 = "SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =" + tagNum  

 


    var formData = {}
    var fundersData = {}
    var test = []
    var funderIndividual = []

    async.parallel([
        function(queryDB) {
            poolTemp.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table2 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table3 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table4 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table5 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table6 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table7 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table8 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table9 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table10 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table11 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table12 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            poolTemp.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table13 = results;
                    queryDB()
                    
                } 

            })    
        },
        function(queryDB) {
            poolTemp.query(query14, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table14 = results;
                    queryDB()
                    
                } 

            })    
        }, 
        function(queryDB) {
            poolTemp.query(query15, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table15 = results;
                    queryDB()
                    
                } 

            })    
        }     
         
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //poolTemp.end()
            funderQueries(formData.table15)   

          } 
          
     })

  
     function funderQueries(funderData){
  
        var final = 0
        //nest them here 
        for(var i = 0; i < funderData.length; i++){
       
            var query15 = "SELECT * FROM funderasiabases WHERE funderName ='" +funderData[i].funderName+"'"
            var query16 = "SELECT * FROM funderasiaoperations WHERE funderName ='" +funderData[i].funderName+"'"
            var query17 = "SELECT * FROM fundereducationsubsectors WHERE funderName ='" +funderData[i].funderName+"'"
            var query18 = "SELECT * FROM funderinternationalbases WHERE funderName ='" +funderData[i].funderName+"'"
            var query19 = "SELECT * FROM funderorganizationtraits WHERE funderName ='" +funderData[i].funderName+"'"
        
           
            async.parallel([
                function(queryDB) {
                    poolTemp.query(query15, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    poolTemp.query(query16, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    poolTemp.query(query17, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    poolTemp.query(query18, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                },
                function(queryDB) {
                    poolTemp.query(query19, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            funderIndividual.push(results)
                            queryDB()
                        } 
                        
                    })
                }
            
            ],
                
            function(err) {
                if (err){
                console.log(err)
                }else{
                    var temp = {}
                    final++;
                    test.push(funderIndividual)
                    temp.table1 = test
                    Object.assign(formData, temp.table1)
                  
               
                    if(final == funderData.length)
                        res.send(formData)

                } 
            
            })
        }


    } 
     

})

//POST new form to temp DB
dashboard.post('/submit-form-temp', (req, res) =>{
    //res.send("hello!")
})


//POST new form to DB
dashboard.post('/submitform', (req, res) =>{
    
    const formData = {
        // single val funder
        funderName: req.body.fname, //f
        funderUrl: req.body.furl, //f
        funderMotive: req.body.motive, //f
        funderImpact: req.body.impact, //f
        funderOrganizationForm: req.body.organizationForm, //f
        // multi val funder
        funderInternationalBases: req.body.internationalBases, //f
        funderEducationSubsector: req.body.edSubs, //f
        funderOrgTraits: req.body.orgTraits, //f
        funderAsiaBases: req.body.asialBases, //f
        funderAsiaOperations: req.body.asiaOperations, //f
        // single val initiative
        initiativeName: req.body.initName, //in
        initiativeURL: req.body.initURL, //in
        initiativeTargetsWomen: req.body.tWomen, //in
        initiativeStart: req.body.initStart, //in
        initiativeEnd: req.body.initEnd, //in
        initiativeDescription: req.body.idescription, //in
        initiativeProgramAreas: req.body.programArea, //in
        initiativeMainProgramActivity: req.body.initativeMainProgramActivity, //in
        initiativeFeeAccess: req.body.feeAccess, //in
        // multi val initiative
        initiativeRegions: req.body.regions, //in
        initiativeCountries: req.body.countries, //in
        initiativeActivities: req.body.activities, //in
        initiativeSourceOfFees: req.body.sourceOfFees, //in
        initiativeLaunchCountry: req.body.launchCountry, //in
        initiativeTargetGeo: req.body.targetGeos, //in
        initiativetargetPopulationSector: req.body.targetPopulationSectors, //in
        initiativeOutcomesMonitored: req.body.outcomesMonitored, //in
        initiativeMEdSubs: req.body.mEdSubs, //in
        initiativeOEdSubs: req.body.oEdSubs, //in
        initiativeManagementTypes: req.body.managementTypes, //in
        // single val implementer
        implementorName: req.body.iname, //im
        implementorMotive: req.body.impMotive, //im
        // single val other
        comments: req.body.comments, //other
        needsReview: req.body.needsReview //other
    }


   //Insert funder data
   var query1 = "INSERT into funder VALUES ('" + formData.funderName +"','"+ formData.funderUrl +"','"+ formData.funderMotive +"','"+ formData.funderImpact +"','"+ formData.funderOrganizationForm +"')"
   async.parallel([
    function(queryDB) {
        pool.query(query1, {}, function(err, results) {
            if (err){
                return queryDB(err)
            }else{
                //formData.table1 = results;
                queryDB()
            } 
            
        })
    },

    ], function(err) {
        if (err){
            console.log(err)
        }

    })
   
   
   //Insert funder international bases data
   for(var i = 0; i <formData.funderInternationalBases.length; i++) {
        var query2 = "INSERT into funderinternationalbases VALUES ('" + formData.funderName +"','"+ formData.funderInternationalBases[i] +"')"
        //console.log(query2)
        async.parallel([
            function(queryDB) {
                pool.query(query2, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
                        //formData.table1 = results;
                        queryDB()
                    } 
                    
                })
            },

        ], function(err) {
            if (err){
                console.log(err)
            }
        
    })
    }
   
    //Insert funder education subsector data
  for(var i = 0; i <formData.funderEducationSubsector.length; i++) {
    var query3 = "INSERT into fundereducationsubsectors VALUES ('" + formData.funderName +"','"+ formData.funderEducationSubsector[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
   
    //Insert funder education organizational traits data
   for(var i = 0; i <formData.funderOrgTraits.length; i++) {
    var query4 = "INSERT into funderorganizationtraits VALUES ('" + formData.funderName +"','"+ formData.funderOrgTraits[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }

    //Insert funder education funder asia bases data
   for(var i = 0; i <formData.funderAsiaBases.length; i++) {
    var query5 = "INSERT into funderasiabases VALUES ('" + formData.funderName +"','"+ formData.funderAsiaBases[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    //Insert funder education funder asia operations data
   for(var i = 0; i < formData.funderAsiaOperations.length; i++) {
    var query6 = "INSERT into funderasiaoperations VALUES ('" + formData.funderName +"','"+ formData.funderAsiaOperations[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
   

    //Insert initative data
    query7 = "INSERT into initiative VALUES ("+ genTagNum.currentTagNum +",'"+ formData.initiativeName +"','"+ formData.initiativeURL +"',"+ formData.initiativeTargetsWomen +
     ",'"+ formData.initiativeStart +"','"+ formData.initiativeEnd +"','"+ formData.initiativeDescription +"','"+ formData.initiativeProgramAreas+"','"
     + formData.initiativeMainProgramActivity +"','"+ formData.initiativeFeeAccess+"')"
     async.parallel([
        function(queryDB) {
            pool.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
    
        ], function(err) {
            if (err){
                console.log(err)
            }
    
        })
    
    
    
     //Insert initiative region data
   for(var i = 0; i < formData.initiativeRegions.length; i++) {
    var query8 = "INSERT into initiativeregion VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeRegions+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
   
     //Insert initiative country of operation data
   for(var i = 0; i < formData.initiativeCountries.length; i++) {
    var query9 = "INSERT into initiativecountryofoperation VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeCountries+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative programming activity data
   for(var i = 0; i < formData.initiativeActivities.length; i++) {
    var query10 = "INSERT into initiativeprogrammingactivities VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeActivities+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative source of fees data
   for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
    var query11= "INSERT into initiativefundingsource VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeSourceOfFees+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative launch country data
   for(var i = 0; i < formData.initiativeLaunchCountry.length; i++) {
    var query12 =  "INSERT into initiativelaunchcountry VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeLaunchCountry+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert funder education funder asia operations data
   for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
    var query13 = "INSERT into initiativetargetgeography VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeTargetGeo+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative target population sector data
   for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
    var query14 = "INSERT into initiativetargetpopulationsector VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativetargetPopulationSector+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query14, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative outcomes monitored data
   for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
    var query15 = "INSERT into initiativemonitoredoutcomes VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeOutcomesMonitored+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query15, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative main education subsector data
   for(var i = 0; i < formData.initiativeMEdSubs.length; i++) {
    var query16 = "INSERT into initiativemaineducationsubsector VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeMEdSubs+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query16, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative education subsector data
   for(var i = 0; i < formData.initiativeOEdSubs.length; i++) {
    var query17 = "INSERT into initiativeeducationsubsectors VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeOEdSubs+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query17, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    
     //Insert initiative target management t data
   for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
    var query18 = "INSERT into initiativetargetschoolmanagement VALUES (" + genTagNum.currentTagNum +",'"+ formData.initiativeManagementTypes+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query18, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
  
    //implementor queries
    var query19 = "INSERT INTO implementor VALUES ('" + formData.implementorName + "','" + formData.implementorMotive+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query19, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
    
        ], function(err) {
            if (err){
                console.log(err)
            }
    
        })


    // funder - funds - relationship
    var query20 = "INSERT INTO funds VALUES ("+ genTagNum.currentTagNum+ ",'"+ formData.funderName + "','" + formData.initiativeStart + "','" + formData.initiativeEnd +"')"

    //implementor - implements - initiative   
    var query21 = "INSERT INTO implements VALUES ("+ genTagNum.currentTagNum+ ",'"+ formData.implementorName + "','" + formData.initiativeStart + "','" + formData.initiativeEnd +"')"

    async.parallel([
        function(queryDB) {
            pool.query(query20, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query21, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
    
        ], function(err) {
            if (err){
                console.log(err)
            }
    
        })

     
       
   //AT THE VERY END
   genTagNum.add()
   res.send("Form successfully added to the DB")

})

dashboard.get('/delete-form/:tagNum', (req, res) =>{

})

dashboard.get('/delete-form-temp/:tagNum', (req, res) =>{
    
})

module.exports = dashboard