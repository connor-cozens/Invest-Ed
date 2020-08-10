const express   = require("express")
const sql       = require("mysql2")
const async     = require('async');
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

const User = require("../models/User")

//GET from from DB
dashboard.get('/form/:tagNum', (req, res) =>{
  if(req.user){
    var tagNum = req.params.tagNum

    //initiative queries
    var query1 = 'SELECT * FROM initiative WHERE tagNumber =' + sql.escape(tagNum)
    var query2 = 'SELECT * FROM initiativeregion WHERE tagNumber =' + sql.escape(tagNum)
    var query3 = 'SELECT * FROM initiativecountryofoperation WHERE tagNumber =' + sql.escape(tagNum)
    var query4 = 'SELECT * FROM initiativeprogrammingactivities WHERE tagNumber =' + sql.escape(tagNum)
    var query5 = 'SELECT * FROM initiativefundingsource WHERE tagNumber =' + sql.escape(tagNum)
    var query6 = 'SELECT * FROM initiativelaunchcountry WHERE tagNumber =' + sql.escape(tagNum)
    var query7 = 'SELECT * FROM initiativetargetgeography WHERE tagNumber =' + sql.escape(tagNum)
    var query8 = 'SELECT * FROM initiativetargetpopulationsector WHERE tagNumber =' + sql.escape(tagNum)
    var query9 = 'SELECT * FROM initiativemonitoredoutcomes WHERE tagNumber =' + sql.escape(tagNum)
    var query10 = 'SELECT * FROM initiativeMainEducationSubsector WHERE tagNumber =' + sql.escape(tagNum)
    var query11 = 'SELECT * FROM initiativeEducationSubsectors WHERE initiativeTagNumber =' + sql.escape(tagNum)
    var query12 = 'SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =' + sql.escape(tagNum)

     //implementor queries
     var query13 = 'SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =' + sql.escape(tagNum)

    //funder queries
    var query14 = 'SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =' + sql.escape(tagNum)


    var formData = {}
    var fundersData = {}
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
            res.json({"error": {"message": err}})
          }else{
            funderQueries(formData.table14)
          }
     })


     function funderQueries(funderData){

        var final = 0
        //nest them here
        funderData.forEach(funder => {
          var query15 = 'SELECT * FROM funderasiabases WHERE funderName =' + sql.escape(funder.funderName)
          var query16 = 'SELECT * FROM funderasiaoperations WHERE funderName =' + sql.escape(funder.funderName)
          var query17 = 'SELECT * FROM fundereducationsubsectors WHERE funderName =' + sql.escape(funder.funderName)
          var query18 = 'SELECT * FROM funderinternationalbases WHERE funderName =' + sql.escape(funder.funderName)
          var query19 = 'SELECT * FROM funderorganizationtraits WHERE funderName =' + sql.escape(funder.funderName)


          async.parallel([
              function(queryDB) {
                  pool.query(query15, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  pool.query(query16, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  pool.query(query17, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  pool.query(query18, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  pool.query(query19, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              }

          ],

          function(err, results) {
              if (err){
                res.json({"error": {"message": err}})
              }else{
                final++;
                //push results here to avoid duplicated parallel writes to funderIndividual array
                funderIndividual.push(results);
                formData.funderIndividual = funderIndividual;

                if(final == funderData.length)
                    res.json(formData);
              }
          })
        })
    }
  } else {
    res.json({"error": {"message": "Error: Not authorized to access this page"}})
  }
})


//GET form from temp DB
dashboard.get('/form-temp/:tagNum', (req, res) =>{
  if(req.user){
    var tagNum = req.params.tagNum
    //initiative queries
    var query1 = 'SELECT * FROM initiative WHERE tagNumber = ' + sql.escape(tagNum)
    var query2 = 'SELECT * FROM initiativeregion WHERE tagNumber =' + sql.escape(tagNum)
    var query3 = 'SELECT * FROM initiativecountryofoperation WHERE tagNumber =' + sql.escape(tagNum)
    var query4 = 'SELECT * FROM initiativeprogrammingactivities WHERE tagNumber =' + sql.escape(tagNum)
    var query5 = 'SELECT * FROM initiativefundingsource WHERE tagNumber =' + sql.escape(tagNum)
    var query6 = 'SELECT * FROM initiativelaunchcountry WHERE tagNumber =' + sql.escape(tagNum)
    var query7 = 'SELECT * FROM initiativetargetgeography WHERE tagNumber =' + sql.escape(tagNum)
    var query8 = 'SELECT * FROM initiativetargetpopulationsector WHERE tagNumber =' + sql.escape(tagNum)
    var query9 = 'SELECT * FROM initiativemonitoredoutcomes WHERE tagNumber =' + sql.escape(tagNum)
    var query10 = 'SELECT * FROM initiativemaineducationsubsector WHERE tagNumber =' + sql.escape(tagNum)
    var query11 = 'SELECT * FROM initiativeeducationsubsectors WHERE initiativeTagNumber =' + sql.escape(tagNum)
    var query12 = 'SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =' + sql.escape(tagNum)

     //implementor queries
     var query13 = 'SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =' + sql.escape(tagNum)

    //funder queries
    var query14 = 'SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =' + sql.escape(tagNum)

    //status & comments queries
    var query15 = 'SELECT * FROM status INNER JOIN comments USING (tagNumber) WHERE tagNumber=' + sql.escape(tagNum)
    var query16 = 'SELECT * FROM sectionReviews WHERE tagNumber=' + sql.escape(tagNum)

    var formData = {}
    var fundersData = {}
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
                } else {
                    User.findOne({
                      where: {
                        id: req.user
                      }
                    }).then(user => {
                      //If current user exists
                      if (user) {
                        //If current user trying to access form is an organization user, prevent edit access unless user made the latest edit to form
                        if (user.accessLevel === 0) {
                          const formEdited = JSON.parse(JSON.stringify(results[0].needsReview))
                          //If form retrieved is currently in pending (non-approved) state
                          if (formEdited === 1) {
                            //If current user has edited any forms
                            if (user.editedForms) {
                              //If current user has any forms currently pending
                              if (user.editedForms.pendingForms.length > 0) {
                                //Search for form in current user's pending list - if not there, then pending form belongs to a different user, so don't allow edit access
                                const myEditedForm = user.editedForms.pendingForms.find(form => { return form.tag == tagNum})
                                if (myEditedForm === undefined) {
                                  return queryDB({"unauthorizedEdit": 'This form has been edited by another user and is pending approval.'})
                                }
                                //Form belongs to current user, so allow user to edit
                                else {
                                  formData.table15 = results;
                                  queryDB()
                                }
                              } else {
                                return queryDB({"unauthorizedEdit": 'This form has been edited by another user and is pending approval.'})
                              }
                            } else {
                              return queryDB({"unauthorizedEdit": 'This form has been edited by another user and is pending approval.'})
                            }
                            //Form is in approved state, so allow any user to have edit access
                          } else {
                            formData.table15 = results;
                            queryDB()
                          }
                        //If current user trying to access form is an RA/root user, allow edit access
                        } else {
                          formData.table15 = results;
                          queryDB()
                        }
                      }
                    })
                    .catch(err => {
                      return queryDB(err)
                    })
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
            res.json({"error": {"message": err}})
          }else{
            funderQueries(formData.table14)
          }
     })


     function funderQueries(funderData){
        var final = 0
        //nest them here
        funderData.forEach(funder => {
          var query15 = 'SELECT * FROM funderasiabases WHERE funderName =' + sql.escape(funder.funderName)
          var query16 = 'SELECT * FROM funderasiaoperations WHERE funderName =' + sql.escape(funder.funderName)
          var query17 = 'SELECT * FROM fundereducationsubsectors WHERE funderName =' + sql.escape(funder.funderName)
          var query18 = 'SELECT * FROM funderinternationalbases WHERE funderName =' + sql.escape(funder.funderName)
          var query19 = 'SELECT * FROM funderorganizationtraits WHERE funderName =' + sql.escape(funder.funderName)

          async.parallel([
              function(queryDB) {
                  poolTemp.query(query15, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  poolTemp.query(query16, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  poolTemp.query(query17, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  poolTemp.query(query18, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }

                  })
              },
              function(queryDB) {
                  poolTemp.query(query19, {}, function(err, results) {
                      if (err){
                          return queryDB(err, null);
                      }else{
                          queryDB(null, results);
                      }
                  })
              }
          ],

          function(err, results) {
              if (err){
                res.json({"error": {"message": err}});
              }else{
                final++;
                //push results here to avoid duplicated parallel writes to funderIndividual array
                funderIndividual.push(results);
                formData.funderIndividual = funderIndividual;

                if(final == funderData.length)
                    res.json(formData);
              }
          })
        })
    }
  } else {
    res.json({"error": {"message": "Error: Not authorized to access this page"}})
  }
})

