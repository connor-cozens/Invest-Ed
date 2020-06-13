const express   = require("express")
const sql       = require("mysql2")
const async     = require('async');
const cors      = require('cors')
var storage     = require ('node-persist')
var redis       = require("redis")

var client = redis.createClient()
client.on('connect', function(){
    console.log('Dashboard connected ')
})

client.exists('tagNumber', function(err, reply){
    if(reply != 1){
       client.set('tagNumber', 1521)
    }else{
        client.incr('tagNumber')
        client.get('tagNumber', function(err, reply){
            console.log(reply)
        })
    }
})

const dashboard = express.Router()
dashboard.use(cors())



//Create pool connection to DB
const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inves431_girlsEd',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})

const poolTemp = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inves431_girlsEd_temp',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})

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
                    //If no results back for initiative, then form doesn't exist for corresponding tag number
                    if (results.length === 0) {
                      return queryDB("Could not find requested form")
                    }
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
            res.json({error: err})
          }else{
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
                  res.json(err)
                }else{
                    var temp = {}
                    final++;
                    test.push(funderIndividual)
                    temp.table1 = test
                    Object.assign(formData, temp.table1)


                    if(final == funderData.length)
                        res.json(formData)

                }

            })
        }


    }


})


//GET form from temp DB
dashboard.get('/form-temp/:tagNum', (req, res) =>{
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
    var query11 = "SELECT * FROM initiativeeducationsubsectors WHERE initiativeTagNumber =" + tagNum
    var query12 = "SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =" + tagNum

     //implementor queries
     var query13 = "SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =" + tagNum

    //funder queries
    var query14 = "SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =" + tagNum

    //status & comments queries
    var query15 = "SELECT * FROM status INNER JOIN comments USING (tagNumber) WHERE tagNumber=" + tagNum
    var query16 = "SELECT * FROM sectionReviews WHERE tagNumber="+tagNum

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
                    //If no results back for initiative, then form doesn't exist for corresponding tag number
                    if (results.length === 0) {
                      return queryDB("Could not find requested form")
                    }
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
        },
        function(queryDB) {
            poolTemp.query(query16, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table16 = results;
                    queryDB()

                }

            })
        }

     ], function(err) {
          if (err){
            res.json({error: err})
          }else{
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
                  res.json(err)
                }else{
                    var temp = {}
                    final++;
                    test.push(funderIndividual)
                    temp.table1 = test
                    Object.assign(formData, temp.table1)

                    if(final == funderData.length)
                        res.json(formData)
                }
            })
        }

    }
})

