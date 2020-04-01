// const Sequelize = require("sequelize")
// const invest_ed_db = {}
// const sequelize = new Sequelize("inves431_girlsEd", "root", "PASSWORD66^", {
//     host: 'localhost',
//     dialect: 'mysql',
//     operatorAliases: false,

//     pool: {
//         max: 15,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

// invest_ed_db.sequelize = sequelize 
// invest_ed_db.Sequelize = Sequelize

// //Models/Invest-Ed_db_New
// invest_ed_db.countries = require('../models/Invest-Ed_DB_New/country')(sequelize, Sequelize)

// invest_ed_db.countryWorldBankCodes = require('../models/Invest-Ed_DB_New/countryworldbankcodes')(sequelize, Sequelize)
// invest_ed_db.countryWorldBankCountries = require('../models/Invest-Ed_DB_New/countryworldbankcountries')(sequelize, Sequelize)
// invest_ed_db.countryWorldBankGroups = require('../models/Invest-Ed_DB_New/countryworldbankgroups')(sequelize, Sequelize)

// invest_ed_db.educationSubsector = require('../models/Invest-Ed_DB_New/educationsubsector')(sequelize, Sequelize)

// invest_ed_db.funder = require('../models/Invest-Ed_DB_New/funder')(sequelize, Sequelize)

// invest_ed_db.funderAsiaBases = require('../models/Invest-Ed_DB_New/funderasiabases')(sequelize, Sequelize)
// invest_ed_db.funderAsiaOperations = require('../models/Invest-Ed_DB_New/funderasiaoperations')(sequelize, Sequelize)

// invest_ed_db.funderEducationSubsector = require('../models/Invest-Ed_DB_New/fundereducationsubsectors')(sequelize, Sequelize)
// invest_ed_db.funderInternationalBase = require('../models/Invest-Ed_DB_New/funderinternationalbases')(sequelize, Sequelize)
// invest_ed_db.funderOrganizationTraits = require('../models/Invest-Ed_DB_New/funderorganizationtraits')(sequelize, Sequelize)

// invest_ed_db.funds = require('../models/Invest-Ed_DB_New/funds')(sequelize, Sequelize)

// invest_ed_db.implementor = require('../models/Invest-Ed_DB_New/implementor')(sequelize, Sequelize)
// invest_ed_db.implements = require('../models/Invest-Ed_DB_New/implements')(sequelize, Sequelize)

// invest_ed_db.initiative = require('../models/Invest-Ed_DB_New/initiative')(sequelize, Sequelize)
// invest_ed_db.initiativeCountryOfOperation = require('../models/Invest-Ed_DB_New/initiativecountryofoperation')(sequelize, Sequelize)
// invest_ed_db.initiativeEducationSubsectors = require('../models/Invest-Ed_DB_New/initiativeeducationsubsectors')(sequelize, Sequelize)
// invest_ed_db.initiativeFundingSource = require('../models/Invest-Ed_DB_New/initiativefundingsource')(sequelize, Sequelize)
// invest_ed_db.initiativeLaunchCountry = require('../models/Invest-Ed_DB_New/initiativelaunchcountry')(sequelize, Sequelize)
// invest_ed_db.initiativeMainEducationSubsector = require('../models/Invest-Ed_DB_New/initiativemaineducationsubsector')(sequelize, Sequelize)
// invest_ed_db.initiativeMonitoredOutcomes = require('../models/Invest-Ed_DB_New/initiativemonitoredoutcomes')(sequelize, Sequelize)
// invest_ed_db.initiativeProgrammingActivities = require('../models/Invest-Ed_DB_New/initiativeprogrammingactivities')(sequelize, Sequelize)
// invest_ed_db.initiativeRegion = require('../models/Invest-Ed_DB_New/initiativeregion')(sequelize, Sequelize)
// invest_ed_db.initiativeTargetGeography= require('../models/Invest-Ed_DB_New/initiativetargetgeography')(sequelize, Sequelize)
// invest_ed_db.initiativeTargetPopulationSector = require('../models/Invest-Ed_DB_New/initiativetargetpopulationsector')(sequelize, Sequelize)
// invest_ed_db.initiativeTargetSchoolManagement = require('../models/Invest-Ed_DB_New/initiativetargetschoolmanagement')(sequelize, Sequelize)