//POST new form to temp DB
dashboard.post('/submit-form-temp', (req, res) =>{
  if(req.user) {
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

  async.parallel([
    //Insert funder data
    function(queryDB) {
      var query1 = 'INSERT into funder VALUES (' + sql.escape(formData.funderName) + ',' + sql.escape(formData.funderUrl) + ',' + sql.escape(formData.funderMotive) + ',' + sql.escape(formData.funderImpact) + ',' + sql.escape(formData.funderOrganizationForm) + ')'
      poolTemp.query(query1, function(err, results) {
        if (err){
          return queryDB(err, null);
        } else {
          queryDB(null, results);
        }
      })
    },

    //Insert funder international bases data
    function(queryDB) {
      // for(var i = 0; i < formData.funderInternationalBases.length; i++) {
        const inserts = [];
        formData.funderInternationalBases.forEach(function(item) {
          inserts.push([formData.funderName, item])
        })
        var query2 = 'INSERT into funderinternationalbases (funderName, baseLocation) VALUES ?';
        poolTemp.query(query2, [inserts], function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
        })
    },

    //Insert funder education subsector data
    function(queryDB) {
      // for(var i = 0; i <formData.funderEducationSubsector.length; i++) {
      const inserts = [];
      formData.funderEducationSubsector.forEach(function(item) {
        inserts.push([formData.funderName, item])
      })
      var query3 = 'INSERT into fundereducationsubsectors (funderName, educationSubsector) VALUES ?'
      poolTemp.query(query3, [inserts], function(err, results) {
        if (err){
          return queryDB(err, null);
        } else {
          queryDB(null, results);
        }
      })
    },

    //Insert funder education organizational traits data
    function(queryDB) {
      // for(var i = 0; i <formData.funderOrgTraits.length; i++) {
      const inserts = [];
      formData.funderOrgTraits.forEach(function(item) {
        inserts.push([formData.funderName, item])
      })
      var query4 = 'INSERT into funderorganizationtraits (funderName, trait) VALUES ?'
      poolTemp.query(query4, [inserts], function(err, results) {
         if (err){
           return queryDB(err, null)
         } else {
           queryDB(null, results)
         }
      })
    },

    //Insert funder education funder asia bases data
    function(queryDB) {
      // for(var i = 0; i <formData.funderAsiaBases.length; i++) {
       const inserts = [];
       formData.funderAsiaBases.forEach(function(item) {
         inserts.push([formData.funderName, item])
       })
       var query5 = 'INSERT into funderasiabases (funderName, asiaBase) VALUES ?'
       poolTemp.query(query5, [inserts], function(err, results) {
         if (err){
           return queryDB(err, null)
         } else {
           queryDB(null, results)
         }
       })
     },

     //Insert funder education funder asia operations data
     function(queryDB) {
       // for(var i = 0; i < formData.funderAsiaOperations.length; i++) {
      const inserts = [];
      formData.funderAsiaOperations.forEach(function(item) {
        inserts.push([formData.funderName, item])
      })
      var query6 = 'INSERT into funderasiaoperations (funderName, asiaOperatons) VALUES ?'
      poolTemp.query(query6, [inserts], function(err, results) {
        if (err){
          return queryDB(err, null)
        } else {
          queryDB(null, results)
        }
      })
    },

    //Insert initative data
    function(queryDB) {
      client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }
        query7 = 'INSERT into initiative VALUES ('+ sql.escape(val) +','+ sql.escape(formData.initiativeName) + ',' + sql.escape(formData.initiativeURL) + ',' + sql.escape(formData.initiativeTargetsWomen) +
        ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ',' + sql.escape(formData.initiativeDescription) +
        ',(SELECT programArea FROM programarea WHERE programArea =' + sql.escape(formData.initiativeProgramAreas) +
        ' AND activity = ' + sql.escape(formData.initiativeMainProgramActivity) + '), (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = ' + sql.escape(formData.initiativeMainProgramActivity) + '),' + sql.escape(formData.initiativeFeeAccess) + ')'
        poolTemp.query(query7, {}, function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results);
          }
        })
      })
    },

    //Insert initative region
    function(queryDB) {
      client.get('tagNumber', function(err, val){
          if (err) {
            return queryDB(err, null)
          }

          const countryRegions = [];
          for (var i = 0; i < formData.initiativeRegions.length; i++) {
            for (var j = 0; j < formData.initiativeCountries.length; j++) {
              //Add each region and just ONE of its associated countries as object into the countryRegions list
              const regionFound = countryRegions.find(region => region.region == formData.initiativeRegions[i] && region.country == formData.initiativeCountries[j]);
              if (regionFound === undefined) {
                countryRegions.push({region: formData.initiativeRegions[i], country: formData.initiativeCountries[j] })
              }
            }
          }

          //Retrieve the region names required to be inserted
          async.map(countryRegions, function(region, queryDB_2) {
              poolTemp.query('SELECT regionName from regions WHERE regionName = ' + sql.escape(region.region) + ' AND includedCountry = ' + sql.escape(region.country), {}, function(err, results) {
                if (err) {
                  return queryDB_2(err, null)
                } else {
                  queryDB_2(null, results)
                }
              })
            }, function(err, results) {
              if (err) {
                return queryDB(err, null)
              } else {
                let res = JSON.parse(JSON.stringify(results));
                const regions = [];
                res.forEach(regionListing => {
                  if (regionListing.length > 0) {
                    regions.push(regionListing[0].regionName);
                  }
                });
                regionsFiltered = [...new Set(regions)];

                const inserts = [];
                regionsFiltered.forEach(function(item) {
                  inserts.push([val, item])
                })
                //Insert filtered out region data
                poolTemp.query('INSERT into initiativeregion (tagNumber, region) VALUES ?', [inserts], function(err, results) {
                  if (err) {
                    return queryDB(err, null)
                  } else {
                    queryDB(null, results)
                  }
                })
              }
          })
      })
    },

    //Insert initiative country of operation data
    function(queryDB) {
      client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }

         // for(var i = 0; i < formData.initiativeCountries.length; i++) {
         const inserts = [];
         formData.initiativeCountries.forEach(function(item) {
           inserts.push([val, item])
         })
         var query9 = 'INSERT into initiativecountryofoperation (tagNumber, country) VALUES ?'
         poolTemp.query(query9, [inserts], function(err, results) {
            if (err){
              return queryDB(err, null)
            } else {
              queryDB(null, results)
            }
         })
      })
    },

   //Insert initiative programming activity data
   function(queryDB) {
     client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }
         const inserts = [];
         formData.initiativeActivities.forEach(function(item) {
           inserts.push([val, item])
         })
         // for(var i = 0; i < formData.initiativeActivities.length; i++) {
         var query10 = 'INSERT into initiativeprogrammingactivities (tagNumber, programmingActivity) VALUES ?'
         poolTemp.query(query10, [inserts], function(err, results) {
            if (err){
              return queryDB(err, null)
            } else {
              queryDB(null, results)
            }
         })
      })
   },

   //NEED TO IMPLEMENT SOURCE OF FEES FIELD ON FRONT-END
   //Insert initiative source of fees data
   // function(queryDB) {
   //   client.get('tagNumber', function(err, val){
   //     if (err) {
   //       return queryDB(err, null)
   //     }
   //     const inserts = [];
   //     formData.initiativeSourceOfFees.forEach(function(item) {
   //       inserts.push([val, item])
   //     })
   //     // for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
   //     var query11= 'INSERT into initiativefundingsource (tagNumber, sourceOfFunding) VALUES ?'
   //     poolTemp.query(query11, [inserts], function(err, results) {
   //        if (err){
   //          return queryDB(err, null)
   //        } else {
   //          queryDB(null, results)
   //        }
   //     })
   //   })
   // },

   //Insert initiative launch country data
   function(queryDB) {
      client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }

         async.map(formData.initiativeLaunchCountry, function(launchCountry, callback) {
           poolTemp.query('SELECT countryName from country WHERE countryName = ?', launchCountry, function (err, results) {
             if (err) {
               return callback(err, null)
             } else {
               callback(null, results)
             }
           })
         }, function (err, results) {
             if (err) {
               return queryDB(err, null)
             } else {
               let res = JSON.parse(JSON.stringify(results));
               //Retrieve individual countries from select query results
               const countries = [];
               res.forEach(country => {
                 countries.push(country[0].countryName);
               });

               //Wrap the individual retrieved countries in an array to be passed into query
               const inserts = [];
               countries.forEach(function(item) {
                 inserts.push([val, item])
               })
               //Insert the retrieved countries
               var query12 = 'INSERT into initiativelaunchcountry (tagNumber, launchCountry) VALUES ?'
               poolTemp.query(query12, [inserts], function(err, results) {
                  if (err){
                    return queryDB(err, null)
                  } else {
                    queryDB(null, results)
                  }
               })
             }
         })
      })
    },

    //Insert initiative target geo data
    function(queryDB) {
      client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }
         const inserts = [];
         formData.initiativeTargetGeo.forEach(function(item) {
           inserts.push([val, item])
         })
         // for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
         var query13 = 'INSERT into initiativetargetgeography (tagNumber, targetGeography) VALUES ?'
         poolTemp.query(query13, [inserts], function(err, results) {
            if (err){
              return queryDB(err, null)
            } else {
              queryDB(null, results)
            }
         })
      })
    },

    //Insert initiative target population sector data
    function(queryDB){
      client.get('tagNumber', function(err, val){
         if(err) {
           return queryDB(err, null)
         }
         const inserts = [];
         formData.initiativetargetPopulationSector.forEach(function(item) {
           inserts.push([val, item])
         })
         // for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
         var query14 = 'INSERT into initiativetargetpopulationsector (tagNumber, targetPopulationSector) VALUES ?'
         poolTemp.query(query14, [inserts], function(err, results) {
            if (err){
              return queryDB(err, null)
            } else {
              queryDB(null, results)
            }
         })
      })
    },

    //Insert initiative outcomes monitored data
    function(queryDB){
      client.get('tagNumber', function(err, val){
         if(err){
           return queryDB(err, null)
         }
         const inserts = [];
         formData.initiativeOutcomesMonitored.forEach(function(item) {
           inserts.push([val, item])
         })
         // for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
         var query15 = 'INSERT into initiativemonitoredoutcomes (tagNumber, monitoredOutcome) VALUES ?'
         poolTemp.query(query15, [inserts], function(err, results) {
            if (err){
              return queryDB(err, null)
            } else {
              queryDB(null, results)
            }
         })
      })
    },

   //Insert initiative main education subsector data
   function(queryDB){
     client.get('tagNumber', function(err, val){
       if (err){
         return queryDB(err, null)
       }

       async.map(formData.initiativeMEdSubs, function(mainEdSub, callback) {
         poolTemp.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', mainEdSub, function (err, results) {
           if (err) {
             return callback(err, null)
           } else {
             callback(null, results)
           }
         })
       }, function (err, results) {
           if (err) {
             return queryDB(err, null)
           } else {
             let res = JSON.parse(JSON.stringify(results));

             //Retrieve individual main education subsectors from select query results
             const mainEdSubs = [];
             res.forEach(mEdSub => {
               mainEdSubs.push(mEdSub[0].educationSubsector);
             });

             //Wrap each individual main education subsector in an array to be passed into query
             const inserts = [];
             mainEdSubs.forEach(function(item) {
               inserts.push([val, item])
             })
             //Insert the retrieved main education subsectors
             var query16 = 'INSERT into initiativemaineducationsubsector (tagNumber, mainEducationSubsector) VALUES ?'
             //   var query16 = 'INSERT into initiativemaineducationsubsector VALUES (' + sql.escape(val) +
             //   ',(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector =' + sql.escape(formData.initiativeMEdSubs[i]) + '))'
             poolTemp.query(query16, [inserts], function(err, results) {
                if (err){
                  return queryDB(err, null)
                } else {
                  queryDB(null, results)
                }
             })
           }
       })
     })
   },

   //Insert initiative education subsector data
   function(queryDB){
     client.get('tagNumber', function(err, val){
       if (err) {
         return queryDB(err, null)
       }

       async.map(formData.initiativeOEdSubs, function(otherEdSub, callback) {
         poolTemp.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', otherEdSub, function (err, results) {
           if (err) {
             return callback(err, null)
           } else {
             callback(null, results)
           }
         })
       }, function (err, results) {
           if (err) {
             return queryDB(err, null)
           } else {
             let res = JSON.parse(JSON.stringify(results));

             //Retrieve individual other education subsectors from select query results
             const otherEdSubs = [];
             res.forEach(oEdSub => {
               otherEdSubs.push(oEdSub[0].educationSubsector);
             });

             //Wrap each individual education subsector in an array to be passed into query
             const inserts = [];
             otherEdSubs.forEach(function(item) {
               inserts.push([val, item])
             })
             //Insert the retrieved education subsectors
             var query17 = 'INSERT into initiativeeducationsubsectors (initiativeTagNumber, educationSubsector) VALUES ?'
             //    var query17 = 'INSERT into initiativeeducationsubsectors VALUES (' + sql.escape(val) +
             //    ',(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector =' + sql.escape(formData.initiativeOEdSubs[i]) + '))'
             poolTemp.query(query17, [inserts], function(err, results) {
                if (err){
                  return queryDB(err, null)
                } else {
                  queryDB(null, results)
                }
             })
           }
       })
     })
   },

   //Insert initiative target management data
   function(queryDB) {
     client.get('tagNumber', function(err, val){
       if (err) {
         return queryDB(err, null)
       }

       const inserts = [];
       formData.initiativeManagementTypes.forEach(function(item) {
         inserts.push([val, item])
       })
       // for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
       var query18 = 'INSERT into initiativetargetschoolmanagement (tagNumber, targetSchoolManagementType) VALUES ?'
       poolTemp.query(query18, [inserts], function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
       })
     })
   },

  //implementor queries
  function(queryDB) {
    var query19 = 'INSERT INTO implementor VALUES (' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.implementorMotive) + ')'
    poolTemp.query(query19, {}, function(err, results) {
      if (err){
        return queryDB(err, null);
      } else {
        queryDB(null, results);
      }
    })
   },

   // funder - funds - relationship
   function(queryDB) {
     client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }

        var query20 = 'INSERT INTO funds VALUES (' + sql.escape(val) + ','
        + sql.escape(formData.funderName) + ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ')'

        poolTemp.query(query20, {}, function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
        })
     })
   },

   //implementor - implements - initiative
   function(queryDB) {
     client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }

        var query21 = 'INSERT INTO implements VALUES (' + sql.escape(val) + ',' +
        sql.escape(formData.implementorName) + ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ')'

        poolTemp.query(query21, {}, function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results);
          }
        })
     })
   },

   function(queryDB) {
     client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }

        var query22 = 'INSERT INTO comments VALUES (' + sql.escape(val) + ',' + sql.escape(formData.comments) + ')'
        poolTemp.query(query22, {}, function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
        });
      })
   },

   function(queryDB) {
     client.get('tagNumber', function(err, val){
       if (err) {
         return queryDB(err, null)
       }

       var query23 = 'INSERT INTO status VALUES ('+ sql.escape(val) + ',' + sql.escape(formData.inDB) + ',' + sql.escape(formData.needsReview) +')'
       poolTemp.query(query23, {}, function(err, results) {
         if (err){
           return queryDB(err, null)
         } else {
           queryDB(null, results);
         }
       })
     })
   },

   function(queryDB) {
     client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }

        var query24 = 'INSERT INTO sectionreviews VALUES (' + sql.escape(val) + ',' +
        sql.escape(formData.funderNameApproval) + ',' +
        sql.escape(formData.funderUrlApproval) + ',' +
        sql.escape(formData.funderMotiveApproval) + ',' +
        sql.escape(formData.funderImpactApproval) + ',' +
        sql.escape(formData.funderOrganizationFormApproval) + ',' +
        sql.escape(formData.funderInternationalBaseApproval) + ',' +
        sql.escape(formData.funderEdSubsApproval) + ',' +
        sql.escape(formData.funderOrgTraitsApproval) + ',' +
        sql.escape(formData.funderAsiaBasesApproval) + ',' +
        sql.escape(formData.funderAsiaOperationsApproval) + ',' +
        sql.escape(formData.initNameApproval) + ',' +
        sql.escape(formData.initUrlApproval) + ',' +
        sql.escape(formData.initTargetsWomenApproval) + ',' +
        sql.escape(formData.initStartApproval) + ',' +
        sql.escape(formData.initEndApproval) + ',' +
        sql.escape(formData.initDescriptionApproval) + ',' +
        sql.escape(formData.initProgramAreasApproval) + ',' +
        sql.escape(formData.initMainProgramActivityApproval) + ',' +
        sql.escape(formData.initFeeAccessApproval) + ',' +
        sql.escape(formData.initRegionsApproval) + ',' +
        sql.escape(formData.initCountriesApproval) + ',' +
        sql.escape(formData.initActivitiesApproval) + ',' +
        sql.escape(formData.initSourceOfFeesApproval) + ',' +
        sql.escape(formData.initLaunchCountryApproval) + ',' +
        sql.escape(formData.initTargetGeoApproval) + ',' +
        sql.escape(formData.initTargetPopulationSectorApproval) + ',' +
        sql.escape(formData.initOutcomesMonitoredApproval) + ',' +
        sql.escape(formData.initMEdSubsApproval) + ',' +
        sql.escape(formData.initOEdSubsApproval) + ',' +
        sql.escape(formData.initManagementTypesApproval) + ',' +
        sql.escape(formData.implementorNameApproval) + ',' +
        sql.escape(formData.implementorMotiveApproval) + ')'

        poolTemp.query(query24, {}, function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
        })
      })
   }
], function(err, results) {
      //Increment tag number on insertion
      client.exists('tagNumber', function(error, reply){
          if (error) {
            res.json({"error": {"message": error}});
          } else {
              client.get('tagNumber', function(getError, val){
                //Increment tag Number
                client.incr('tagNumber')
                if (getError) {
                  res.json({"error": {"message": getError}});
                } else {
                  console.log(val)
                  //If error, return as json with tag number to be processed by front-end
                  if (err){
                    console.log(err);
                    res.json({"error": {"message": err, "tagNum": val}});
                  } else {
                    //Find user to update their list of edited forms
                    User.findOne({
                        where: {
                            id: req.user
                        }
                    }).then(user => {
                      if (!user) {
                        res.json({"error": {"message": "Could not match user to this form"}})
                      }
                     //If user found
                      //If organization user, then deal with form list, since only organization users need to view their list edited forms pending approval
                      if (user.accessLevel === 0) {
                        if (user.editedForms !== undefined) {
                          let values;
                          //If forms have been added already to listing
                          if (user.editedForms) {
                            //Add form tag number to form list and filter duplicates out of list
                            userFormList = JSON.parse(JSON.stringify(user.editedForms.pendingForms))
                            userFormList.push({tag: parseInt(val)})
                            nonDuplicateList = userFormList.filter((form, currIndex) => {
                              return currIndex === userFormList.findIndex(pendingForm => pendingForm.tag === form.tag)
                            })

                            if (nonDuplicateList !== undefined) {
                              const foundAddedForm = nonDuplicateList.find(form => {return form.tag == formData.tagNum})
                              if (foundAddedForm !== undefined) {
                                foundAddedForm.state = 'Not Reviewed'
                              }
                              values = {
                                ...user,
                                editedForms: {
                                  ...user.editedForms,
                                  pendingForms: nonDuplicateList
                                }
                              }
                            }
                            //If no forms have been added to listing yet
                          } else {
                            values = {
                              ...user,
                              editedForms: {
                                ...user.editedForms,
                                pendingForms: [{tag: parseInt(val), state: 'Not Reviewed'}]
                              }
                            }
                          }

                          if (values !== undefined) {
                            //Update user record with updated form list
                            user.update(values)
                            .then(updatedRecord => {
                              //Form successfully added to DB
                              res.json({"tagNum": val})
                            })
                            .catch(err => {
                              console.log(err)
                              res.json({"error": err});
                            })
                          }
                        }
                      } else {
                        //Form successfully added to DB
                        res.json({"tagNum": val})
                      }
                    })
                    .catch(err => {
                      console.log(err)
                      res.json({"error": err});
                    })
                  }
                }
              })
          }
      })
   })
  } else {  //If not authorized
    res.json({"error": {"message": "Error: Action not authorized"}})
  }
})