//POST new form to temp DB
dashboard.post('/submit-form-temp', (req, res) =>{

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
        needsReview: req.body.needsReview, //other
        inDB: req.body.inDB,

        //section Reviews
        funderNameApproval: req.body.fnameA,
        funderUrlApproval: req.body.furlA,
        funderMotiveApproval: req.body.motiveA,
        funderImpactApproval: req.body.impactA,
        funderOrganizationFormApproval: req.body.organizationFormA,
        funderInternationalBaseApproval: req.body.internationalBasesA,
        funderEdSubsApproval: req.body.edSubsA,
        funderOrgTraitsApproval: req.body.orgTraitsA,
        funderAsiaBasesApproval: req.body.asialBasesA,
        funderAsiaOperationsApproval: req.body.asiaOperationsA,
        initNameApproval:req.body.initNameA,
        initUrlApproval: req.body.initURLA,
        initTargetsWomenApproval: req.body.tWomenA,
        initStartApproval: req.body.initStartA,
        initEndApproval: req.body.initEndA,
        initDescriptionApproval: req.body.idescriptionA,
        initProgramAreasApproval: req.body.programAreaA,
        initMainProgramActivityApproval: req.body.initiativeMainProgramActivityA,
        initFeeAccessApproval: req.body.feeAccessA,
        initRegionsApproval: req.body.regionsA,
        initCountriesApproval: req.body.countriesA,
        initActivitiesApproval:  req.body.activitiesA,
        initSourceOfFeesApproval: req.body.sourceOfFeesA,
        initLaunchCountryApproval: req.body.launchCountryA,
        initTargetGeoApproval: req.body.targetGeosA,
        initTargetPopulationSectorApproval: req.body.targetPopulationSectorsA,
        initOutcomesMonitoredApproval: req.body.outcomesMonitoredA,
        initMEdSubsApproval: req.body.mEdSubsA,
        initOEdSubsApproval:  req.body.oEdSubsA,
        initManagementTypesApproval: req.body.managementTypesA,
        implementorNameApproval: req.body.inameA,
        implementorMotiveApproval: req.body.impMotiveA

    }

   //Insert funder data
   var query1 = "INSERT into funder VALUES ('" + formData.funderName +"','"+ formData.funderUrl +"','"+ formData.funderMotive +"','"+ formData.funderImpact +"','"+ formData.funderOrganizationForm +"')"
   async.parallel([
    function(queryDB) {
        poolTemp.query(query1, {}, function(err, results) {
            if (err){
                return queryDB(err)
            }else{
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
                poolTemp.query(query2, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
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
            poolTemp.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
            poolTemp.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
            poolTemp.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
            poolTemp.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    test = client.get('tagNumber', function(err, reply){
        function1(reply)
    })

   function function1(val){
        query7 = "INSERT into initiative VALUES ("+ val +",'"+ formData.initiativeName +"','"+ formData.initiativeURL +"',"+ formData.initiativeTargetsWomen +
        ",'"+ formData.initiativeStart +"','"+ formData.initiativeEnd +"','"+ formData.initiativeDescription +
        "',(SELECT programArea FROM programarea WHERE programArea ='" +formData.initiativeProgramAreas
        +"') , (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = '"+ formData.initiativeMainProgramActivity +"'),"+ formData.initiativeFeeAccess+")"
        async.parallel([
        function(queryDB) {
            poolTemp.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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





     //Insert initiative region data
     test = client.get('tagNumber', function(err, reply){
       function2(reply)
    })

   function function2(val){
    for(var i = 0; i < formData.initiativeRegions.length; i++) {
        var query8 = "INSERT into initiativeregion VALUES (" + val+", (SELECT regionName from regions WHERE regionName = '"+ formData.initiativeRegions[i]+"'))"
        async.parallel([
            function(queryDB) {
                poolTemp.query(query8, {}, function(err, results) {
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

   }



//      //Insert initiative country of operation data
     test = client.get('tagNumber', function(err, reply){
       function3(reply)
    })

   function function3(val){
   for(var i = 0; i < formData.initiativeCountries.length; i++) {
    var query9 = "INSERT into initiativecountryofoperation VALUES ( " + val+", (SELECT countryName from country WHERE countryName='"+ formData.initiativeCountries[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //Insert initiative programming activity data
     test = client.get('tagNumber', function(err, reply){
       function4(reply)
    })

   function function4(val){
   for(var i = 0; i < formData.initiativeActivities.length; i++) {
    var query10 = "INSERT into initiativeprogrammingactivities VALUES (" + val +",'"+ formData.initiativeActivities[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

   //Insert initiative source of fees data
   test = client.get('tagNumber', function(err, reply){
   function5(reply)
})

function function5(val){
   for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
    var query11= "INSERT into initiativefundingsource VALUES (" + val +",'"+ formData.initiativeSourceOfFees[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

//     //Insert initiative launch country data
    test = client.get('tagNumber', function(err, reply){
       function6(reply)
    })

   function function6(val){
   for(var i = 0; i < formData.initiativeLaunchCountry.length; i++) {
    var query12 =  "INSERT into initiativelaunchcountry VALUES (" + val +",(SELECT countryName from country WHERE countryName='"+ formData.initiativeLaunchCountry[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //Insert initiative target geo data
     test = client.get('tagNumber', function(err, reply){
       function7(reply)
    })

   function function7(val){
   for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
    var query13 = "INSERT into initiativetargetgeography VALUES ( " + val +",'"+ formData.initiativeTargetGeo[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

//      //Insert initiative target population sector data
     test = client.get('tagNumber', function(err, reply){
       function8(reply)
    })

   function function8(val){
   for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
    var query14 = "INSERT into initiativetargetpopulationsector VALUES (" + val +",'"+ formData.initiativetargetPopulationSector[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query14, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //Insert initiative outcomes monitored data
     test = client.get('tagNumber', function(err, reply){
       function9(reply)
    })

   function function9(val){
   for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
    var query15 = "INSERT into initiativemonitoredoutcomes VALUES (" + val +",'"+ formData.initiativeOutcomesMonitored[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query15, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }


     //Insert initiative main education subsector data
     test = client.get('tagNumber', function(err, reply){
       function10(reply)
    })

   function function10(val){
   for(var i = 0; i < formData.initiativeMEdSubs.length; i++) {
    var query16 = "INSERT into initiativemaineducationsubsector VALUES (" + val +
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeMEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query16, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

      //Insert initiative education subsector data
     test = client.get('tagNumber', function(err, reply){
       function11(reply)
    })

   function function11(val){
   for(var i = 0; i < formData.initiativeOEdSubs.length; i++) {
    var query17 = "INSERT into initiativeeducationsubsectors VALUES (" + val +
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeOEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query17, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //Insert initiative target management t data
     test = client.get('tagNumber', function(err, reply){
       function12(reply)
    })

   function function12(val){
   for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
    var query18 = "INSERT into initiativetargetschoolmanagement VALUES (" + val +",'"+ formData.initiativeManagementTypes[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query18, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //implementor queries
    var query19 = "INSERT INTO implementor VALUES ('" + formData.implementorName + "','" + formData.implementorMotive+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query19, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    test = client.get('tagNumber', function(err, reply){
       function13(reply)
    })

   function function13(val){

  // funder - funds - relationship
    var query20 = "INSERT INTO funds VALUES ("+ val + ",'"
    + formData.funderName+ "','"+formData.initiativeStart + "','" + formData.initiativeEnd +"')"

    // //implementor - implements - initiative
    var query21 = "INSERT INTO implements VALUES ("+ val +",'"+
    formData.implementorName + "','" + formData.initiativeStart + "','" + formData.initiativeEnd +"')"

    async.parallel([
        function(queryDB) {
            poolTemp.query(query20, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },
        function(queryDB) {
            poolTemp.query(query21, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    test = client.get('tagNumber', function(err, reply){
        function15(reply)
    })

   function function15(val){
    var query22 = "INSERT INTO comments VALUES ("+ val+ ",'"+ formData.comments +"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query22, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

   test = client.get('tagNumber', function(err, reply){
    function16(reply)
    })

function function16(val){
        var query23 = "INSERT INTO status VALUES ("+ val+ ","+ formData.inDB + "," + formData.needsReview +")"
        async.parallel([
            function(queryDB) {
                poolTemp.query(query23, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
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

    test = client.get('tagNumber', function(err, reply){
        function17(reply)
    })

   function function17(val){
        var query24 = "INSERT INTO sectionreviews VALUES ("+ val + "," +
        formData.funderNameApproval + "," +
        formData.funderUrlApproval + "," +
        formData.funderMotiveApproval + "," +
        formData.funderImpactApproval + "," +
        formData.funderOrganizationFormApproval + "," +
        formData.funderInternationalBaseApproval + "," +
        formData.funderEdSubsApproval + "," +
        formData.funderOrgTraitsApproval+ "," +
        formData.funderAsiaBasesApproval+ "," +
        formData.funderAsiaOperationsApproval+ "," +
        formData.initNameApproval + "," +
        formData.initUrlApproval+ "," +
        formData.initTargetsWomenApproval+ "," +
        formData.initStartApproval+ "," +
        formData.initEndApproval+ "," +
        formData.initDescriptionApproval+ "," +
        formData.initProgramAreasApproval+ "," +
        formData.initMainProgramActivityApproval+ "," +
        formData.initFeeAccessApproval+ "," +
        formData.initRegionsApproval+ "," +
        formData.initCountriesApproval+ "," +
        formData.initActivitiesApproval + "," +
        formData.initSourceOfFeesApproval+ "," +
        formData.initLaunchCountryApproval+ "," +
        formData.initTargetGeoApproval+ "," +
        formData.initTargetPopulationSectorApproval+ "," +
        formData.initOutcomesMonitoredApproval+ "," +
        formData.initMEdSubsApproval+ "," +
        formData.initOEdSubsApproval + "," +
        formData.initManagementTypesApproval+ "," +
        formData.implementorNameApproval+ "," +
        formData.implementorMotiveApproval +")"


        async.parallel([
            function(queryDB) {
                poolTemp.query(query24, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
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

   res.json("Form successfully added to the DB")

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
    }

   //Insert funder data
   var query1 = "INSERT into funder VALUES ('" + formData.funderName +"','"+ formData.funderUrl +"','"+ formData.funderMotive +"','"+ formData.funderImpact +"','"+ formData.funderOrganizationForm +"')"
   async.parallel([
    function(queryDB) {
        pool.query(query1, {}, function(err, results) {
            if (err){
                return queryDB(err)
            }else{
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
    test = client.get('tagNumber', function(err, reply){
        function1(reply)
    })

   function function1(val){
        query7 = "INSERT into initiative VALUES ("+ val +",'"+ formData.initiativeName +"','"+ formData.initiativeURL +"',"+ formData.initiativeTargetsWomen +
        ",'"+ formData.initiativeStart +"','"+ formData.initiativeEnd +"','"+ formData.initiativeDescription +
        "',(SELECT programArea FROM programarea WHERE programArea ='" +formData.initiativeProgramAreas
        +"') , (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = '"+ formData.initiativeMainProgramActivity +"'),"+ formData.initiativeFeeAccess+")"
        async.parallel([
        function(queryDB) {
            pool.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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





     //Insert initiative region data
     test = client.get('tagNumber', function(err, reply){
       function2(reply)
    })

   function function2(val){
    for(var i = 0; i < formData.initiativeRegions.length; i++) {
        var query8 = "INSERT into initiativeregion VALUES (" + val+", (SELECT regionName from regions WHERE regionName = '"+ formData.initiativeRegions[i]+"'))"
        async.parallel([
            function(queryDB) {
                pool.query(query8, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
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

   }



    //Insert initiative country of operation data
     test = client.get('tagNumber', function(err, reply){
       function3(reply)
    })

   function function3(val){
   for(var i = 0; i < formData.initiativeCountries.length; i++) {
    var query9 = "INSERT into initiativecountryofoperation VALUES ( " + val+", (SELECT countryName from country WHERE countryName='"+ formData.initiativeCountries[i]+"'))"
    async.parallel([
        function(queryDB) {
            pool.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //Insert initiative programming activity data
     test = client.get('tagNumber', function(err, reply){
       function4(reply)
    })

   function function4(val){
   for(var i = 0; i < formData.initiativeActivities.length; i++) {
    var query10 = "INSERT into initiativeprogrammingactivities VALUES (" + val +",'"+ formData.initiativeActivities[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

//    //Insert initiative source of fees data
   test = client.get('tagNumber', function(err, reply){
   function5(reply)
})

function function5(val){
   for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
    var query11= "INSERT into initiativefundingsource VALUES (" + val +",'"+ formData.initiativeSourceOfFees[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

//     //Insert initiative launch country data
    test = client.get('tagNumber', function(err, reply){
       function6(reply)
    })

   function function6(val){
   for(var i = 0; i < formData.initiativeLaunchCountry.length; i++) {
    var query12 =  "INSERT into initiativelaunchcountry VALUES (" + val +",(SELECT countryName from country WHERE countryName='"+ formData.initiativeLaunchCountry[i]+"'))"
    async.parallel([
        function(queryDB) {
            pool.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

//      //Insert initiative target geo data
     test = client.get('tagNumber', function(err, reply){
       function7(reply)
    })

   function function7(val){
   for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
    var query13 = "INSERT into initiativetargetgeography VALUES ( " + val +",'"+ formData.initiativeTargetGeo[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

//      //Insert initiative target population sector data
     test = client.get('tagNumber', function(err, reply){
       function8(reply)
    })

   function function8(val){
   for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
    var query14 = "INSERT into initiativetargetpopulationsector VALUES (" + val +",'"+ formData.initiativetargetPopulationSector[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query14, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

      //Insert initiative outcomes monitored data
     test = client.get('tagNumber', function(err, reply){
       function9(reply)
    })

   function function9(val){
   for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
    var query15 = "INSERT into initiativemonitoredoutcomes VALUES (" + val +",'"+ formData.initiativeOutcomesMonitored[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query15, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }


//      //Insert initiative main education subsector data
     test = client.get('tagNumber', function(err, reply){
       function10(reply)
    })

   function function10(val){
   for(var i = 0; i < formData.initiativeMEdSubs.length; i++) {
    var query16 = "INSERT into initiativemaineducationsubsector VALUES (" + val +
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeMEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            pool.query(query16, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //Insert initiative education subsector data
     test = client.get('tagNumber', function(err, reply){
       function11(reply)
    })

   function function11(val){
   for(var i = 0; i < formData.initiativeOEdSubs.length; i++) {
    var query17 = "INSERT into initiativeeducationsubsectors VALUES (" + val +
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeOEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            pool.query(query17, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //Insert initiative target management t data
     test = client.get('tagNumber', function(err, reply){
       function12(reply)
    })

   function function12(val){
   for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
    var query18 = "INSERT into initiativetargetschoolmanagement VALUES (" + val +",'"+ formData.initiativeManagementTypes[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query18, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //implementor queries
    var query19 = "INSERT INTO implementor VALUES ('" + formData.implementorName + "','" + formData.implementorMotive+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query19, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    test = client.get('tagNumber', function(err, reply){
       function13(reply)
    })

   function function13(val){


  // funder - funds - relationship
    var query20 = "INSERT INTO funds VALUES ("+ val + ",'"
    + formData.funderName+ "','"+formData.initiativeStart + "','" + formData.initiativeEnd +"')"

    // //implementor - implements - initiative
    var query21 = "INSERT INTO implements VALUES ("+ val +",'"+
    formData.implementorName + "','" + formData.initiativeStart + "','" + formData.initiativeEnd +"')"

    async.parallel([
        function(queryDB) {
            pool.query(query20, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },
        function(queryDB) {
            pool.query(query21, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

   res.json("Form successfully added to the DB")

})

dashboard.post('/update-form', (req, res) =>{

    const formData = {

        //original values
        tagNum: req.body.tagNum,
        OfunderName: req.body.ofname,
        OimplementorName: req.body.oiname,
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
    }

    //Update funder data
   var query1 = "UPDATE funder SET funderName = '" + formData.funderName + "', funderWebsite ='"+ formData.funderUrl +"', profitMotive ='"+ formData.funderMotive +"', impactInvesting ='"+ formData.funderImpact
   +"', organizationalForm ='"+ formData.funderOrganizationForm +"' WHERE funderName = '" + formData.OfunderName + "'"
   async.parallel([
    function(queryDB) {
        pool.query(query1, {}, function(err, results) {
            if (err){
                return queryDB(err)
            }else{
                queryDB()
            }

        })
    },

    ], function(err) {
        if (err){
            console.log(err)
        }

    })

    //delete all funder international base
    var query2 = "DELETE FROM funderinternationalbases WHERE funderName = '"+ formData.OfunderName+ "'"
    async.parallel([
        function(queryDB) {
            pool.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    var query3 = "INSERT into funderinternationalbases VALUES ('" + formData.funderName +"','"+ formData.funderInternationalBases[i] +"')"
    //console.log(query2)
    async.parallel([
        function(queryDB) {
            poolTemp.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder fundereducationsubsectors
    var query4 = "DELETE FROM fundereducationsubsectors WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //Insert funder education subsector data
    for(var i = 0; i <formData.funderEducationSubsector.length; i++) {
    var query5 = "INSERT into fundereducationsubsectors VALUES ('" + formData.funderName +"','"+ formData.funderEducationSubsector[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder funderorganizationtraits
    var query6 = "DELETE FROM funderorganizationtraits WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert funder education organizational traits data
    for(var i = 0; i <formData.funderOrgTraits.length; i++) {
    var query7 = "INSERT into funderorganizationtraits VALUES ('" + formData.funderName +"','"+ formData.funderOrgTraits[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder asiabases
    var query8 = "DELETE FROM funderasiabases WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert funder asia bases data
    for(var i = 0; i <formData.funderAsiaBases.length; i++) {
    var query9 = "INSERT into funderasiabases VALUES ('" + formData.funderName +"','"+ formData.funderAsiaBases[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder asia operations
    var query10= "DELETE FROM funderasiaoperations WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert funder education funder asia operations data
    for(var i = 0; i < formData.funderAsiaOperations.length; i++) {
    var query11 = "INSERT into funderasiaoperations VALUES ('" + formData.funderName +"','"+ formData.funderAsiaOperations[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    query12 = "UPDATE initiative SET initiativeName = '" + formData.initiativeName +"', initiativeWebsite ='"+ formData.initiativeURL +"', targetsWomen ="+ formData.initiativeTargetsWomen +
    ", startYear ='"+ formData.initiativeStart +"',endYear='"+ formData.initiativeEnd +"', description ='"+ formData.initiativeDescription +
    "', mainProgrammingArea = (SELECT programArea FROM programarea WHERE programArea ='" +formData.initiativeProgramAreas
    +"') , mainProgrammingActivity = (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = '"+ formData.initiativeMainProgramActivity +"'), feeToAccess ="+ formData.initiativeFeeAccess
    +" WHERE tagNumber = " + formData.tagNum
    async.parallel([
        function(queryDB) {
            poolTemp.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    //delete initiative region data
    var query13= "DELETE FROM initiativeregion WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    test = client.get('tagNumber', function(err, reply){
        console.log(reply)
       function1(reply)
    })

   function function1(val){
    for(var i = 0; i < formData.initiativeRegions.length; i++) {

        var query14 = "INSERT into initiativeregion VALUES (" + val+", (SELECT regionName from regions WHERE regionName = '"+ formData.initiativeRegions[i]+"'))"
        console.log(formData.initiativeRegions[i])
        async.parallel([
            function(queryDB) {
                poolTemp.query(query14, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
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
    }

    //delete initiativecountryofoperation data
    var query15= "DELETE FROM initiativecountryofoperation WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query15, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative country of operation data
    test = client.get('tagNumber', function(err, reply){
       function2(reply)
    })

   function function2(val){
    for(var i = 0; i < formData.initiativeCountries.length; i++) {
    var query16 = "INSERT into initiativecountryofoperation VALUES (" + val +", (SELECT countryName from country WHERE countryName='"+ formData.initiativeCountries[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query16, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }
    //delete initiativeprogrammingactivities data
    var query17= "DELETE FROM initiativeprogrammingactivities WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query17, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //Insert initiative programming activity data
    test = client.get('tagNumber', function(err, reply){
       function3(reply)
    })

   function function3(val){
    for(var i = 0; i < formData.initiativeActivities.length; i++) {
    var query18 = "INSERT into initiativeprogrammingactivities VALUES ( " + val +",'"+ formData.initiativeActivities[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query18, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
   }
      //delete initiativefundingsource data
      var query19= "DELETE FROM initiativefundingsource WHERE tagNumber = "+ formData.tagNum
      async.parallel([
          function(queryDB) {
              pool.query(query19, {}, function(err, results) {
                  if (err){
                      return queryDB(err)
                  }else{
                      queryDB()
                  }

              })
          },

          ], function(err) {
              if (err){
                  console.log(err)
              }

          })

    //Insert initiative source of fees data
    test = client.get('tagNumber', function(err, reply){
       function4(reply)
    })

   function function4(val){
    for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
    var query20= "INSERT into initiativefundingsource VALUES (" + val +",'"+ formData.initiativeSourceOfFees[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query20, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
   }
     //delete launchcountry data
     var query21= "DELETE FROM initiativelaunchcountry WHERE tagNumber = "+ formData.tagNum
     async.parallel([
         function(queryDB) {
             pool.query(query21, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{
                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //Insert initiative launch country data
    test = client.get('tagNumber', function(err, reply){
       function5(reply)
    })

   function function5(val){
    for(var i = 0; i < formData.initiativeLaunchCountry.length; i++) {
    var query22 =  "INSERT into initiativelaunchcountry VALUES (" + val +",(SELECT countryName from country WHERE countryName='"+ formData.initiativeLaunchCountry[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query22, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }
     //delete initiativetargetgeography data
     var query23= "DELETE FROM initiativetargetgeography WHERE tagNumber = "+ formData.tagNum
     async.parallel([
         function(queryDB) {
             pool.query(query23, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{
                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //Insert initiative target geo data
    test = client.get('tagNumber', function(err, reply){
       function6(reply)
    })

   function function6(val){
    for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
    var query24 = "INSERT into initiativetargetgeography VALUES ( " + val +",'"+ formData.initiativeTargetGeo[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query24, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //delete INSERT into initiativetargetpopulationsector data
    var query25= "DELETE FROM initiativetargetpopulationsector WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query25, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative target population sector data
    test = client.get('tagNumber', function(err, reply){
       function7(reply)
    })

   function function7(val){
    for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
    var query26 = "INSERT into initiativetargetpopulationsector VALUES (" + val+",'"+ formData.initiativetargetPopulationSector[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query26, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }
    //delete initiativemonitoredoutcomes data
    var query27= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query27, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative outcomes monitored data
    test = client.get('tagNumber', function(err, reply){
       function8(reply)
    })

   function function8(val){
    for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
    var query28 = "INSERT into initiativemonitoredoutcomes VALUES ( " + val +",'"+ formData.initiativeOutcomesMonitored[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query28, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //delete initiativemonitoredoutcomes data
     var query29= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ formData.tagNum
     async.parallel([
         function(queryDB) {
             pool.query(query29, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //Insert initiative main education subsector data
    test = client.get('tagNumber', function(err, reply){
       function9(reply)
    })

   function function9(val){
    for(var i = 0; i < formData.initiativeMEdSubs.length; i++) {
    var query30 = "INSERT into initiativemaineducationsubsector VALUES ( " + genTagNum.currentTagNum +
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeMEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query30, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //delete initiativeeducationsubsectors data
    var query31= "DELETE FROM initiativeeducationsubsectors WHERE initiativeTagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query31, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative education subsector data
    test = client.get('tagNumber', function(err, reply){
       function10(reply)
    })

   function function10(val){
    for(var i = 0; i < formData.initiativeOEdSubs.length; i++) {
    var query32 = "INSERT into initiativeeducationsubsectors VALUES (" + val +
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeOEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query32, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
   }
    //delete initiativetargetschoolmanagement data
    var query33= "DELETE FROM initiativetargetschoolmanagement WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query33, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative target management t data
    test = client.get('tagNumber', function(err, reply){
       function11(reply)
    })

   function function11(val){
    for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
    var query34 = "INSERT into initiativetargetschoolmanagement VALUES (" + val+",'"+ formData.initiativeManagementTypes[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query34, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //implementor queries
    var query35 = "UPDATE implementor SET implementorName ='" + formData.implementorName + "', profitMotive ='" + formData.implementorMotive+"' WHERE implementorName = '"+ formData.OimplementorName +"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query35, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    var query36 = "UPDATE funds SET funderName = '"
    + formData.funderName+ "', startYear = '"+formData.initiativeStart + "', endYear ='" + formData.initiativeEnd +"') WHERE (tagNum =" + formData.tagNum + ") AND (funderName = '"
    + formData.ofname +"')"

    // //implementor - implements - initiative
    var query37 = "UPDATE implements SET implementorName = '"+ formData.implementorName + "', startYear ='"
    + formData.initiativeStart + "', endYear ='" + formData.initiativeEnd +"' WHERE (tagNum =" + formData.tagNum + ") AND (implementorName = '" + formData.OimplementorName + "')"

    async.parallel([
        function(queryDB) {
            poolTemp.query(query36, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },
        function(queryDB) {
            poolTemp.query(query37, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    res.send("Inves431_girlsEd updated successfully!")


})

dashboard.post('/update-form-temp', (req, res) =>{

    const formData = {

        //original values
        tagNum: req.body.tagNum,
        OfunderName: req.body.ofname,
        OimplementorName: req.body.oiname,
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
        needsReview: req.body.needsReview, //other
        inDB: req.body.inDB,

        //section Reviews
        funderNameApproval: req.body.fnameA,
        funderUrlApproval: req.body.furlA,
        funderMotiveApproval: req.body.motiveA,
        funderImpactApproval: req.body.impactA,
        funderOrganizationFormApproval: req.body.organizationFormA,
        funderInternationalBaseApproval: req.body.internationalBasesA,
        funderEdSubsApproval: req.body.edSubsA,
        funderOrgTraitsApproval: req.body.orgTraitsA,
        funderAsiaBasesApproval: req.body.asialBasesA,
        funderAsiaOperationsApproval: req.body.asiaOperationsA,
        initNameApproval:req.body.initNameA,
        initUrlApproval: req.body.initURLA,
        initTargetsWomenApproval: req.body.tWomenA,
        initStartApproval: req.body.initStartA,
        initEndApproval: req.body.initEndA,
        initDescriptionApproval: req.body.idescriptionA,
        initProgramAreasApproval: req.body.programAreaA,
        initMainProgramActivityApproval: req.body.initiativeMainProgramActivityA,
        initFeeAccessApproval: req.body.feeAccessA,
        initRegionsApproval: req.body.regionsA,
        initCountriesApproval: req.body.countriesA,
        initActivitiesApproval:  req.body.activitiesA,
        initSourceOfFeesApproval: req.body.sourceOfFeesA,
        initLaunchCountryApproval: req.body.launchCountryA,
        initTargetGeoApproval: req.body.targetGeosA,
        initTargetPopulationSectorApproval: req.body.targetPopulationSectorsA,
        initOutcomesMonitoredApproval: req.body.outcomesMonitoredA,
        initMEdSubsApproval: req.body.mEdSubsA,
        initOEdSubsApproval:  req.body.oEdSubsA,
        initManagementTypesApproval: req.body.managementTypesA,
        implementorNameApproval: req.body.inameA,
        implementorMotiveApproval: req.body.impMotiveA
    }

    //Update funder data
   var query1 = "UPDATE funder SET funderName = '" + formData.funderName + "', funderWebsite ='"+ formData.funderUrl +"', profitMotive ='"+ formData.funderMotive +"', impactInvesting ='"+ formData.funderImpact
   +"', organizationalForm ='"+ formData.funderOrganizationForm +"' WHERE funderName = '" + formData.OfunderName + "'"
   async.parallel([
    function(queryDB) {
        pool.query(query1, {}, function(err, results) {
            if (err){
                return queryDB(err)
            }else{
                queryDB()
            }

        })
    },

    ], function(err) {
        if (err){
            console.log(err)
        }

    })

    //delete all funder international base
    var query2 = "DELETE FROM funderinternationalbases WHERE funderName = '"+ formData.OfunderName+ "'"
    async.parallel([
        function(queryDB) {
            pool.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    var query3 = "INSERT into funderinternationalbases VALUES ('" + formData.funderName +"','"+ formData.funderInternationalBases[i] +"')"
    //console.log(query2)
    async.parallel([
        function(queryDB) {
            poolTemp.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder fundereducationsubsectors
    var query4 = "DELETE FROM fundereducationsubsectors WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //Insert funder education subsector data
    for(var i = 0; i <formData.funderEducationSubsector.length; i++) {
    var query5 = "INSERT into fundereducationsubsectors VALUES ('" + formData.funderName +"','"+ formData.funderEducationSubsector[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder funderorganizationtraits
    var query6 = "DELETE FROM funderorganizationtraits WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert funder education organizational traits data
    for(var i = 0; i <formData.funderOrgTraits.length; i++) {
    var query7 = "INSERT into funderorganizationtraits VALUES ('" + formData.funderName +"','"+ formData.funderOrgTraits[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder asiabases
    var query8 = "DELETE FROM funderasiabases WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert funder asia bases data
    for(var i = 0; i <formData.funderAsiaBases.length; i++) {
    var query9 = "INSERT into funderasiabases VALUES ('" + formData.funderName +"','"+ formData.funderAsiaBases[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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

    //delete all funder asia operations
    var query10= "DELETE FROM funderasiaoperations WHERE funderName = '"+ formData.OfunderName + "'"
    async.parallel([
        function(queryDB) {
            pool.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert funder education funder asia operations data
    for(var i = 0; i < formData.funderAsiaOperations.length; i++) {
    var query11 = "INSERT into funderasiaoperations VALUES ('" + formData.funderName +"','"+ formData.funderAsiaOperations[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    query12 = "UPDATE initiative SET initiativeName = '" + formData.initiativeName +"', initiativeWebsite ='"+ formData.initiativeURL +"', targetsWomen ="+ formData.initiativeTargetsWomen +
    ", startYear ='"+ formData.initiativeStart +"',endYear='"+ formData.initiativeEnd +"', description ='"+ formData.initiativeDescription +
    "', mainProgrammingArea = (SELECT programArea FROM programarea WHERE programArea ='" +formData.initiativeProgramAreas
    +"') , mainProgrammingActivity = (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = '"+ formData.initiativeMainProgramActivity +"'), feeToAccess ="+ formData.initiativeFeeAccess
    +" WHERE tagNumber = " + formData.tagNum
    async.parallel([
        function(queryDB) {
            poolTemp.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    //delete initiative region data
    var query13= "DELETE FROM initiativeregion WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    test = client.get('tagNumber', function(err, reply){
       function1(reply)
    })

   function function1(val){
    for(var i = 0; i < formData.initiativeRegions.length; i++) {

        var query14 = "INSERT into initiativeregion VALUES ( " + val +", (SELECT regionName from regions WHERE regionName = '"+ formData.initiativeRegions[i]+"'))"
        console.log(formData.initiativeRegions[i])
        async.parallel([
            function(queryDB) {
                poolTemp.query(query14, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
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
    }


    //delete initiativecountryofoperation data
    var query15= "DELETE FROM initiativecountryofoperation WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query15, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative country of operation data
    test = client.get('tagNumber', function(err, reply){
       function2(reply)
    })

   function function2(val){
    for(var i = 0; i < formData.initiativeCountries.length; i++) {
    var query16 = "INSERT into initiativecountryofoperation VALUES (" + val+", (SELECT countryName from country WHERE countryName='"+ formData.initiativeCountries[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query16, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //delete initiativeprogrammingactivities data
    var query17= "DELETE FROM initiativeprogrammingactivities WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query17, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //Insert initiative programming activity data
    test = client.get('tagNumber', function(err, reply){
       function3(reply)
    })

   function function3(val){
    for(var i = 0; i < formData.initiativeActivities.length; i++) {
    var query18 = "INSERT into initiativeprogrammingactivities VALUES (" + val+",'"+ formData.initiativeActivities[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query18, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

      //delete initiativefundingsource data
      var query19= "DELETE FROM initiativefundingsource WHERE tagNumber = "+ formData.tagNum
      async.parallel([
          function(queryDB) {
              pool.query(query19, {}, function(err, results) {
                  if (err){
                      return queryDB(err)
                  }else{
                      queryDB()
                  }

              })
          },

          ], function(err) {
              if (err){
                  console.log(err)
              }

          })


    //Insert initiative source of fees data
    test = client.get('tagNumber', function(err, reply){
       function4(reply)
    })

   function function4(val){
    for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
    var query20= "INSERT into initiativefundingsource VALUES (" + val +",'"+ formData.initiativeSourceOfFees[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query20, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

     //delete launchcountry data
     var query21= "DELETE FROM initiativelaunchcountry WHERE tagNumber = "+ formData.tagNum
     async.parallel([
         function(queryDB) {
             pool.query(query21, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{
                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //Insert initiative launch country data
    test = client.get('tagNumber', function(err, reply){
       function5(reply)
    })

   function function5(val){
    for(var i = 0; i < formData.initiativeLaunchCountry.length; i++) {
    var query22 =  "INSERT into initiativelaunchcountry VALUES (" + val+",(SELECT countryName from country WHERE countryName='"+ formData.initiativeLaunchCountry[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query22, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
   }
     //delete initiativetargetgeography data
     var query23= "DELETE FROM initiativetargetgeography WHERE tagNumber = "+ formData.tagNum
     async.parallel([
         function(queryDB) {
             pool.query(query23, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //Insert initiative target geo data
    test = client.get('tagNumber', function(err, reply){
       function6(reply)
    })

   function function6(val){
    for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
    var query24 = "INSERT into initiativetargetgeography VALUES ( = " + val +",'"+ formData.initiativeTargetGeo[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query24, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //delete INSERT into initiativetargetpopulationsector data
    var query25= "DELETE FROM initiativetargetpopulationsector WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query25, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative target population sector data
    test = client.get('tagNumber', function(err, reply){
       function7(reply)
    })

   function function7(val){
    for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
    var query26 = "INSERT into initiativetargetpopulationsector VALUES (" + val +",'"+ formData.initiativetargetPopulationSector[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query26, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
   }
    //delete initiativemonitoredoutcomes data
    var query27= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query27, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative outcomes monitored data
    test = client.get('tagNumber', function(err, reply){
       function8(reply)
    })

   function function8(val){
    for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
    var query28 = "INSERT into initiativemonitoredoutcomes VALUES (" + val +",'"+ formData.initiativeOutcomesMonitored[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query28, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
   }
     //delete initiativemonitoredoutcomes data
     var query29= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ formData.tagNum
     async.parallel([
         function(queryDB) {
             pool.query(query29, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{
                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //Insert initiative main education subsector data
    test = client.get('tagNumber', function(err, reply){
       function9(reply)
    })

   function function9(val){
    for(var i = 0; i < formData.initiativeMEdSubs.length; i++) {
    var query30 = "INSERT into initiativemaineducationsubsector VALUES (" + val+
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeMEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query30, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //delete initiativeeducationsubsectors data
    var query31= "DELETE FROM initiativeeducationsubsectors WHERE initiativeTagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query31, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative education subsector data
    test = client.get('tagNumber', function(err, reply){
       function10(reply)
    })

   function function10(val){
    for(var i = 0; i < formData.initiativeOEdSubs.length; i++) {
    var query32 = "INSERT into initiativeeducationsubsectors VALUES (" + val+
    ",(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector ='"+ formData.initiativeOEdSubs[i]+"'))"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query32, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //delete initiativetargetschoolmanagement data
    var query33= "DELETE FROM initiativetargetschoolmanagement WHERE tagNumber = "+ formData.tagNum
    async.parallel([
        function(queryDB) {
            pool.query(query33, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //Insert initiative target management data
    test = client.get('tagNumber', function(err, reply){
       function11(reply)
    })

   function function11(val){
    for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
    var query34 = "INSERT into initiativetargetschoolmanagement VALUES (" + val+",'"+ formData.initiativeManagementTypes[i]+"')"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query34, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    }

    //implementor queries
    var query35 = "UPDATE implementor SET implementorName ='" + formData.implementorName + "', profitMotive ='" + formData.implementorMotive+"' WHERE implementorName = '"+ formData.OimplementorName +"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query35, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
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
    var query36 = "UPDATE funds SET funderName = '"
    + formData.funderName+ "', startYear = '"+formData.initiativeStart + "', endYear ='" + formData.initiativeEnd +"' WHERE (tagNum =" + formData.tagNum + ") AND (funderName = '"
    + formData.ofname +"')"

    // //implementor - implements - initiative
    var query37 = "UPDATE implements SET implementorName = '"+ formData.implementorName + "', startYear ='"
    + formData.initiativeStart + "', endYear ='" + formData.initiativeEnd +"' WHERE (tagNum =" + formData.tagNum + ") AND (implementorName = '" + formData.OimplementorName + "')"

    async.parallel([
        function(queryDB) {
            poolTemp.query(query36, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },
        function(queryDB) {
            poolTemp.query(query37, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })




        var query38 = "UPDATE comments SET comment = '"+ formData.comments +"' WHERE tagNumber = "+formData.tagNum
        async.parallel([
            function(queryDB) {
                poolTemp.query(query38, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
                        queryDB()
                    }

                })
            },

            ], function(err) {
                if (err){
                    console.log(err)
                }

            })


            var query39 = "UPDATE status SET inDB = " +formData.inDB + ", needsReview =" + formData.needsReview +" WHERE tagNumber = "+formData.tagNum
            async.parallel([
                function(queryDB) {
                    poolTemp.query(query39, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            queryDB()
                        }

                    })
                },

                ], function(err) {
                    if (err){
                        console.log(err)
                    }

                })

            var query40 = "UPDATE sectionreviews SET funderNameApproval = "+
            formData.funderNameApproval + ",funderUrlApproval = " +
            formData.funderUrlApproval + ",funderMotiveApproval = " +
            formData.funderMotiveApproval + ",funderImpactApproval = " +
            formData.funderImpactApproval + ",funderOrganizationFormApproval = " +
            formData.funderOrganizationFormApproval + ",funderInternationalBaseApproval = " +
            formData.funderInternationalBaseApproval + ",funderEdSubsApproval  = " +
            formData.funderEdSubsApproval + ",funderOrgTraitsApproval = " +
            formData.funderOrgTraitsApproval+ ",funderAsiaBasesApproval= " +
            formData.funderAsiaBasesApproval+ ",funderAsiaOperationsApproval= " +
            formData.funderAsiaOperationsApproval+ ",initNameApproval = " +
            formData.initNameApproval + ",initUrlApproval  = " +
            formData.initUrlApproval+ ",initTargetsWomenApproval = " +
            formData.initTargetsWomenApproval+ ",initStartApproval = " +
            formData.initStartApproval+ ",initEndApproval = " +
            formData.initEndApproval+ ",initDescriptionApproval = " +
            formData.initDescriptionApproval+ ",initProgramAreasApproval = " +
            formData.initProgramAreasApproval+ ",initMainProgramActivityApproval = " +
            formData.initMainProgramActivityApproval+ ",initFeeAccessApproval = " +
            formData.initFeeAccessApproval+ ",initRegionsApproval = " +
            formData.initRegionsApproval+ ",initCountriesApproval = " +
            formData.initCountriesApproval+ ",initActivitiesApproval = " +
            formData.initActivitiesApproval + ", initSourceOfFeesApproval = " +
            formData.initSourceOfFeesApproval+ ",initLaunchCountryApproval = " +
            formData.initLaunchCountryApproval+ ",initTargetGeoApproval = " +
            formData.initTargetGeoApproval+ ",initTargetPopulationSectorApproval = " +
            formData.initTargetPopulationSectorApproval+ ",initOutcomesMonitoredApproval = " +
            formData.initOutcomesMonitoredApproval+ ",initMEdSubsApproval = " +
            formData.initMEdSubsApproval+ ",initOEdSubsApproval = " +
            formData.initOEdSubsApproval + ", initManagementTypesApproval = " +
            formData.initManagementTypesApproval+ ",implementorNameApproval = " +
            formData.implementorNameApproval+ ",implementorMotiveApproval = " +
            formData.implementorMotiveApproval


            async.parallel([
                function(queryDB) {
                    poolTemp.query(query40, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            queryDB()
                        }

                    })
                },

                ], function(err) {
                    if (err){
                        console.log(err)
                    }

                })
    res.send("Inves431_girlsEd updated successfully!")

})

//delete form from database
dashboard.post('/delete-funder/:funder', (req,res) =>{
    var funderName = req.params.funder

    //delete funds
    var query1 = "DELETE FROM funds WHERE funderName = '"+ funderName+ "'"
    async.parallel([
        function(queryDB) {
            pool.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder asia bases
    var query2 = "DELETE FROM funderasiabases WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            pool.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder asia operations
    var query3 = "DELETE FROM funderasiaoperations WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            pool.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder education subsector
    var query4 = "DELETE FROM fundereducationsubsectors WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //delete funder international bases
    var query5 = "DELETE FROM funderinternationalbases WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            pool.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    //delete funder organization traits
    var query6 = "DELETE FROM funderorganizationtraits WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder
     var query7 = "DELETE FROM funder WHERE funderName ='" +funderName+"'"
     async.parallel([
         function(queryDB) {
             pool.query(query7, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },
         ], function(err) {
             if (err){
                 console.log(err)
             }

         })

    res.send("Funder deleted successfully!")

})

dashboard.post('/delete-funder-temp/:funder', (req,res)=>{
    var funderName = req.params.funder

    //delete funds
    var query1 = "DELETE FROM funds WHERE funderName = '"+ funderName+ "'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder asia bases
    var query2 = "DELETE FROM funderasiabases WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder asia operations
    var query3 = "DELETE FROM funderasiaoperations WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder education subsector
    var query4 = "DELETE FROM fundereducationsubsectors WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //delete funder international bases
    var query5 = "DELETE FROM funderinternationalbases WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    //delete funder organization traits
    var query6 = "DELETE FROM funderorganizationtraits WHERE funderName ='" +funderName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    //delete funder
     var query7 = "DELETE FROM funder WHERE funderName ='" +funderName+"'"
     async.parallel([
         function(queryDB) {
             poolTemp.query(query7, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },
         ], function(err) {
             if (err){
                 console.log(err)
             }

         })

    res.send("Funder deleted successfully!")
})

//delete implementor from db
dashboard.post('/delete-implementor/:iname', (req,res) =>{
    var implementorName = req.params.iname

    //delete implementor
    var query1 = "DELETE FROM implementor WHERE implementorName ='" +implementorName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

        //delete from implements
        var query2 = "DELETE FROM implements WHERE implementorName ='" +implementorName+"'"
        async.parallel([
            function(queryDB) {
                poolTemp.query(query2, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{

                        queryDB()
                    }

                })
            },
            ], function(err) {
                if (err){
                    console.log(err)
                }

            })

    res.send("Implementor deleted successfully!")
})

//delete implementor from temp db
dashboard.post('/delete-implementor-temp/:iname', (req,res) =>{
    var implementorName = req.params.iname

    //delete implementor
    var query1 = "DELETE FROM implementor WHERE implementorName ='" +implementorName+"'"
    async.parallel([
        function(queryDB) {
            poolTemp.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })

        //delete from implements
        var query2 = "DELETE FROM implements WHERE implementorName ='" +implementorName+"'"
        async.parallel([
            function(queryDB) {
                poolTemp.query(query2, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{

                        queryDB()
                    }

                })
            },
            ], function(err) {
                if (err){
                    console.log(err)
                }

            })

    res.send("Implementor deleted successfully!")
})

//delete intiative from db
dashboard.post('/delete-initiative/:tagNum', (req,res) =>{
    var tagNumber = req.params.tagNum

    //delete funds
    var query1 = "DELETE FROM initiative WHERE tagNumber ="+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    //delete initiative region data
    var query2= "DELETE FROM initiativeregion WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
 //delete initiativecountryofoperation data
    var query3= "DELETE FROM initiativecountryofoperation WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
//delete initiativeprogrammingactivities data
    var query4= "DELETE FROM initiativeprogrammingactivities WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
  //delete initiativefundingsource data
      var query5= "DELETE FROM initiativefundingsource WHERE tagNumber = "+ tagNumber
      async.parallel([
          function(queryDB) {
              pool.query(query5, {}, function(err, results) {
                  if (err){
                      return queryDB(err)
                  }else{

                      queryDB()
                  }

              })
          },

          ], function(err) {
              if (err){
                  console.log(err)
              }

          })
     //delete launchcountry data
     var query6= "DELETE FROM initiativelaunchcountry WHERE tagNumber = "+ tagNumber
     async.parallel([
         function(queryDB) {
             pool.query(query6, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
 //delete initiativetargetgeography data
     var query7= "DELETE FROM initiativetargetgeography WHERE tagNumber = "+ tagNumber
     async.parallel([
         function(queryDB) {
             pool.query(query7, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
 //delete INSERT into initiativetargetpopulationsector data
    var query8= "DELETE FROM initiativetargetpopulationsector WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //delete initiativemonitoredoutcomes data
    var query9= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
//delete initiativemonitoredoutcomes data
     var query10= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ tagNumber
     async.parallel([
         function(queryDB) {
             pool.query(query10, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //delete initiativeeducationsubsectors data
    var query11= "DELETE FROM initiativeeducationsubsectors WHERE initiativeTagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //delete initiativetargetschoolmanagement data
    var query12= "DELETE FROM initiativetargetschoolmanagement WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            pool.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })

    res.send("Initiative deleted successfully!")
})

//delete intiative from temp db
dashboard.post('/delete-initiative-temp/:tagNum', (req,res) =>{
    var tagNumber = req.params.tagNum

    //delete funds
    var query1 = "DELETE FROM initiative WHERE tagNumber ="+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },
        ], function(err) {
            if (err){
                console.log(err)
            }

        })


    //delete initiative region data
    var query2= "DELETE FROM initiativeregion WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
 //delete initiativecountryofoperation data
    var query3= "DELETE FROM initiativecountryofoperation WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
//delete initiativeprogrammingactivities data
    var query4= "DELETE FROM initiativeprogrammingactivities WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
  //delete initiativefundingsource data
      var query5= "DELETE FROM initiativefundingsource WHERE tagNumber = "+ tagNumber
      async.parallel([
          function(queryDB) {
              poolTemp.query(query5, {}, function(err, results) {
                  if (err){
                      return queryDB(err)
                  }else{

                      queryDB()
                  }

              })
          },

          ], function(err) {
              if (err){
                  console.log(err)
              }

          })
     //delete launchcountry data
     var query6= "DELETE FROM initiativelaunchcountry WHERE tagNumber = "+ tagNumber
     async.parallel([
         function(queryDB) {
             poolTemp.query(query6, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
 //delete initiativetargetgeography data
     var query7= "DELETE FROM initiativetargetgeography WHERE tagNumber = "+ tagNumber
     async.parallel([
         function(queryDB) {
             poolTemp.query(query7, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
 //delete INSERT into initiativetargetpopulationsector data
    var query8= "DELETE FROM initiativetargetpopulationsector WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //delete initiativemonitoredoutcomes data
    var query9= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
//delete initiativemonitoredoutcomes data
     var query10= "DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = "+ tagNumber
     async.parallel([
         function(queryDB) {
             poolTemp.query(query10, {}, function(err, results) {
                 if (err){
                     return queryDB(err)
                 }else{

                     queryDB()
                 }

             })
         },

         ], function(err) {
             if (err){
                 console.log(err)
             }

         })
    //delete initiativeeducationsubsectors data
    var query11= "DELETE FROM initiativeeducationsubsectors WHERE initiativeTagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    //delete initiativetargetschoolmanagement data
    var query12= "DELETE FROM initiativetargetschoolmanagement WHERE tagNumber = "+ tagNumber
    async.parallel([
        function(queryDB) {
            poolTemp.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{

                    queryDB()
                }

            })
        },

        ], function(err) {
            if (err){
                console.log(err)
            }

        })
    res.send("Initiative deleted successfully!")
})
module.exports = dashboard