// invest_ed_db.organizationalTraits = require('../models/Invest-Ed_DB_New/organizationaltraits')(sequelize, Sequelize)
// invest_ed_db.programArea = require('../models/Invest-Ed_DB_New/programarea')(sequelize, Sequelize)
// invest_ed_db.programmingActivity = require('../models/Invest-Ed_DB_New/programmingactivity')(sequelize, Sequelize)
// invest_ed_db.regions = require('../models/Invest-Ed_DB_New/regions')(sequelize, Sequelize)
// invest_ed_db.targetGeography = require('../models/Invest-Ed_DB_New/regions')(sequelize, Sequelize)
// invest_ed_db.tuitionSource = require('../models/Invest-Ed_DB_New/tuitionsource')(sequelize, Sequelize)


// //Relationships

// //Regions & Country
// invest_ed_db.countries.hasOne(invest_ed_db.regions)
// invest_ed_db.regions.belongsTo(invest_ed_db.countries, {foreignKey: 'includedCountry', targetKey: 'countryName'})

// //Country and World Bank tables
// invest_ed_db.countries.hasOne(invest_ed_db.countryWorldBankCountries)
// invest_ed_db.countryWorldBankCountries.belongsTo(invest_ed_db.countries, {foreignKey: 'countryName', targetKey: 'countryName'})

// invest_ed_db.countries.hasMany(invest_ed_db.countryWorldBankGroups)
// invest_ed_db.countryWorldBankGroups.belongsTo(invest_ed_db.countries, {foreignKey: 'countryName', targetKey: 'countryName'})

// invest_ed_db.countryWorldBankCodes.hasOne(invest_ed_db.countryWorldBankGroups)
// invest_ed_db.countryWorldBankGroups.belongsTo(invest_ed_db.countryWorldBankCodes)

//  //funder Asia Tables 
// invest_ed_db.funder.hasMany(invest_ed_db.funderAsiaBases)
// invest_ed_db.funderAsiaBases.belongsTo(invest_ed_db.funder)

// invest_ed_db.funder.hasMany(invest_ed_db.funderAsiaOperations)
// invest_ed_db.funderAsiaOperations.belongsTo(invest_ed_db.funder)

// //Funder Mutlivalued traits
// invest_ed_db.funder.hasMany(invest_ed_db.funderEducationSubsector)
// invest_ed_db.funderEducationSubsector.belongsTo(invest_ed_db.funder)

// invest_ed_db.funder.hasMany(invest_ed_db.funderInternationalBase)
// invest_ed_db.funderInternationalBase.belongsTo(invest_ed_db.funder)

// invest_ed_db.funder.hasMany(invest_ed_db.funderOrganizationTraits)
// invest_ed_db.funderOrganizationTraits.belongsTo(invest_ed_db.funder)

// //Initiative Country of Operation
// invest_ed_db.countries.hasMany(invest_ed_db.initiativeCountryOfOperation)
// invest_ed_db.initiativeCountryOfOperation.belongsTo(invest_ed_db.countries, {as: 'countryName'})

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeCountryOfOperation)
// invest_ed_db.initiativeCountryOfOperation.belongsTo(invest_ed_db.initiative)

// //Initiative Subsector
// invest_ed_db.educationSubsector.hasMany(invest_ed_db.initiativeEducationSubsectors)
// invest_ed_db.initiativeEducationSubsectors.belongsTo(invest_ed_db.educationSubsector)

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeEducationSubsectors)
// invest_ed_db.initiativeEducationSubsectors.belongsTo(invest_ed_db.initiative)