//POST new form to DB
dashboard.post('/submitform', (req, res) =>{
  if(req.user){
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

   async.parallel([
     //Insert funder data
     function(queryDB) {
       var query1 = 'INSERT into funder VALUES (' + sql.escape(formData.funderName) + ',' + sql.escape(formData.funderUrl) + ',' + sql.escape(formData.funderMotive) + ',' + sql.escape(formData.funderImpact) + ',' + sql.escape(formData.funderOrganizationForm) + ')'
       pool.query(query1, function(err, results) {
         if (err){
           return queryDB(err, null);
         } else {
           queryDB(null, results);
         }
       })
     },

     //Insert funder international bases data
     function(queryDB) {
       // for(var i = 0; i < formData.funderInternationalBases.length; i++) {
         const inserts = [];
         formData.funderInternationalBases.forEach(function(item) {
           inserts.push([formData.funderName, item])
         })
         var query2 = 'INSERT into funderinternationalbases (funderName, baseLocation) VALUES ?';
         pool.query(query2, [inserts], function(err, results) {
           if (err){
             return queryDB(err, null)
           } else {
             queryDB(null, results)
           }
         })
     },

     //Insert funder education subsector data
     function(queryDB) {
       // for(var i = 0; i <formData.funderEducationSubsector.length; i++) {
       const inserts = [];
       formData.funderEducationSubsector.forEach(function(item) {
         inserts.push([formData.funderName, item])
       })
       var query3 = 'INSERT into fundereducationsubsectors (funderName, educationSubsector) VALUES ?'
       pool.query(query3, [inserts], function(err, results) {
         if (err){
           return queryDB(err, null);
         } else {
           queryDB(null, results);
         }
       })
     },

     //Insert funder education organizational traits data
     function(queryDB) {
       // for(var i = 0; i <formData.funderOrgTraits.length; i++) {
       const inserts = [];
       formData.funderOrgTraits.forEach(function(item) {
         inserts.push([formData.funderName, item])
       })
       var query4 = 'INSERT into funderorganizationtraits (funderName, trait) VALUES ?'
       pool.query(query4, [inserts], function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
       })
     },

     //Insert funder education funder asia bases data
     function(queryDB) {
       // for(var i = 0; i <formData.funderAsiaBases.length; i++) {
        const inserts = [];
        formData.funderAsiaBases.forEach(function(item) {
          inserts.push([formData.funderName, item])
        })
        var query5 = 'INSERT into funderasiabases (funderName, asiaBase) VALUES ?'
        pool.query(query5, [inserts], function(err, results) {
          if (err){
            return queryDB(err, null)
          } else {
            queryDB(null, results)
          }
        })
      },

      //Insert funder education funder asia operations data
      function(queryDB) {
        // for(var i = 0; i < formData.funderAsiaOperations.length; i++) {
       const inserts = [];
       formData.funderAsiaOperations.forEach(function(item) {
         inserts.push([formData.funderName, item])
       })
       var query6 = 'INSERT into funderasiaoperations (funderName, asiaOperatons) VALUES ?'
       pool.query(query6, [inserts], function(err, results) {
         if (err){
           return queryDB(err, null)
         } else {
           queryDB(null, results)
         }
       })
     },

     //Insert initative data
     function(queryDB) {
       client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }
         query7 = 'INSERT into initiative VALUES ('+ sql.escape(val) +','+ sql.escape(formData.initiativeName) + ',' + sql.escape(formData.initiativeURL) + ',' + sql.escape(formData.initiativeTargetsWomen) +
         ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ',' + sql.escape(formData.initiativeDescription) +
         ',(SELECT programArea FROM programarea WHERE programArea =' + sql.escape(formData.initiativeProgramAreas) +
         ' AND activity = ' + sql.escape(formData.initiativeMainProgramActivity) + '), (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = ' + sql.escape(formData.initiativeMainProgramActivity) + '),' + sql.escape(formData.initiativeFeeAccess) + ')'
         pool.query(query7, {}, function(err, results) {
           if (err){
             return queryDB(err, null)
           } else {
             queryDB(null, results);
           }
         })
       })
     },

     //Insert initative region
     function(queryDB) {
       client.get('tagNumber', function(err, val){
           if (err) {
             return queryDB(err, null)
           }

           const countryRegions = [];
           for (var i = 0; i < formData.initiativeRegions.length; i++) {
             for (var j = 0; j < formData.initiativeCountries.length; j++) {
               //Add each region and just ONE of its associated countries as object into the countryRegions list
               const regionFound = countryRegions.find(region => region.region == formData.initiativeRegions[i] && region.country == formData.initiativeCountries[j]);
               if (regionFound === undefined) {
                 countryRegions.push({region: formData.initiativeRegions[i], country: formData.initiativeCountries[j] })
               }
             }
           }

           //Retrieve the region names required to be inserted
           async.map(countryRegions, function(region, queryDB_2) {
               pool.query('SELECT regionName from regions WHERE regionName = ' + sql.escape(region.region) + ' AND includedCountry = ' + sql.escape(region.country), {}, function(err, results) {
                 if (err) {
                   return queryDB_2(err, null)
                 } else {
                   queryDB_2(null, results)
                 }
               })
             }, function(err, results) {
               if (err) {
                 return queryDB(err, null)
               } else {
                 let res = JSON.parse(JSON.stringify(results));
                 const regions = [];
                 res.forEach(regionListing => {
                   if (regionListing.length > 0) {
                     regions.push(regionListing[0].regionName);
                   }
                 });
                 regionsFiltered = [...new Set(regions)];

                 const inserts = [];
                 regionsFiltered.forEach(function(item) {
                   inserts.push([val, item])
                 })
                 //Insert filtered out region data
                 pool.query('INSERT into initiativeregion (tagNumber, region) VALUES ?', [inserts], function(err, results) {
                   if (err) {
                     return queryDB(err, null)
                   } else {
                     queryDB(null, results)
                   }
                 })
               }
           })
       })
     },

     //Insert initiative country of operation data
     function(queryDB) {
       client.get('tagNumber', function(err, val){
          if (err) {
            return queryDB(err, null)
          }

          // for(var i = 0; i < formData.initiativeCountries.length; i++) {
          const inserts = [];
          formData.initiativeCountries.forEach(function(item) {
            inserts.push([val, item])
          })
          var query9 = 'INSERT into initiativecountryofoperation (tagNumber, country) VALUES ?'
          pool.query(query9, [inserts], function(err, results) {
             if (err){
               return queryDB(err, null)
             } else {
               queryDB(null, results)
             }
          })
       })
     },

    //Insert initiative programming activity data
    function(queryDB) {
      client.get('tagNumber', function(err, val){
          if (err) {
            return queryDB(err, null)
          }
          const inserts = [];
          formData.initiativeActivities.forEach(function(item) {
            inserts.push([val, item])
          })
          // for(var i = 0; i < formData.initiativeActivities.length; i++) {
          var query10 = 'INSERT into initiativeprogrammingactivities (tagNumber, programmingActivity) VALUES ?'
          pool.query(query10, [inserts], function(err, results) {
             if (err){
               return queryDB(err, null)
             } else {
               queryDB(null, results)
             }
          })
       })
    },

    //NEED TO IMPLEMENT SOURCE OF FEES FIELD ON FRONT-END
    //Insert initiative source of fees data
    // function(queryDB) {
    //   client.get('tagNumber', function(err, val){
    //     if (err) {
    //       return queryDB(err, null)
    //     }
    //     const inserts = [];
    //     formData.initiativeSourceOfFees.forEach(function(item) {
    //       inserts.push([val, item])
    //     })
    //     // for(var i = 0; i < formData.initiativeSourceOfFees.length; i++) {
    //     var query11= 'INSERT into initiativefundingsource (tagNumber, sourceOfFunding) VALUES ?'
    //     pool.query(query11, [inserts], function(err, results) {
    //        if (err){
    //          return queryDB(err, null)
    //        } else {
    //          queryDB(null, results)
    //        }
    //     })
    //   })
    // },

    //Insert initiative launch country data
    function(queryDB) {
       client.get('tagNumber', function(err, val){
          if (err) {
            return queryDB(err, null)
          }

          async.map(formData.initiativeLaunchCountry, function(launchCountry, callback) {
            pool.query('SELECT countryName from country WHERE countryName = ?', launchCountry, function (err, results) {
              if (err) {
                return callback(err, null)
              } else {
                callback(null, results)
              }
            })
          }, function (err, results) {
              if (err) {
                return queryDB(err, null)
              } else {
                let res = JSON.parse(JSON.stringify(results));
                //Retrieve individual countries from select query results
                const countries = [];
                res.forEach(country => {
                  countries.push(country[0].countryName);
                });

                //Wrap the individual retrieved countries in an array to be passed into query
                const inserts = [];
                countries.forEach(function(item) {
                  inserts.push([val, item])
                })
                //Insert the retrieved countries
                var query12 = 'INSERT into initiativelaunchcountry (tagNumber, launchCountry) VALUES ?'
                pool.query(query12, [inserts], function(err, results) {
                   if (err){
                     return queryDB(err, null)
                   } else {
                     queryDB(null, results)
                   }
                })
              }
          })
       })
     },

     //Insert initiative target geo data
     function(queryDB) {
       client.get('tagNumber', function(err, val){
          if (err) {
            return queryDB(err, null)
          }
          const inserts = [];
          formData.initiativeTargetGeo.forEach(function(item) {
            inserts.push([val, item])
          })
          // for(var i = 0; i < formData.initiativeTargetGeo.length; i++) {
          var query13 = 'INSERT into initiativetargetgeography (tagNumber, targetGeography) VALUES ?'
          pool.query(query13, [inserts], function(err, results) {
             if (err){
               return queryDB(err, null)
             } else {
               queryDB(null, results)
             }
          })
       })
     },

     //Insert initiative target population sector data
     function(queryDB){
       client.get('tagNumber', function(err, val){
          if(err) {
            return queryDB(err, null)
          }
          const inserts = [];
          formData.initiativetargetPopulationSector.forEach(function(item) {
            inserts.push([val, item])
          })
          // for(var i = 0; i < formData.initiativetargetPopulationSector.length; i++) {
          var query14 = 'INSERT into initiativetargetpopulationsector (tagNumber, targetPopulationSector) VALUES ?'
          pool.query(query14, [inserts], function(err, results) {
             if (err){
               return queryDB(err, null)
             } else {
               queryDB(null, results)
             }
          })
       })
     },

     //Insert initiative outcomes monitored data
     function(queryDB){
       client.get('tagNumber', function(err, val){
          if(err){
            return queryDB(err, null)
          }
          const inserts = [];
          formData.initiativeOutcomesMonitored.forEach(function(item) {
            inserts.push([val, item])
          })
          // for(var i = 0; i < formData.initiativeOutcomesMonitored.length; i++) {
          var query15 = 'INSERT into initiativemonitoredoutcomes (tagNumber, monitoredOutcome) VALUES ?'
          pool.query(query15, [inserts], function(err, results) {
             if (err){
               return queryDB(err, null)
             } else {
               queryDB(null, results)
             }
          })
       })
     },

    //Insert initiative main education subsector data
    function(queryDB){
      client.get('tagNumber', function(err, val){
        if (err){
          return queryDB(err, null)
        }

        async.map(formData.initiativeMEdSubs, function(mainEdSub, callback) {
          pool.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', mainEdSub, function (err, results) {
            if (err) {
              return callback(err, null)
            } else {
              callback(null, results)
            }
          })
        }, function (err, results) {
            if (err) {
              return queryDB(err, null)
            } else {
              let res = JSON.parse(JSON.stringify(results));

              //Retrieve individual main education subsectors from select query results
              const mainEdSubs = [];
              res.forEach(mEdSub => {
                mainEdSubs.push(mEdSub[0].educationSubsector);
              });

              //Wrap each individual main education subsector in an array to be passed into query
              const inserts = [];
              mainEdSubs.forEach(function(item) {
                inserts.push([val, item])
              })
              //Insert the retrieved main education subsectors
              var query16 = 'INSERT into initiativemaineducationsubsector (tagNumber, mainEducationSubsector) VALUES ?'
              //   var query16 = 'INSERT into initiativemaineducationsubsector VALUES (' + sql.escape(val) +
              //   ',(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector =' + sql.escape(formData.initiativeMEdSubs[i]) + '))'
              pool.query(query16, [inserts], function(err, results) {
                 if (err){
                   return queryDB(err, null)
                 } else {
                   queryDB(null, results)
                 }
              })
            }
        })
      })
    },

    //Insert initiative education subsector data
    function(queryDB){
      client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }

        async.map(formData.initiativeOEdSubs, function(otherEdSub, callback) {
          pool.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', otherEdSub, function (err, results) {
            if (err) {
              return callback(err, null)
            } else {
              callback(null, results)
            }
          })
        }, function (err, results) {
            if (err) {
              return queryDB(err, null)
            } else {
              let res = JSON.parse(JSON.stringify(results));

              //Retrieve individual other education subsectors from select query results
              const otherEdSubs = [];
              res.forEach(oEdSub => {
                otherEdSubs.push(oEdSub[0].educationSubsector);
              });

              //Wrap each individual education subsector in an array to be passed into query
              const inserts = [];
              otherEdSubs.forEach(function(item) {
                inserts.push([val, item])
              })
              //Insert the retrieved education subsectors
              var query17 = 'INSERT into initiativeeducationsubsectors (initiativeTagNumber, educationSubsector) VALUES ?'
              //    var query17 = 'INSERT into initiativeeducationsubsectors VALUES (' + sql.escape(val) +
              //    ',(SELECT educationSubsector FROM educationsubsector WHERE educationSubsector =' + sql.escape(formData.initiativeOEdSubs[i]) + '))'
              pool.query(query17, [inserts], function(err, results) {
                 if (err){
                   return queryDB(err, null)
                 } else {
                   queryDB(null, results)
                 }
              })
            }
        })
      })
    },

    //Insert initiative target management data
    function(queryDB) {
      client.get('tagNumber', function(err, val){
        if (err) {
          return queryDB(err, null)
        }

        const inserts = [];
        formData.initiativeManagementTypes.forEach(function(item) {
          inserts.push([val, item])
        })
        // for(var i = 0; i < formData.initiativeManagementTypes.length; i++) {
        var query18 = 'INSERT into initiativetargetschoolmanagement (tagNumber, targetSchoolManagementType) VALUES ?'
        pool.query(query18, [inserts], function(err, results) {
           if (err){
             return queryDB(err, null)
           } else {
             queryDB(null, results)
           }
        })
      })
    },

   //implementor queries
   function(queryDB) {
     var query19 = 'INSERT INTO implementor VALUES (' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.implementorMotive) + ')'
     pool.query(query19, {}, function(err, results) {
       if (err){
         return queryDB(err, null);
       } else {
         queryDB(null, results);
       }
     })
    },

    // funder - funds - relationship
    function(queryDB) {
      client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }

         var query20 = 'INSERT INTO funds VALUES (' + sql.escape(val) + ','
         + sql.escape(formData.funderName) + ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ')'

         pool.query(query20, {}, function(err, results) {
           if (err){
             return queryDB(err, null)
           } else {
             queryDB(null, results)
           }
         })
      })
    },

    //implementor - implements - initiative
    function(queryDB) {
      client.get('tagNumber', function(err, val){
         if (err) {
           return queryDB(err, null)
         }

         var query21 = 'INSERT INTO implements VALUES (' + sql.escape(val) + ',' +
         sql.escape(formData.implementorName) + ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ')'

         pool.query(query21, {}, function(err, results) {
           if (err){
             return queryDB(err, null)
           } else {
             queryDB(null, results);
           }
         })
      })
    },
   ], function(err, results) {
         //Increment tag number on insertion
         client.exists('tagNumber', function(error, reply){
             if (error) {
               res.json({"error": {"message": error}});
             } else {
                 client.get('tagNumber', function(getError, val){
                   //Increment tag Number
                   client.incr('tagNumber')
                   if (getError) {
                     res.json({"error": {"message": getError}});
                   } else {
                     console.log(val)
                     //If error, return as json with tag number to be processed by front-end
                     if (err){
                       console.log(err);
                       res.json({"error": {"message": err, "tagNum": val}});
                     } else {
                       //Form successfully added to DB
                       res.json({"tagNum": val})
                     }
                   }
                 })
             }
         })
      })
  } else {  //If not authorized
    res.json({"error": {"message": "Error: Action not authorized"}})
  }
})