// //Initiative Funding Source
// invest_ed_db.initiative.hasOne(invest_ed_db.initiativeFundingSource)
// invest_ed_db.initiativeFundingSource.belongsTo(invest_ed_db.initiative)

// //Initiative Launch Country
// invest_ed_db.countries.hasMany(invest_ed_db.initiativeLaunchCountry)
// invest_ed_db.initiativeLaunchCountry.belongsTo(invest_ed_db.countries)

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeLaunchCountry)
// invest_ed_db.initiativeLaunchCountry.belongsTo(invest_ed_db.initiative)

// //Initiative Main Education Subsector
// invest_ed_db.educationSubsector.hasMany(invest_ed_db.initiativeMainEducationSubsector)
// invest_ed_db.initiativeMainEducationSubsector.belongsTo(invest_ed_db.educationSubsector)

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeMainEducationSubsector)
// invest_ed_db.initiativeMainEducationSubsector.belongsTo(invest_ed_db.initiative)

// //Initiative Monitored Outcomes 
// invest_ed_db.initiative.hasOne(invest_ed_db.initiativeMonitoredOutcomes)
// invest_ed_db.initiativeMonitoredOutcomes.belongsTo(invest_ed_db.initiative)

// //Initiative Programming Activities
// invest_ed_db.programmingActivity.hasMany(invest_ed_db.initiativeProgrammingActivities)
// invest_ed_db.initiativeProgrammingActivities.belongsTo(invest_ed_db.programmingActivity)

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeProgrammingActivities)
// invest_ed_db.initiativeProgrammingActivities.belongsTo(invest_ed_db.initiative)

// //Initiative region

// invest_ed_db.regions.hasMany(invest_ed_db.initiativeRegion)
// invest_ed_db.initiativeRegion.belongsTo(invest_ed_db.regions, {as: 'regionName'})

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeRegion)
// invest_ed_db.initiativeRegion.belongsTo(invest_ed_db.initiative)


// //Initiative Target Geography 
// invest_ed_db.targetGeography.hasMany(invest_ed_db.initiativeTargetGeography)
// invest_ed_db.initiativeTargetGeography.belongsTo(invest_ed_db.targetGeography)

// invest_ed_db.initiative.hasMany(invest_ed_db.initiativeTargetGeography)
// invest_ed_db.initiativeTargetGeography.belongsTo(invest_ed_db.initiative)


// //Initiative Target Population Sector
// invest_ed_db.initiative.hasOne(invest_ed_db.initiativeTargetPopulationSector)
// invest_ed_db.initiativeTargetPopulationSector.belongsTo(invest_ed_db.initiative)


// //Initiative Target School Management
// invest_ed_db.initiative.hasOne(invest_ed_db.initiativeTargetSchoolManagement)
// invest_ed_db.initiativeTargetSchoolManagement.belongsTo(invest_ed_db.initiative)

// //Implementor - Implements - Initiatives
// invest_ed_db.implementor.hasMany(invest_ed_db.implements)
// invest_ed_db.implements.belongsTo(invest_ed_db.implementor)

// invest_ed_db.implements.hasMany(invest_ed_db.initiative)
// invest_ed_db.initiative.belongsTo(invest_ed_db.implements)

// //Funder - Funds - Initiative 
// invest_ed_db.funder.hasMany(invest_ed_db.funds)
// invest_ed_db.funds.belongsTo(invest_ed_db.funder)

// invest_ed_db.funds.hasOne(invest_ed_db.funder)
// invest_ed_db.funder.belongsTo(invest_ed_db.funds)

// invest_ed_db.funds.hasOne(invest_ed_db.initiative)
// invest_ed_db.initiative.belongsTo(invest_ed_db.funds)

// invest_ed_db.initiative.hasMany(invest_ed_db.funds)
// invest_ed_db.funds.belongsTo(invest_ed_db.initiative)



// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection to Invest-Ed database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to Invest-Ed database:', err);
//   });

// module.exports = invest_ed_db