dashboard.post('/update-form', (req, res) =>{
  if(req.user){
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

    //Update funder data or insert new funder if funder funds other initiatives - if this is the case, don't want to replace(update) the funder
    var query1;
    var numFunderInitiatives;  //Number of initiatives funded by funder
    var numFunders //Number of funders by specified tag number
    var queryNumFunderInitiatives = 'SELECT COUNT(funderName) FROM funds WHERE funderName = ' + sql.escape(formData.OfunderName)  //Get number of initiatives funded by funder
    var queryNumFunders = 'SELECT COUNT(funderName) FROM funds WHERE tagNum = ' + sql.escape(formData.tagNum)  //Get number of funders specified by tag number

    var numImplementerInitiatives;  //Number of initiatives implemented by implementer

     pool.query(queryNumFunderInitiatives, {}, function(err, results) {
         if (err){
             res.json({"error": {"message": err}})
         } else {
             numFunderInitiatives = JSON.parse(JSON.stringify(results[0]['COUNT(funderName)']));

             //If funder existed in temp already when previously added by an RA, and doesn't exist in main db, insert new funder
             if (numFunderInitiatives == 0) {
               query1 = 'INSERT into funder VALUES (' + sql.escape(formData.funderName) + ',' + sql.escape(formData.funderUrl) + ',' + sql.escape(formData.funderMotive) + ',' + sql.escape(formData.funderImpact) + ',' + sql.escape(formData.funderOrganizationForm) + ')'
             } else { //If original funder funds multiple initiatives, and funder name updated, insert new funder
               if (numFunderInitiatives > 1 && formData.funderName !== formData.OfunderName) {
                 query1 = 'INSERT into funder VALUES (' + sql.escape(formData.funderName) + ',' + sql.escape(formData.funderUrl) + ',' + sql.escape(formData.funderMotive) + ',' + sql.escape(formData.funderImpact) + ',' + sql.escape(formData.funderOrganizationForm) + ')'
               }
               else { //Otherwise, update existing funder
                 query1 = 'UPDATE funder SET funderName = ' + sql.escape(formData.funderName) + ', funderWebsite ='+ sql.escape(formData.funderUrl) +', profitMotive =' + sql.escape(formData.funderMotive) +', impactInvesting ='+ sql.escape(formData.funderImpact)
                +', organizationalForm ='+ sql.escape(formData.funderOrganizationForm) +' WHERE funderName = ' + sql.escape(formData.OfunderName)
              }
             }

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

                function(queryDB) {
                  //Delete and insert if original funder funds only 1 initiative, or if original funder name is the same as updated funder name
                  if (numFunderInitiatives == 1 || formData.funderName == formData.OfunderName) {
                    //delete all funder international base
                    var query2 = 'DELETE FROM funderinternationalbases WHERE funderName = ' + sql.escape(formData.OfunderName)
                    pool.query(query2, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        } else {
                          //Insert funder international bases data
                           const inserts = [];
                           formData.funderInternationalBases.forEach(function(item) {
                             inserts.push([formData.funderName, item])
                           })
                           var query3 = 'INSERT into funderinternationalbases (funderName, baseLocation) VALUES ?'
                           pool.query(query3, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                           })
                        }
                    })
                  } else {
                    //Insert funder international bases data
                    const inserts = [];
                    formData.funderInternationalBases.forEach(function(item) {
                      inserts.push([formData.funderName, item])
                    })
                     var query3 = 'INSERT into funderinternationalbases VALUES ?'
                     pool.query(query3, [inserts], function(err, results) {
                         if (err){
                             return queryDB(err)
                         }else{
                             queryDB()
                         }
                     })
                   }
                },

                function(queryDB) {
                  //Delete and insert if original funder funds only 1 initiative, or if original funder name is the same as updated funder name
                  if (numFunderInitiatives == 1 || formData.funderName == formData.OfunderName) {
                    //delete all funder fundereducationsubsectors
                    var query4 = 'DELETE FROM fundereducationsubsectors WHERE funderName = ' + sql.escape(formData.OfunderName)
                    pool.query(query4, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        } else {
                          //Insert funder education subsector data
                          const inserts = [];
                          formData.funderEducationSubsector.forEach(function(item) {
                            inserts.push([formData.funderName, item])
                          })
                          var query5 = 'INSERT into fundereducationsubsectors (funderName, educationSubsector) VALUES ?'
                          pool.query(query5, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                          })
                       }
                    })
                  } else {
                    //Insert funder education subsector data
                    const inserts = [];
                    formData.funderEducationSubsector.forEach(function(item) {
                      inserts.push([formData.funderName, item])
                    })
                    var query5 = 'INSERT into fundereducationsubsectors (funderName, educationSubsector) VALUES ?'
                    pool.query(query5, [inserts], function(err, results) {
                       if (err){
                           return queryDB(err)
                       }else{
                           queryDB()
                       }
                    })
                  }
                },

                function(queryDB) {
                  //Delete and insert if original funder funds only 1 initiative, or if original funder name is the same as updated funder name
                  if (numFunderInitiatives == 1 || formData.funderName == formData.OfunderName) {
                    //delete all funder funderorganizationtraits
                    var query6 = 'DELETE FROM funderorganizationtraits WHERE funderName = ' + sql.escape(formData.OfunderName)
                    pool.query(query6, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        } else {
                          //Insert funder education organizational traits data
                          const inserts = [];
                          formData.funderOrgTraits.forEach(function(item) {
                            inserts.push([formData.funderName, item])
                          })
                          var query7 = 'INSERT into funderorganizationtraits (funderName, trait) VALUES ?'
                          pool.query(query7, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                          })
                        }
                    })
                  } else {
                    //Insert funder education organizational traits data
                    const inserts = [];
                    formData.funderOrgTraits.forEach(function(item) {
                      inserts.push([formData.funderName, item])
                    })
                    var query7 = 'INSERT into funderorganizationtraits (funderName, trait) VALUES ?'
                    pool.query(query7, [inserts], function(err, results) {
                       if (err){
                           return queryDB(err)
                       }else{
                           queryDB()
                       }
                    })
                  }
                },

                function(queryDB) {
                  //Delete and insert if original funder funds only 1 initiative, or if original funder name is the same as updated funder name
                  if (numFunderInitiatives == 1 || formData.funderName == formData.OfunderName) {
                    //delete all funder asiabases
                    var query8 = 'DELETE FROM funderasiabases WHERE funderName = ' + sql.escape(formData.OfunderName)
                    pool.query(query8, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        } else {
                          //Insert funder asia bases data
                          const inserts = [];
                          formData.funderAsiaBases.forEach(function(item) {
                            inserts.push([formData.funderName, item])
                          })
                          var query9 = 'INSERT into funderasiabases (funderName, asiaBase) VALUES ?'
                          pool.query(query9, [inserts], function(err, results) {
                               if (err) {
                                   return queryDB(err)
                               } else {
                                   queryDB()
                               }
                          })
                        }
                    })
                  } else {
                    //Insert funder asia bases data
                    const inserts = [];
                    formData.funderAsiaBases.forEach(function(item) {
                      inserts.push([formData.funderName, item])
                    })
                    var query9 = 'INSERT into funderasiabases (funderName, asiaBase) VALUES ?'
                    pool.query(query9, [inserts], function(err, results) {
                         if (err){
                             return queryDB(err)
                         }else{
                             queryDB()
                         }
                    })
                  }
                },

                function(queryDB) {
                  //Delete and insert if original funder funds only 1 initiative, or if original funder name is the same as updated funder name
                  if (numFunderInitiatives == 1 || formData.funderName == formData.OfunderName) {
                    //delete all funder asia operations
                    var query10= 'DELETE FROM funderasiaoperations WHERE funderName = ' + sql.escape(formData.OfunderName)
                    pool.query(query10, {}, function(err, results) {
                        if (err){
                            return queryDB(err)
                        } else {
                          //Insert funder asia operations data
                          const inserts = [];
                          formData.funderAsiaOperations.forEach(function(item) {
                            inserts.push([formData.funderName, item])
                          })
                          var query11 = 'INSERT into funderasiaoperations (funderName, asiaOperatons) VALUES ?'
                          pool.query(query11, [inserts], function(err, results) {
                             if (err){
                                 return queryDB(err)
                             } else {
                                 queryDB()
                             }
                          })
                        }
                    })
                  } else {
                    //Insert funder asia operations data
                    const inserts = [];
                    formData.funderAsiaOperations.forEach(function(item) {
                      inserts.push([formData.funderName, item])
                    })
                    var query11 = 'INSERT into funderasiaoperations (funderName, asiaOperatons) VALUES ?'
                    pool.query(query11, [inserts], function(err, results) {
                         if (err){
                             return queryDB(err)
                         }else{
                             queryDB()
                         }
                    })
                  }
                },

                function(queryDB) {
                  var query12;
                  var queryNumInitiatives = 'SELECT COUNT(tagNumber) FROM initiative WHERE tagNumber = ' + sql.escape(formData.tagNum)  //Check if initiative exists in main db
                      pool.query(queryNumInitiatives, {}, function(err, results) {
                          if (err){
                             return queryDB(err)
                          } else {
                            let numInitiatives = JSON.parse(JSON.stringify(results[0]['COUNT(tagNumber)']));
                            //If initiative doesn't exist in main db, insert initiative data. Otherwise, update existing initiative
                            if (numInitiatives > 0) {
                              query12 = 'UPDATE initiative SET initiativeName = '  + sql.escape(formData.initiativeName) + ', initiativeWebsite =' + sql.escape(formData.initiativeURL) + ', targetsWomen = ' + sql.escape(formData.initiativeTargetsWomen) +
                               ', startYear =' + sql.escape(formData.initiativeStart) + ',endYear=' + sql.escape(formData.initiativeEnd) + ', description =' + sql.escape(formData.initiativeDescription) +
                               ', mainProgrammingArea = (SELECT programArea FROM programarea WHERE programArea ='  + sql.escape(formData.initiativeProgramAreas)
                              +  ' AND activity = '  + sql.escape(formData.initiativeMainProgramActivity) +  ') , mainProgrammingActivity = (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = '  + sql.escape(formData.initiativeMainProgramActivity) +  '), feeToAccess = ' + sql.escape(formData.initiativeFeeAccess)
                              +  ' WHERE tagNumber = '   + sql.escape(formData.tagNum)
                            } else {
                              query12 = 'INSERT into initiative VALUES (' + sql.escape(formData.tagNum) +',' + sql.escape(formData.initiativeName) + ',' + sql.escape(formData.initiativeURL) + ',' + sql.escape(formData.initiativeTargetsWomen) +
                               ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ',' + sql.escape(formData.initiativeDescription) +
                               ',(SELECT programArea FROM programarea WHERE programArea ='  +sql.escape(formData.initiativeProgramAreas) +
                               ' AND activity = '  + sql.escape(formData.initiativeMainProgramActivity) +  '), (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = ' + sql.escape(formData.initiativeMainProgramActivity) + '),'  + sql.escape(formData.initiativeFeeAccess) +  ')'
                            }

                            pool.query(query12, {}, function(err, results) {
                                if (err){
                                   return queryDB(err)
                                }else{
                                    queryDB()
                                }
                            })
                          }
                      })
                 },

                 function(queryDB) {
                   //delete initiative region data
                   var query13= 'DELETE FROM initiativeregion WHERE tagNumber = '+ sql.escape(formData.tagNum)
                   pool.query(query13, {}, function(err, results) {
                       if (err){
                           return queryDB(err)
                       } else {
                         const countryRegions = [];
                         for (var i = 0; i < formData.initiativeRegions.length; i++) {
                           for (var j = 0; j < formData.initiativeCountries.length; j++) {
                             const regionFound = countryRegions.find(region => region.region == formData.initiativeRegions[i] && region.country == formData.initiativeCountries[j]);
                             if (regionFound === undefined) {
                               countryRegions.push({region: formData.initiativeRegions[i], country: formData.initiativeCountries[j] })
                             }
                           }
                         }

                         async.map(countryRegions, function(region, callback) {
                             pool.query('SELECT regionName from regions WHERE regionName = ' + sql.escape(region.region) + ' AND includedCountry = ' + sql.escape(region.country), {}, function(err, results) {
                               if (err) {
                                 return callback(err, null)
                               } else {
                                 callback(null, results)
                               }
                             })
                           }, function(err, results) {
                             if (err) {
                               return queryDB(err)
                             } else {
                               let res = JSON.parse(JSON.stringify(results));
                               const regions = [];
                               res.forEach(regionListing => {
                                 if (regionListing.length > 0) {
                                   regions.push(regionListing[0].regionName);
                                 }
                               });
                               regionsFiltered = [...new Set(regions)];

                               const inserts = [];
                               regionsFiltered.forEach(function(item) {
                                 inserts.push([formData.tagNum, item])
                               })
                               //Insert region data
                               pool.query('INSERT into initiativeregion (tagNumber, region) VALUES ?', [inserts], function(err, results) {
                                 if (err) {
                                   return queryDB(err)
                                 } else {
                                   queryDB()
                                 }
                               })
                             }
                         })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiativecountryofoperation data
                 var query15= 'DELETE FROM initiativecountryofoperation WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query15, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative country of operation data
                       async.map(formData.initiativeCountries, function(operationCountry, callback) {
                         pool.query('SELECT countryName from country WHERE countryName = ?', operationCountry, function (err, results) {
                           if (err) {
                             return callback(err, null)
                           } else {
                             callback(null, results)
                           }
                         })
                       }, function (err, results) {
                           if (err) {
                             return queryDB(err, null)
                           } else {
                             let res = JSON.parse(JSON.stringify(results));
                             //Retrieve individual countries from select query results
                             const countries = [];
                             res.forEach(country => {
                               countries.push(country[0].countryName);
                             });

                             //Wrap the individual retrieved countries in an array to be passed into query
                             const inserts = [];
                             countries.forEach(function(item) {
                               inserts.push([formData.tagNum, item])
                             })
                             //Insert countries
                             var query16 = 'INSERT into initiativecountryofoperation (tagNumber, country) VALUES ?'
                             pool.query(query16, [inserts], function(err, results) {
                                if (err){
                                    return queryDB(err)
                                }else{
                                    queryDB()
                                }
                             })
                           }
                        })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiativeprogrammingactivities data
                 var query17= 'DELETE FROM initiativeprogrammingactivities WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query17, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative programming activity data
                       const inserts = [];
                       formData.initiativeActivities.forEach(function(item) {
                         inserts.push([formData.tagNum, item])
                       })
                        var query18 = 'INSERT into initiativeprogrammingactivities (tagNumber, programmingActivity) VALUES ?'
                        pool.query(query18, [inserts], function(err, results) {
                            if (err){
                                return queryDB(err)
                            }else{
                                queryDB()
                            }
                        })
                     }
                 })
               },

               //NEED TO IMPLEMENT SOURCE OF FEES FIELD ON FRONT-END
               // function(queryDB) {
               //   //delete initiativefundingsource data
               //   var query19= 'DELETE FROM initiativefundingsource WHERE tagNumber = '+ sql.escape(formData.tagNum)
               //   pool.query(query19, {}, function(err, results) {
               //       if (err){
               //           return queryDB(err)
               //       } else {
               //         //Insert initiative source of fees data
               //         const inserts = [];
               //         formData.initiativeSourceOfFees.forEach(function(item) {
               //           inserts.push([formData.tagNum, item])
               //         })
               //         var query20 = 'INSERT into initiativefundingsource (tagNumber, sourceOfFunding) VALUES ?'
               //         pool.query(query20, [inserts], function(err, results) {
               //            if (err){
               //                return queryDB(err)
               //            }else{
               //                queryDB()
               //            }
               //         })
               //       }
               //   })
               // },

               function(queryDB) {
                 //delete launchcountry data
                 var query21= 'DELETE FROM initiativelaunchcountry WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query21, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative launch country data
                       async.map(formData.initiativeLaunchCountry, function(launchCountry, callback) {
                         pool.query('SELECT countryName from country WHERE countryName = ?', launchCountry, function (err, results) {
                           if (err) {
                             return callback(err, null)
                           } else {
                             callback(null, results)
                           }
                         })
                       }, function (err, results) {
                           if (err) {
                             return queryDB(err, null)
                           } else {
                             let res = JSON.parse(JSON.stringify(results));
                             //Retrieve individual countries from select query results
                             const countries = [];
                             res.forEach(country => {
                               countries.push(country[0].countryName);
                             });

                             //Wrap the individual retrieved countries in an array to be passed into query
                             const inserts = [];
                             countries.forEach(function(item) {
                               inserts.push([formData.tagNum, item])
                             })
                             //Insert countries
                             var query22 = 'INSERT into initiativelaunchcountry (tagNumber, launchCountry) VALUES ?'
                             pool.query(query22, [inserts], function(err, results) {
                                if (err){
                                    return queryDB(err)
                                }else{
                                    queryDB()
                                }
                             })
                           }
                        })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiativetargetgeography data
                 var query23= 'DELETE FROM initiativetargetgeography WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query23, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative target geo data
                       const inserts = [];
                       formData.initiativeTargetGeo.forEach(function(item) {
                         inserts.push([formData.tagNum, item])
                       })
                       var query24 = 'INSERT into initiativetargetgeography (tagNumber, targetGeography) VALUES ?'
                       pool.query(query24, [inserts], function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                       })
                     }
                 })
               },

               function(queryDB) {
                 //delete INSERT into initiativetargetpopulationsector data
                 var query25= 'DELETE FROM initiativetargetpopulationsector WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query25, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative target population sector data
                       const inserts = [];
                       formData.initiativetargetPopulationSector.forEach(function(item) {
                         inserts.push([formData.tagNum, item])
                       })
                       var query26 = 'INSERT into initiativetargetpopulationsector (tagNumber, targetPopulationSector) VALUES ?'
                       pool.query(query26, [inserts], function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                       })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiativemonitoredoutcomes data
                 var query27= 'DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query27, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative outcomes monitored data
                       const inserts = [];
                       formData.initiativeOutcomesMonitored.forEach(function(item) {
                         inserts.push([formData.tagNum, item])
                       })
                       var query28 = 'INSERT into initiativemonitoredoutcomes (tagNumber, monitoredOutcome) VALUES ?'
                       pool.query(query28, [inserts], function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                       })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiative main education subsector data
                 var query29= 'DELETE FROM initiativemaineducationsubsector WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query29, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative main education subsector data
                       async.map(formData.initiativeMEdSubs, function(mainEdSub, callback) {
                         pool.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', mainEdSub, function (err, results) {
                           if (err) {
                             return callback(err, null)
                           } else {
                             callback(null, results)
                           }
                         })
                       }, function (err, results) {
                           if (err) {
                             return queryDB(err, null)
                           } else {
                             let res = JSON.parse(JSON.stringify(results));

                             //Retrieve individual main education subsectors from select query results
                             const mainEdSubs = [];
                             res.forEach(mEdSub => {
                               mainEdSubs.push(mEdSub[0].educationSubsector);
                             });

                             //Wrap each individual main education subsector in an array to be passed into query
                             const inserts = [];
                             mainEdSubs.forEach(function(item) {
                               inserts.push([formData.tagNum, item])
                             })
                             //Insert the retrieved main education subsectors
                             var query30 = 'INSERT into initiativemaineducationsubsector (tagNumber, mainEducationSubsector) VALUES ?'
                             pool.query(query30, [inserts], function(err, results) {
                                if (err){
                                    return queryDB(err)
                                }else{
                                    queryDB()
                                }
                             })
                           }
                        })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiativeeducationsubsectors data
                 var query31= 'DELETE FROM initiativeeducationsubsectors WHERE initiativeTagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query31, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative education subsector data
                       async.map(formData.initiativeOEdSubs, function(otherEdSub, callback) {
                         pool.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', otherEdSub, function (err, results) {
                           if (err) {
                             return callback(err, null)
                           } else {
                             callback(null, results)
                           }
                         })
                       }, function (err, results) {
                           if (err) {
                             return queryDB(err, null)
                           } else {
                             let res = JSON.parse(JSON.stringify(results));

                             //Retrieve individual education subsectors from select query results
                             const otherEdSubs = [];
                             res.forEach(oEdSub => {
                               otherEdSubs.push(oEdSub[0].educationSubsector);
                             });

                             //Wrap each individual education subsector in an array to be passed into query
                             const inserts = [];
                             otherEdSubs.forEach(function(item) {
                               inserts.push([formData.tagNum, item])
                             })
                             //Insert the retrieved education subsectors
                             var query32 = 'INSERT into initiativeeducationsubsectors (initiativeTagNumber, educationSubsector) VALUES ?'
                             pool.query(query32, [inserts], function(err, results) {
                                if (err){
                                    return queryDB(err)
                                }else{
                                    queryDB()
                                }
                             })
                           }
                        })
                     }
                 })
               },

               function(queryDB) {
                 //delete initiativetargetschoolmanagement data
                 var query33= 'DELETE FROM initiativetargetschoolmanagement WHERE tagNumber = '+ sql.escape(formData.tagNum)
                 pool.query(query33, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       //Insert initiative target management data
                       const inserts = [];
                       formData.initiativeManagementTypes.forEach(function(item) {
                         inserts.push([formData.tagNum, item])
                       })
                       var query34 = 'INSERT into initiativetargetschoolmanagement (tagNumber, targetSchoolManagementType) VALUES ?'
                       pool.query(query34, [inserts], function(err, results) {
                            if (err){
                                return queryDB(err)
                            }else{
                                queryDB()
                            }
                       })
                     }
                 })
               },


               function(queryDB) {
                 //Count number of initiatives this funder funds
                 pool.query(queryNumFunders, {}, function(err, results) {
                     if (err){
                         return queryDB(err)
                     } else {
                       numFunders = JSON.parse(JSON.stringify(results[0]['COUNT(funderName)']));
                       // funder - funds - relationship
                       //If funder already existed in temp but not yet in main
                       var query36;
                       if (numFunderInitiatives == 0) {
                         if (numFunders == 0) {
                           query36 = 'INSERT into funds VALUES (' + sql.escape(formData.tagNum) + ',' + sql.escape(formData.funderName) +  ','  + sql.escape(formData.initiativeStart) +  ','  + sql.escape(formData.initiativeEnd) +  ')'
                         } else {
                           query36 = 'UPDATE funds SET funderName = (SELECT funderName FROM funder WHERE funderName ='
                           + sql.escape(formData.funderName) +  '), startYear = ' + sql.escape(formData.initiativeStart) +  ', endYear ='  + sql.escape(formData.initiativeEnd) + ' WHERE (tagNum ='  + sql.escape(formData.tagNum) + ')'
                         }
                       } else {
                         query36 = 'UPDATE funds SET funderName = (SELECT funderName FROM funder WHERE funderName ='
                         + sql.escape(formData.funderName)+ '), startYear = '+sql.escape(formData.initiativeStart) + ', endYear =' + sql.escape(formData.initiativeEnd) +' WHERE (tagNum =' + sql.escape(formData.tagNum) + ') AND (funderName = '
                         + sql.escape(formData.OfunderName) +')'
                       }

                       pool.query(query36, {}, function(err, results) {
                           if (err){
                               return queryDB(err)
                           }else{
                               queryDB()
                           }
                       })
                     }
                 })
               },

               //Update implementor
               function(queryDB) {
                 var queryNumImplementerInitiatives = 'SELECT COUNT(implementorName) FROM implements WHERE implementorName = ' + sql.escape(formData.OimplementorName) //Get number of initiatives funded by funder

                 pool.query(queryNumImplementerInitiatives, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      numImplementerInitiatives = JSON.parse(JSON.stringify(results[0]['COUNT(implementorName)']));
                      var query41;
                      //If implementer existed in temp already but hasnt been added to main db yet
                      if (numImplementerInitiatives == 0) {
                        query41 = 'INSERT into implementor VALUES (' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.implementorMotive) + ')'
                      } else {
                        if (numImplementerInitiatives > 1 && formData.implementorName !== formData.OimplementorName) {
                          query41 = 'INSERT into implementor VALUES (' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.implementorMotive) + ')'
                        }
                        else {
                          query41 = 'UPDATE implementor SET implementorName =' + sql.escape(formData.implementorName) + ', profitMotive =' + sql.escape(formData.implementorMotive)+' WHERE implementorName = '+ sql.escape(formData.OimplementorName)
                        }
                      }
                       pool.query(query41, {}, function(err, results) {
                           if (err){
                               return queryDB(err)
                           } else {
                             //Update implements
                             var queryNumImplementers = 'SELECT COUNT(implementorName) FROM implements WHERE tagNum = ' + sql.escape(formData.tagNum)
                             var numImplementers;  //Number of implementers with the current tagNum associated to them
                             pool.query(queryNumImplementers, {}, function(err, results) {
                                 if (err){
                                     return queryDB(err)
                                 } else {
                                   numImplementers = JSON.parse(JSON.stringify(results[0]['COUNT(implementorName)']));
                                   //implementor - implements - initiative
                                   //If implementer already existed in temp but not yet in main
                                   var query42;
                                   if (numImplementerInitiatives == 0) {
                                     if (numImplementers == 0) {
                                       query42 = 'INSERT into implements VALUES (' + sql.escape(formData.tagNum) + ',' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ')'
                                     } else {
                                       query42 = 'UPDATE implements SET implementorName = (SELECT implementorName from implementor WHERE implementorName ='+ sql.escape(formData.implementorName) + ') WHERE (tagNum =' + sql.escape(formData.tagNum) + ')'
                                     }
                                   } else {
                                     query42 = 'UPDATE implements SET implementorName = (SELECT implementorName from implementor WHERE implementorName =' + sql.escape(formData.implementorName) + ') WHERE (tagNum =' + sql.escape(formData.tagNum) + ') AND (implementorName = ' + sql.escape(formData.OimplementorName) + ')'
                                   }

                                   pool.query(query42, {}, function(err, results) {
                                       if (err){
                                           return queryDB(err)
                                       }else{
                                           queryDB()
                                       }
                                   })
                                 }
                             })
                           }
                       })
                     }
                   })
               }], function(err) {
                 if (err) {
                   console.log(err)
                   res.json({"error": {"message": err}})
                 } else {
                   //Inves431_girlsEd updated successfully
                   res.json({"tagNum": formData.tagNum})
                 }
             })
         }
     })
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

dashboard.post('/update-form-temp', (req, res) =>{
  if (req.user){
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

   //Update funder data or insert new funder if funder funds other initiatives - if this is the case, don't want to replace(update) the funder
   var query1;
   var numFunderInitiatives;  //Number of initiatives funded by funder
   var numFunders //Number of funders by specified tag number
   var queryNumFunderInitiatives = 'SELECT COUNT(funderName) FROM funds WHERE funderName = ' + sql.escape(formData.OfunderName)  //Get number of initiatives funded by funder
   var queryNumFunders = 'SELECT COUNT(funderName) FROM funds WHERE tagNum = ' + sql.escape(formData.tagNum)  //Get number of funders specified by tag number

   var numImplementerInitiatives;  //Number of initiatives implemented by implementer

    poolTemp.query(queryNumFunderInitiatives, {}, function(err, results) {
        if (err){
            res.json({"error": {"message": err}})
        } else {
            numFunderInitiatives = JSON.parse(JSON.stringify(results[0]['COUNT(funderName)']));

            //If funder existed in main already when previously added by an RA, and doesn't exist in temp db, insert new funder
            if (numFunderInitiatives == 0) {
              query1 = 'INSERT into funder VALUES (' + sql.escape(formData.funderName) + ',' + sql.escape(formData.funderUrl) + ',' + sql.escape(formData.funderMotive) + ',' + sql.escape(formData.funderImpact) + ',' + sql.escape(formData.funderOrganizationForm) + ')'
            } else { //If original funder funds multiple initiatives, and funder name updated, insert new funder
              if (numFunderInitiatives > 1 && formData.funderName !== formData.OfunderName) {
                query1 = 'INSERT into funder VALUES (' + sql.escape(formData.funderName) + ',' + sql.escape(formData.funderUrl) + ',' + sql.escape(formData.funderMotive) + ',' + sql.escape(formData.funderImpact) + ',' + sql.escape(formData.funderOrganizationForm) + ')'
              }
              else { //Otherwise, update existing funder
                query1 = 'UPDATE funder SET funderName = ' + sql.escape(formData.funderName) + ', funderWebsite ='+ sql.escape(formData.funderUrl) +', profitMotive =' + sql.escape(formData.funderMotive) +', impactInvesting ='+ sql.escape(formData.funderImpact)
               +', organizationalForm ='+ sql.escape(formData.funderOrganizationForm) +' WHERE funderName = ' + sql.escape(formData.OfunderName)
             }
            }

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

               function(queryDB) {
                 //Delete and insert if original funder funds 1 or 0 initiatives, or if original funder name is the same as updated funder name
                 if (numFunderInitiatives <= 1 || formData.funderName == formData.OfunderName) {
                   //delete all funder international base
                   var query2 = 'DELETE FROM funderinternationalbases WHERE funderName = ' + sql.escape(formData.OfunderName)
                   poolTemp.query(query2, {}, function(err, results) {
                       if (err){
                           return queryDB(err)
                       } else {
                         //Insert funder international bases data
                          const inserts = [];
                          formData.funderInternationalBases.forEach(function(item) {
                            inserts.push([formData.funderName, item])
                          })
                          var query3 = 'INSERT into funderinternationalbases (funderName, baseLocation) VALUES ?'
                          poolTemp.query(query3, [inserts], function(err, results) {
                              if (err){
                                  return queryDB(err)
                              }else{
                                  queryDB()
                              }
                          })
                       }
                   })
                 } else {
                   //Insert funder international bases data
                   const inserts = [];
                   formData.funderInternationalBases.forEach(function(item) {
                     inserts.push([formData.funderName, item])
                   })
                    var query3 = 'INSERT into funderinternationalbases VALUES ?'
                    poolTemp.query(query3, [inserts], function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            queryDB()
                        }
                    })
                  }
               },

               function(queryDB) {
                 //Delete and insert if original funder funds 1 or 0 initiatives, or if original funder name is the same as updated funder name
                 if (numFunderInitiatives <= 1 || formData.funderName == formData.OfunderName) {
                   //delete all funder fundereducationsubsectors
                   var query4 = 'DELETE FROM fundereducationsubsectors WHERE funderName = ' + sql.escape(formData.OfunderName)
                   poolTemp.query(query4, {}, function(err, results) {
                       if (err){
                           return queryDB(err)
                       } else {
                         //Insert funder education subsector data
                         const inserts = [];
                         formData.funderEducationSubsector.forEach(function(item) {
                           inserts.push([formData.funderName, item])
                         })
                         var query5 = 'INSERT into fundereducationsubsectors (funderName, educationSubsector) VALUES ?'
                         poolTemp.query(query5, [inserts], function(err, results) {
                              if (err){
                                  return queryDB(err)
                              }else{
                                  queryDB()
                              }
                         })
                      }
                   })
                 } else {
                   //Insert funder education subsector data
                   const inserts = [];
                   formData.funderEducationSubsector.forEach(function(item) {
                     inserts.push([formData.funderName, item])
                   })
                   var query5 = 'INSERT into fundereducationsubsectors (funderName, educationSubsector) VALUES ?'
                   poolTemp.query(query5, [inserts], function(err, results) {
                      if (err){
                          return queryDB(err)
                      }else{
                          queryDB()
                      }
                   })
                 }
               },

               function(queryDB) {
                 //Delete and insert if original funder funds 1 or 0 initiatives, or if original funder name is the same as updated funder name
                 if (numFunderInitiatives <= 1 || formData.funderName == formData.OfunderName) {
                   //delete all funder funderorganizationtraits
                   var query6 = 'DELETE FROM funderorganizationtraits WHERE funderName = ' + sql.escape(formData.OfunderName)
                   poolTemp.query(query6, {}, function(err, results) {
                       if (err){
                           return queryDB(err)
                       } else {
                         //Insert funder education organizational traits data
                         const inserts = [];
                         formData.funderOrgTraits.forEach(function(item) {
                           inserts.push([formData.funderName, item])
                         })
                         var query7 = 'INSERT into funderorganizationtraits (funderName, trait) VALUES ?'
                         poolTemp.query(query7, [inserts], function(err, results) {
                              if (err){
                                  return queryDB(err)
                              }else{
                                  queryDB()
                              }
                         })
                       }
                   })
                 } else {
                   //Insert funder education organizational traits data
                   const inserts = [];
                   formData.funderOrgTraits.forEach(function(item) {
                     inserts.push([formData.funderName, item])
                   })
                   var query7 = 'INSERT into funderorganizationtraits (funderName, trait) VALUES ?'
                   poolTemp.query(query7, [inserts], function(err, results) {
                      if (err){
                          return queryDB(err)
                      }else{
                          queryDB()
                      }
                   })
                 }
               },

               function(queryDB) {
                 //Delete and insert if original funder funds 1 or 0 initiatives, or if original funder name is the same as updated funder name
                 if (numFunderInitiatives <= 1 || formData.funderName == formData.OfunderName) {
                   //delete all funder asiabases
                   var query8 = 'DELETE FROM funderasiabases WHERE funderName = ' + sql.escape(formData.OfunderName)
                   poolTemp.query(query8, {}, function(err, results) {
                       if (err){
                           return queryDB(err)
                       } else {
                         //Insert funder asia bases data
                         const inserts = [];
                         formData.funderAsiaBases.forEach(function(item) {
                           inserts.push([formData.funderName, item])
                         })
                         var query9 = 'INSERT into funderasiabases (funderName, asiaBase) VALUES ?'
                         poolTemp.query(query9, [inserts], function(err, results) {
                              if (err) {
                                  return queryDB(err)
                              } else {
                                  queryDB()
                              }
                         })
                       }
                   })
                 } else {
                   //Insert funder asia bases data
                   const inserts = [];
                   formData.funderAsiaBases.forEach(function(item) {
                     inserts.push([formData.funderName, item])
                   })
                   var query9 = 'INSERT into funderasiabases (funderName, asiaBase) VALUES ?'
                   poolTemp.query(query9, [inserts], function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            queryDB()
                        }
                   })
                 }
               },

               function(queryDB) {
                 //Delete and insert if original funder funds 1 or 0 initiatives, or if original funder name is the same as updated funder name
                 if (numFunderInitiatives <= 1 || formData.funderName == formData.OfunderName) {
                   //delete all funder asia operations
                   var query10= 'DELETE FROM funderasiaoperations WHERE funderName = ' + sql.escape(formData.OfunderName)
                   poolTemp.query(query10, {}, function(err, results) {
                       if (err){
                           return queryDB(err)
                       } else {
                         //Insert funder asia operations data
                         const inserts = [];
                         formData.funderAsiaOperations.forEach(function(item) {
                           inserts.push([formData.funderName, item])
                         })
                         var query11 = 'INSERT into funderasiaoperations (funderName, asiaOperatons) VALUES ?'
                         poolTemp.query(query11, [inserts], function(err, results) {
                            if (err){
                                return queryDB(err)
                            } else {
                                queryDB()
                            }
                         })
                       }
                   })
                 } else {
                   //Insert funder asia operations data
                   const inserts = [];
                   formData.funderAsiaOperations.forEach(function(item) {
                     inserts.push([formData.funderName, item])
                   })
                   var query11 = 'INSERT into funderasiaoperations (funderName, asiaOperatons) VALUES ?'
                   poolTemp.query(query11, [inserts], function(err, results) {
                        if (err){
                            return queryDB(err)
                        }else{
                            queryDB()
                        }
                   })
                 }
               },

               function(queryDB) {
                 var query12;
                 var queryNumInitiatives = 'SELECT COUNT(tagNumber) FROM initiative WHERE tagNumber = ' + sql.escape(formData.tagNum)  //Check if initiative exists in main db
                     poolTemp.query(queryNumInitiatives, {}, function(err, results) {
                         if (err){
                            return queryDB(err)
                         } else {
                           let numInitiatives = JSON.parse(JSON.stringify(results[0]['COUNT(tagNumber)']));
                           //If initiative doesn't exist in main db, insert initiative data. Otherwise, update existing initiative
                           if (numInitiatives > 0) {
                             query12 = 'UPDATE initiative SET initiativeName = '  + sql.escape(formData.initiativeName) + ', initiativeWebsite =' + sql.escape(formData.initiativeURL) + ', targetsWomen = ' + sql.escape(formData.initiativeTargetsWomen) +
                              ', startYear =' + sql.escape(formData.initiativeStart) + ',endYear=' + sql.escape(formData.initiativeEnd) + ', description =' + sql.escape(formData.initiativeDescription) +
                              ', mainProgrammingArea = (SELECT programArea FROM programarea WHERE programArea ='  + sql.escape(formData.initiativeProgramAreas)
                             +  ' AND activity = '  + sql.escape(formData.initiativeMainProgramActivity) +  ') , mainProgrammingActivity = (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = '  + sql.escape(formData.initiativeMainProgramActivity) +  '), feeToAccess = ' + sql.escape(formData.initiativeFeeAccess)
                             +  ' WHERE tagNumber = '   + sql.escape(formData.tagNum)
                           } else {
                             query12 = 'INSERT into initiative VALUES (' + sql.escape(formData.tagNum) +',' + sql.escape(formData.initiativeName) + ',' + sql.escape(formData.initiativeURL) + ',' + sql.escape(formData.initiativeTargetsWomen) +
                              ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ',' + sql.escape(formData.initiativeDescription) +
                              ',(SELECT programArea FROM programarea WHERE programArea ='  +sql.escape(formData.initiativeProgramAreas) +
                              ' AND activity = '  + sql.escape(formData.initiativeMainProgramActivity) +  '), (SELECT programmingActivity FROM programmingactivity WHERE programmingActivity = ' + sql.escape(formData.initiativeMainProgramActivity) + '),'  + sql.escape(formData.initiativeFeeAccess) +  ')'
                           }

                           poolTemp.query(query12, {}, function(err, results) {
                               if (err){
                                  return queryDB(err)
                               }else{
                                   queryDB()
                               }
                           })
                         }
                     })
                },

                function(queryDB) {
                  //delete initiative region data
                  var query13= 'DELETE FROM initiativeregion WHERE tagNumber = '+ sql.escape(formData.tagNum)
                  poolTemp.query(query13, {}, function(err, results) {
                      if (err){
                          return queryDB(err)
                      } else {
                        const countryRegions = [];
                        for (var i = 0; i < formData.initiativeRegions.length; i++) {
                          for (var j = 0; j < formData.initiativeCountries.length; j++) {
                            const regionFound = countryRegions.find(region => region.region == formData.initiativeRegions[i] && region.country == formData.initiativeCountries[j]);
                            if (regionFound === undefined) {
                              countryRegions.push({region: formData.initiativeRegions[i], country: formData.initiativeCountries[j] })
                            }
                          }
                        }

                        async.map(countryRegions, function(region, callback) {
                            poolTemp.query('SELECT regionName from regions WHERE regionName = ' + sql.escape(region.region) + ' AND includedCountry = ' + sql.escape(region.country), {}, function(err, results) {
                              if (err) {
                                return callback(err, null)
                              } else {
                                callback(null, results)
                              }
                            })
                          }, function(err, results) {
                            if (err) {
                              return queryDB(err)
                            } else {
                              let res = JSON.parse(JSON.stringify(results));
                              const regions = [];
                              res.forEach(regionListing => {
                                if (regionListing.length > 0) {
                                  regions.push(regionListing[0].regionName);
                                }
                              });
                              regionsFiltered = [...new Set(regions)];

                              const inserts = [];
                              regionsFiltered.forEach(function(item) {
                                inserts.push([formData.tagNum, item])
                              })
                              //Insert region data
                              poolTemp.query('INSERT into initiativeregion (tagNumber, region) VALUES ?', [inserts], function(err, results) {
                                if (err) {
                                  return queryDB(err)
                                } else {
                                  queryDB()
                                }
                              })
                            }
                        })
                    }
                })
              },

              function(queryDB) {
                //delete initiativecountryofoperation data
                var query15= 'DELETE FROM initiativecountryofoperation WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query15, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative country of operation data
                      async.map(formData.initiativeCountries, function(operationCountry, callback) {
                        poolTemp.query('SELECT countryName from country WHERE countryName = ?', operationCountry, function (err, results) {
                          if (err) {
                            return callback(err, null)
                          } else {
                            callback(null, results)
                          }
                        })
                      }, function (err, results) {
                          if (err) {
                            return queryDB(err, null)
                          } else {
                            let res = JSON.parse(JSON.stringify(results));
                            //Retrieve individual countries from select query results
                            const countries = [];
                            res.forEach(country => {
                              countries.push(country[0].countryName);
                            });

                            //Wrap the individual retrieved countries in an array to be passed into query
                            const inserts = [];
                            countries.forEach(function(item) {
                              inserts.push([formData.tagNum, item])
                            })
                            //Insert countries
                            var query16 = 'INSERT into initiativecountryofoperation (tagNumber, country) VALUES ?'
                            poolTemp.query(query16, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                            })
                          }
                       })
                    }
                })
              },

              function(queryDB) {
                //delete initiativeprogrammingactivities data
                var query17= 'DELETE FROM initiativeprogrammingactivities WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query17, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative programming activity data
                      const inserts = [];
                      formData.initiativeActivities.forEach(function(item) {
                        inserts.push([formData.tagNum, item])
                      })
                       var query18 = 'INSERT into initiativeprogrammingactivities (tagNumber, programmingActivity) VALUES ?'
                       poolTemp.query(query18, [inserts], function(err, results) {
                           if (err){
                               return queryDB(err)
                           }else{
                               queryDB()
                           }
                       })
                    }
                })
              },

              //NEED TO IMPLEMENT SOURCE OF FEES FIELD ON FRONT-END
              // function(queryDB) {
              //   //delete initiativefundingsource data
              //   var query19= 'DELETE FROM initiativefundingsource WHERE tagNumber = '+ sql.escape(formData.tagNum)
              //   poolTemp.query(query19, {}, function(err, results) {
              //       if (err){
              //           return queryDB(err)
              //       } else {
              //         //Insert initiative source of fees data
              //         const inserts = [];
              //         formData.initiativeSourceOfFees.forEach(function(item) {
              //           inserts.push([formData.tagNum, item])
              //         })
              //         var query20 = 'INSERT into initiativefundingsource (tagNumber, sourceOfFunding) VALUES ?'
              //         poolTemp.query(query20, [inserts], function(err, results) {
              //            if (err){
              //                return queryDB(err)
              //            }else{
              //                queryDB()
              //            }
              //         })
              //       }
              //   })
              // },

              function(queryDB) {
                //delete launchcountry data
                var query21= 'DELETE FROM initiativelaunchcountry WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query21, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative launch country data
                      async.map(formData.initiativeLaunchCountry, function(launchCountry, callback) {
                        poolTemp.query('SELECT countryName from country WHERE countryName = ?', launchCountry, function (err, results) {
                          if (err) {
                            return callback(err, null)
                          } else {
                            callback(null, results)
                          }
                        })
                      }, function (err, results) {
                          if (err) {
                            return queryDB(err, null)
                          } else {
                            let res = JSON.parse(JSON.stringify(results));
                            //Retrieve individual countries from select query results
                            const countries = [];
                            res.forEach(country => {
                              countries.push(country[0].countryName);
                            });

                            //Wrap the individual retrieved countries in an array to be passed into query
                            const inserts = [];
                            countries.forEach(function(item) {
                              inserts.push([formData.tagNum, item])
                            })
                            //Insert countries
                            var query22 = 'INSERT into initiativelaunchcountry (tagNumber, launchCountry) VALUES ?'
                            poolTemp.query(query22, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                            })
                          }
                       })
                    }
                })
              },

              function(queryDB) {
                //delete initiativetargetgeography data
                var query23= 'DELETE FROM initiativetargetgeography WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query23, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative target geo data
                      const inserts = [];
                      formData.initiativeTargetGeo.forEach(function(item) {
                        inserts.push([formData.tagNum, item])
                      })
                      var query24 = 'INSERT into initiativetargetgeography (tagNumber, targetGeography) VALUES ?'
                      poolTemp.query(query24, [inserts], function(err, results) {
                         if (err){
                             return queryDB(err)
                         }else{
                             queryDB()
                         }
                      })
                    }
                })
              },

              function(queryDB) {
                //delete INSERT into initiativetargetpopulationsector data
                var query25= 'DELETE FROM initiativetargetpopulationsector WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query25, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      ///Insert initiative target population sector data
                      const inserts = [];
                      formData.initiativetargetPopulationSector.forEach(function(item) {
                        inserts.push([formData.tagNum, item])
                      })
                      var query26 = 'INSERT into initiativetargetpopulationsector (tagNumber, targetPopulationSector) VALUES ?'
                      poolTemp.query(query26, [inserts], function(err, results) {
                         if (err){
                             return queryDB(err)
                         }else{
                             queryDB()
                         }
                      })
                    }
                })
              },

              function(queryDB) {
                //delete initiativemonitoredoutcomes data
                var query27= 'DELETE FROM initiativemonitoredoutcomes WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query27, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative outcomes monitored data
                      const inserts = [];
                      formData.initiativeOutcomesMonitored.forEach(function(item) {
                        inserts.push([formData.tagNum, item])
                      })
                      var query28 = 'INSERT into initiativemonitoredoutcomes (tagNumber, monitoredOutcome) VALUES ?'
                      poolTemp.query(query28, [inserts], function(err, results) {
                         if (err){
                             return queryDB(err)
                         }else{
                             queryDB()
                         }
                      })
                    }
                })
              },

              function(queryDB) {
                //delete initiative main education subsector data
                var query29= 'DELETE FROM initiativemaineducationsubsector WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query29, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative main education subsector data
                      async.map(formData.initiativeMEdSubs, function(mainEdSub, callback) {
                        poolTemp.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', mainEdSub, function (err, results) {
                          if (err) {
                            return callback(err, null)
                          } else {
                            callback(null, results)
                          }
                        })
                      }, function (err, results) {
                          if (err) {
                            return queryDB(err, null)
                          } else {
                            let res = JSON.parse(JSON.stringify(results));

                            //Retrieve individual main education subsectors from select query results
                            const mainEdSubs = [];
                            res.forEach(mEdSub => {
                              mainEdSubs.push(mEdSub[0].educationSubsector);
                            });

                            //Wrap each individual main education subsector in an array to be passed into query
                            const inserts = [];
                            mainEdSubs.forEach(function(item) {
                              inserts.push([formData.tagNum, item])
                            })
                            //Insert the retrieved main education subsectors
                            var query30 = 'INSERT into initiativemaineducationsubsector (tagNumber, mainEducationSubsector) VALUES ?'
                            poolTemp.query(query30, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                            })
                          }
                       })
                    }
                })
              },

              function(queryDB) {
                //delete initiativeeducationsubsectors data
                var query31= 'DELETE FROM initiativeeducationsubsectors WHERE initiativeTagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query31, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative education subsector data
                      async.map(formData.initiativeOEdSubs, function(otherEdSub, callback) {
                        poolTemp.query('SELECT educationSubsector FROM educationsubsector WHERE educationSubsector = ?', otherEdSub, function (err, results) {
                          if (err) {
                            return callback(err, null)
                          } else {
                            callback(null, results)
                          }
                        })
                      }, function (err, results) {
                          if (err) {
                            return queryDB(err, null)
                          } else {
                            let res = JSON.parse(JSON.stringify(results));

                            //Retrieve individual education subsectors from select query results
                            const otherEdSubs = [];
                            res.forEach(oEdSub => {
                              otherEdSubs.push(oEdSub[0].educationSubsector);
                            });

                            //Wrap each individual education subsector in an array to be passed into query
                            const inserts = [];
                            otherEdSubs.forEach(function(item) {
                              inserts.push([formData.tagNum, item])
                            })
                            //Insert the retrieved education subsectors
                            var query32 = 'INSERT into initiativeeducationsubsectors (initiativeTagNumber, educationSubsector) VALUES ?'
                            poolTemp.query(query32, [inserts], function(err, results) {
                               if (err){
                                   return queryDB(err)
                               }else{
                                   queryDB()
                               }
                            })
                          }
                       })
                    }
                })
              },

              function(queryDB) {
                //delete initiativetargetschoolmanagement data
                var query33= 'DELETE FROM initiativetargetschoolmanagement WHERE tagNumber = '+ sql.escape(formData.tagNum)
                poolTemp.query(query33, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      //Insert initiative target management data
                      const inserts = [];
                      formData.initiativeManagementTypes.forEach(function(item) {
                        inserts.push([formData.tagNum, item])
                      })
                      var query34 = 'INSERT into initiativetargetschoolmanagement (tagNumber, targetSchoolManagementType) VALUES ?'
                      poolTemp.query(query34, [inserts], function(err, results) {
                           if (err){
                               return queryDB(err)
                           }else{
                               queryDB()
                           }
                      })
                    }
                })
              },

              function(queryDB) {
                //Count number of initiatives this funder funds
                poolTemp.query(queryNumFunders, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    } else {
                      numFunders = JSON.parse(JSON.stringify(results[0]['COUNT(funderName)']));
                      // funder - funds - relationship
                      //If funder already existed in main but not yet in temp
                      var query36;
                      if (numFunderInitiatives == 0) {
                        if (numFunders == 0) {
                          query36 = 'INSERT into funds VALUES (' + sql.escape(formData.tagNum) + ',' + sql.escape(formData.funderName) +  ','  + sql.escape(formData.initiativeStart) +  ','  + sql.escape(formData.initiativeEnd) +  ')'
                        } else {
                          query36 = 'UPDATE funds SET funderName = (SELECT funderName FROM funder WHERE funderName ='
                          + sql.escape(formData.funderName) +  '), startYear = ' + sql.escape(formData.initiativeStart) +  ', endYear ='  + sql.escape(formData.initiativeEnd) + ' WHERE (tagNum ='  + sql.escape(formData.tagNum) + ')'
                        }
                      } else {
                        query36 = 'UPDATE funds SET funderName = (SELECT funderName FROM funder WHERE funderName ='
                        + sql.escape(formData.funderName)+ '), startYear = '+sql.escape(formData.initiativeStart) + ', endYear =' + sql.escape(formData.initiativeEnd) +' WHERE (tagNum =' + sql.escape(formData.tagNum) + ') AND (funderName = '
                        + sql.escape(formData.OfunderName) +')'
                      }

                      poolTemp.query(query36, {}, function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                      })
                    }
                })
              },

              //comments
              function(queryDB) {
                var queryNumComments = 'SELECT COUNT(tagNumber) FROM comments WHERE tagNumber = ' + sql.escape(formData.tagNum) //Check if comments exist in temp db for this form
                poolTemp.query(queryNumComments, {}, function(err, results) {
                    if (err){
                      return queryDB(err)
                    } else {
                      let numComments = JSON.parse(JSON.stringify(results[0]['COUNT(tagNumber)']));
                      var query38;
                      //If comments row for this form doesn't exist in temp db, then insert comments. Otherwise, update comments
                      if (numComments > 0) {
                        query38 = 'UPDATE comments SET comment = ' + sql.escape(formData.comments) + ' WHERE tagNumber = '+ sql.escape(formData.tagNum)
                      } else {
                        query38 = 'INSERT INTO comments VALUES (' + sql.escape(formData.tagNum) + ',' + sql.escape(formData.comments) + ')'
                      }

                      poolTemp.query(query38, {}, function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                      })
                    }
                })
              },

              //status
              function(queryDB) {
                var queryNumStatus = 'SELECT COUNT(tagNumber) FROM status WHERE tagNumber = ' + sql.escape(formData.tagNum) //Check if status exist in temp db for this form
                poolTemp.query(queryNumStatus, {}, function(err, results) {
                    if (err){
                      return queryDB(err)
                    } else {
                      let numStatus = JSON.parse(JSON.stringify(results[0]['COUNT(tagNumber)']));
                      var query39;
                      //If comments row for this form doesn't exist in temp db, then insert comments. Otherwise, update comments
                      if (numStatus > 0) {
                        query39 = 'UPDATE status SET inDB = ' +sql.escape(formData.inDB) + ', needsReview =' + sql.escape(formData.needsReview) + ' WHERE tagNumber = '+sql.escape(formData.tagNum)
                      } else {
                        query39 = 'INSERT INTO status VALUES ('+ sql.escape(formData.tagNum) + ','+ sql.escape(formData.inDB) + ',' + sql.escape(formData.needsReview) + ')'
                      }

                      poolTemp.query(query39, {}, function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                      })
                    }
                })
              },

              //section reviews
              function(queryDB) {
                var queryNumReviews = 'SELECT COUNT(tagNumber) FROM sectionreviews WHERE tagNumber = ' + sql.escape(formData.tagNum) //Check if section reviews exist in temp db for this form
                poolTemp.query(queryNumReviews, {}, function(err, results) {
                    if (err){
                      return queryDB(err)
                    } else {
                      let numReviews = JSON.parse(JSON.stringify(results[0]['COUNT(tagNumber)']));
                      var query40;
                      //If comments row for this form doesn't exist in temp db, then insert comments. Otherwise, update comments
                      if (numReviews > 0) {
                        query40 = 'UPDATE sectionreviews SET funderNameApproval = '+
                        sql.escape(formData.funderNameApproval) + ',funderUrlApproval = ' +
                        sql.escape(formData.funderUrlApproval) + ',funderMotiveApproval = ' +
                        sql.escape(formData.funderMotiveApproval) + ',funderImpactApproval = ' +
                        sql.escape(formData.funderImpactApproval) + ',funderOrganizationFormApproval = ' +
                        sql.escape(formData.funderOrganizationFormApproval) + ',funderInternationalBaseApproval = ' +
                        sql.escape(formData.funderInternationalBaseApproval) + ',funderEdSubsApproval  = ' +
                        sql.escape(formData.funderEdSubsApproval) + ',funderOrgTraitsApproval = ' +
                        sql.escape(formData.funderOrgTraitsApproval)+ ',funderAsiaBasesApproval= ' +
                        sql.escape(formData.funderAsiaBasesApproval)+ ',funderAsiaOperationsApproval= ' +
                        sql.escape(formData.funderAsiaOperationsApproval)+ ',initNameApproval = ' +
                        sql.escape(formData.initNameApproval) + ',initUrlApproval  = ' +
                        sql.escape(formData.initUrlApproval)+ ',initTargetsWomenApproval = ' +
                        sql.escape(formData.initTargetsWomenApproval)+ ',initStartApproval = ' +
                        sql.escape(formData.initStartApproval)+ ',initEndApproval = ' +
                        sql.escape(formData.initEndApproval)+ ',initDescriptionApproval = ' +
                        sql.escape(formData.initDescriptionApproval)+ ',initProgramAreasApproval = ' +
                        sql.escape(formData.initProgramAreasApproval)+ ',initMainProgramActivityApproval = ' +
                        sql.escape(formData.initMainProgramActivityApproval)+ ',initFeeAccessApproval = ' +
                        sql.escape(formData.initFeeAccessApproval)+ ',initRegionsApproval = ' +
                        sql.escape(formData.initRegionsApproval)+ ',initCountriesApproval = ' +
                        sql.escape(formData.initCountriesApproval)+ ',initActivitiesApproval = ' +
                        sql.escape(formData.initActivitiesApproval) + ', initSourceOfFeesApproval = ' +
                        sql.escape(formData.initSourceOfFeesApproval)+ ',initLaunchCountryApproval = ' +
                        sql.escape(formData.initLaunchCountryApproval)+ ',initTargetGeoApproval = ' +
                        sql.escape(formData.initTargetGeoApproval)+ ',initTargetPopulationSectorApproval = ' +
                        sql.escape(formData.initTargetPopulationSectorApproval)+ ',initOutcomesMonitoredApproval = ' +
                        sql.escape(formData.initOutcomesMonitoredApproval)+ ',initMEdSubsApproval = ' +
                        sql.escape(formData.initMEdSubsApproval)+ ',initOEdSubsApproval = ' +
                        sql.escape(formData.initOEdSubsApproval) + ', initManagementTypesApproval = ' +
                        sql.escape(formData.initManagementTypesApproval)+ ',implementorNameApproval = ' +
                        sql.escape(formData.implementorNameApproval)+ ',implementorMotiveApproval = ' +
                        sql.escape(formData.implementorMotiveApproval) + ' WHERE tagNumber = '+sql.escape(formData.tagNum)
                      } else {
                        query40 = 'INSERT INTO sectionreviews VALUES ('+ sql.escape(formData.tagNum) + ',' +
                        sql.escape(formData.funderNameApproval) + ',' +
                        sql.escape(formData.funderUrlApproval) + ',' +
                        sql.escape(formData.funderMotiveApproval) + ',' +
                        sql.escape(formData.funderImpactApproval) + ',' +
                        sql.escape(formData.funderOrganizationFormApproval) + ',' +
                        sql.escape(formData.funderInternationalBaseApproval) + ',' +
                        sql.escape(formData.funderEdSubsApproval) + ',' +
                        sql.escape(formData.funderOrgTraitsApproval)+ ',' +
                        sql.escape(formData.funderAsiaBasesApproval)+ ',' +
                        sql.escape(formData.funderAsiaOperationsApproval)+ ',' +
                        sql.escape(formData.initNameApproval) + ',' +
                        sql.escape(formData.initUrlApproval)+ ',' +
                        sql.escape(formData.initTargetsWomenApproval)+ ',' +
                        sql.escape(formData.initStartApproval)+ ',' +
                        sql.escape(formData.initEndApproval)+ ',' +
                        sql.escape(formData.initDescriptionApproval)+ ',' +
                        sql.escape(formData.initProgramAreasApproval)+ ',' +
                        sql.escape(formData.initMainProgramActivityApproval)+ ',' +
                        sql.escape(formData.initFeeAccessApproval)+ ',' +
                        sql.escape(formData.initRegionsApproval)+ ',' +
                        sql.escape(formData.initCountriesApproval)+ ',' +
                        sql.escape(formData.initActivitiesApproval) + ',' +
                        sql.escape(formData.initSourceOfFeesApproval)+ ',' +
                        sql.escape(formData.initLaunchCountryApproval)+ ',' +
                        sql.escape(formData.initTargetGeoApproval)+ ',' +
                        sql.escape(formData.initTargetPopulationSectorApproval)+ ',' +
                        sql.escape(formData.initOutcomesMonitoredApproval)+ ',' +
                        sql.escape(formData.initMEdSubsApproval)+ ',' +
                        sql.escape(formData.initOEdSubsApproval) + ',' +
                        sql.escape(formData.initManagementTypesApproval)+ ',' +
                        sql.escape(formData.implementorNameApproval)+ ',' +
                        sql.escape(formData.implementorMotiveApproval) +')'
                      }

                      poolTemp.query(query40, {}, function(err, results) {
                          if (err){
                              return queryDB(err)
                          }else{
                              queryDB()
                          }
                      })
                    }
                })
              },

              //Update implementor
              function(queryDB) {
                var queryNumImplementerInitiatives = 'SELECT COUNT(implementorName) FROM implements WHERE implementorName = ' + sql.escape(formData.OimplementorName) //Get number of initiatives funded by funder

                poolTemp.query(queryNumImplementerInitiatives, {}, function(err, results) {
                   if (err){
                       return queryDB(err)
                   } else {
                     numImplementerInitiatives = JSON.parse(JSON.stringify(results[0]['COUNT(implementorName)']));
                     var query41;
                     //If implementer existed in main already but hasnt been added to temp db yet
                     if (numImplementerInitiatives == 0) {
                       query41 = 'INSERT into implementor VALUES (' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.implementorMotive) + ')'
                     } else {
                       if (numImplementerInitiatives > 1 && formData.implementorName !== formData.OimplementorName) {
                         query41 = 'INSERT into implementor VALUES (' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.implementorMotive) + ')'
                       }
                       else {
                         query41 = 'UPDATE implementor SET implementorName =' + sql.escape(formData.implementorName) + ', profitMotive =' + sql.escape(formData.implementorMotive)+' WHERE implementorName = '+ sql.escape(formData.OimplementorName)
                       }
                     }
                      poolTemp.query(query41, {}, function(err, results) {
                          if (err){
                              return queryDB(err)
                          } else {
                            //Update implements
                            var queryNumImplementers = 'SELECT COUNT(implementorName) FROM implements WHERE tagNum = ' + sql.escape(formData.tagNum)
                            var numImplementers;  //Number of implementers with the current tagNum associated to them
                            poolTemp.query(queryNumImplementers, {}, function(err, results) {
                                if (err){
                                    return queryDB(err)
                                } else {
                                  numImplementers = JSON.parse(JSON.stringify(results[0]['COUNT(implementorName)']));
                                  //implementor - implements - initiative
                                  //If implementer already existed in main but not yet in temp
                                  var query42;
                                  if (numImplementerInitiatives == 0) {
                                    if (numImplementers == 0) {
                                      query42 = 'INSERT into implements VALUES (' + sql.escape(formData.tagNum) + ',' + sql.escape(formData.implementorName) + ',' + sql.escape(formData.initiativeStart) + ',' + sql.escape(formData.initiativeEnd) + ')'
                                    } else {
                                      query42 = 'UPDATE implements SET implementorName = (SELECT implementorName from implementor WHERE implementorName ='+ sql.escape(formData.implementorName) + ') WHERE (tagNum =' + sql.escape(formData.tagNum) + ')'
                                    }
                                  } else {
                                    query42 = 'UPDATE implements SET implementorName = (SELECT implementorName from implementor WHERE implementorName =' + sql.escape(formData.implementorName) + ') WHERE (tagNum =' + sql.escape(formData.tagNum) + ') AND (implementorName = ' + sql.escape(formData.OimplementorName) + ')'
                                  }

                                  poolTemp.query(query42, {}, function(err, results) {
                                      if (err){
                                          return queryDB(err)
                                      }else{
                                          queryDB()
                                      }
                                  })
                                }
                            })
                          }
                      })
                    }
                  })
              }], function(err) {
                if (err) {
                  console.log(err)
                  res.json({"error": {"message": err}})
                } else {
                  let jsonResponse = {};
                  //Find user to update their list of edited forms
                  User.findOne({
                      where: {
                          id: req.user
                      }
                  }).then(user => {
                    if (!user) {
                      jsonResponse = {"error": {"message": "Could not match user to this form"}}
                    }
                   //If user found
                    //If organization user, then deal with form list, since only organization users need to view their list edited forms pending approval
                    if (user.accessLevel === 0) {
                      if (user.editedForms !== undefined) {
                        let values;
                        //If forms have been added already to pending form listing
                        if (user.editedForms) {
                          //Add form tag number to form list and filter duplicates out of list
                          const pendingFormList = JSON.parse(JSON.stringify(user.editedForms.pendingForms))
                          pendingFormList.push({tag: formData.tagNum})
                          const nonDuplicateList = pendingFormList.filter((form, currIndex) => {
                            return currIndex === pendingFormList.findIndex(pendingForm => pendingForm.tag === form.tag)
                          })

                          if (nonDuplicateList !== undefined) {
                            const foundAddedForm = nonDuplicateList.find(form => {return form.tag == formData.tagNum})
                            if (foundAddedForm !== undefined) {
                              foundAddedForm.state = 'Not Reviewed'
                            }

                            if (user.dataValues.editedForms.approvedForms !== undefined) {
                              //Create new approved list with removed form
                              const removedTagNumList = user.dataValues.editedForms.approvedForms.filter(form => {return form.tag !== formData.tagNum})
                              values = {
                                ...user,
                                editedForms: {
                                  approvedForms: removedTagNumList,
                                  pendingForms: nonDuplicateList
                                }
                              }
                            } else {
                              values = {
                                ...user,
                                editedForms: {
                                  ...user.editedForms,
                                  pendingForms: nonDuplicateList
                                }
                              }
                            }
                          }
                        //If no forms have been added to pending form listing yet
                        } else {
                          values = {
                            ...user,
                            editedForms: {
                              ...user.editedForms,
                              pendingForms: [{tag: formData.tagNum, state: 'Not Reviewed'}]
                            }
                          }
                        }

                        if (values !== undefined) {
                          //Update user record with updated form list
                          user.update(values)
                          .then(updatedRecord => {
                            //Inves431_girlsEd updated successfully
                            jsonResponse = {"tagNum": formData.tagNum}
                          })
                        }
                      }

                    //If RA/root user
                    } else {
                      //If form is being approved on review by RA/root user, remove form from pending list corresponding to specific user
                      if (formData.needsReview === 0) {
                        User.findAll().then(result => {
                          //Search for user with that pending form
                          result.forEach(user => {
                            if (user.dataValues.editedForms) {
                              const foundTagNum = user.dataValues.editedForms.pendingForms.find(form => {return form.tag == formData.tagNum});
                              if (foundTagNum !== undefined) {
                                //Create new pending list with removed form
                                const removedTagNumList = user.dataValues.editedForms.pendingForms.filter(form => {return form.tag !== formData.tagNum})

                                let userObj;
                                //If approved forms already added to approved form listing
                                if (user.dataValues.editedForms.approvedForms !== undefined) {
                                  //Take form removed from pending list and add to approved form list
                                  const approvedFormList = JSON.parse(JSON.stringify(user.dataValues.editedForms.approvedForms));
                                  approvedFormList.push({tag: formData.tagNum, state: 'Approved'});
                                  userObj = {
                                    ...user,
                                    editedForms: {
                                      pendingForms: removedTagNumList,
                                      approvedForms: approvedFormList
                                    }
                                  }
                                  //If no forms added to approved form listing yet
                                } else {
                                  userObj = {
                                    ...user,
                                    editedForms: {
                                      pendingForms: removedTagNumList,
                                      approvedForms: [{tag: formData.tagNum, state: 'Approved'}]
                                    }
                                  }
                                }

                                //Update user record with updated pending and approved form lists
                                if (userObj !== undefined) {
                                  user.update(userObj)
                                  .then(updatedRecord => {
                                    //Inves431_girlsEd updated successfully
                                    jsonResponse = {"tagNum": formData.tagNum}
                                  })
                                }
                              }
                            }
                          });
                        })
                        .catch(err => {
                          console.log(err)
                          jsonResponse = {"error": err};
                        })
                        .finally(() => {
                          //Inves431_girlsEd updated successfully
                          jsonResponse = {"tagNum": formData.tagNum}
                        })
                      }

                      //If form is not being approved on review by RA/root user
                      else {
                        User.findAll().then(result => {
                          let formFoundPending; //Flag to determine if form is found in pending list and not reviewed yet

                          //First search for user with that form pending approval and not reviewed yet
                          result.forEach(user => {
                            if (user.dataValues.editedForms) {
                              //Find form and set state to rejected
                              const pendingFormList = JSON.parse(JSON.stringify(user.dataValues.editedForms.pendingForms));
                              const foundTagNum = pendingFormList.find(form => {return form.tag == formData.tagNum});
                              if (foundTagNum !== undefined) {
                                foundTagNum.state = 'Rejected'
                                const userObj = {
                                  ...user,
                                  editedForms: {
                                    ...user.editedForms,
                                    pendingForms: pendingFormList
                                  }
                                }

                                //Update user record with updated pending and approved form lists
                                if (userObj !== undefined) {
                                  user.update(userObj)
                                  .then(updatedRecord => {
                                    //Inves431_girlsEd updated successfully
                                    formFoundPending = true
                                    jsonResponse = {"tagNum": formData.tagNum}
                                  })
                                }
                              }
                            }
                          })

                          //If no users have that form pending and not reviewed yet, then search for user with that approved form
                          if (formFoundPending !== undefined) {
                            result.forEach(user => {
                              if (user.dataValues.editedForms) {
                                //If user has had form(s) previously approved
                                if (user.dataValues.editedForms.approvedForms !== undefined) {
                                  const foundTagNum = user.dataValues.editedForms.approvedForms.find(form => {return form.tag == formData.tagNum});
                                  //If form was previously approved
                                  if (foundTagNum !== undefined) {
                                    //Create new approved list with removed form
                                    const removedTagNumList = user.dataValues.editedForms.approvedForms.filter(form => {return form.tag !== formData.tagNum})

                                    //Take form removed from approved list and add to pending form list
                                    const pendingFormList = JSON.parse(JSON.stringify(user.dataValues.editedForms.pendingForms));
                                    pendingFormList.push({tag: formData.tagNum, state: 'Rejected'});
                                    const userObj = {
                                      ...user,
                                      editedForms: {
                                        pendingForms: pendingFormList,
                                        approvedForms: removedTagNumList
                                      }
                                    }

                                    //Update user record with updated pending and approved form lists
                                    if (userObj !== undefined) {
                                      user.update(userObj)
                                      .then(updatedRecord => {
                                        //Inves431_girlsEd updated successfully
                                        jsonResponse = {"tagNum": formData.tagNum}
                                      })
                                    }
                                  }
                                }
                              }
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err)
                          jsonResponse = {"error": err};
                        })
                        .finally(() => {
                          //Inves431_girlsEd updated successfully
                          jsonResponse = {"tagNum": formData.tagNum}
                        })
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err)
                    res.json({"error": err});
                  })
                  .finally(() => {
                    //Inves431_girlsEd updated successfully
                    res.json({"tagNum": formData.tagNum})
                  })
                }
            })
        }
    })
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

//delete form from database
dashboard.post('/delete-funder/:funder', (req,res) =>{
  if(req.user){
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
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

dashboard.post('/delete-funder-temp/:funder', (req,res)=>{
  if(req.user) {
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
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

//delete implementor from db
dashboard.post('/delete-implementor/:iname', (req,res) =>{
  if(req.user){
    var implementorName = req.params.iname

    //delete implementor
    var query1 = "DELETE FROM implementor WHERE implementorName ='" +implementorName+"'"
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

        //delete from implements
        var query2 = "DELETE FROM implements WHERE implementorName ='" +implementorName+"'"
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

    res.send("Implementor deleted successfully!")
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

//delete implementor from temp db
dashboard.post('/delete-implementor-temp/:iname', (req,res) =>{
  if(req.user){
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
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

//delete intiative from db
dashboard.post('/delete-initiative/:tagNum', (req,res) =>{
  if(req.user){
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
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})

//delete intiative from temp db
dashboard.post('/delete-initiative-temp/:tagNum', (req,res) =>{
  if(req.user){
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
  } else {
    res.json({"error": "Error: Action not authorized"})
  }
})
module.exports = dashboard
