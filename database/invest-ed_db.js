const Sequelize = require("sequelize")
const invest_ed_db = {}
const sequelize = new Sequelize("inves431_girlsEd", "root", "password", {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

invest_ed_db.sequelize = sequelize 
invest_ed_db.Sequelize = Sequelize

//Models/Invest-Ed_db
invest_ed_db.countries = require('../models/Invest-Ed_DB/Countries')(sequelize, Sequelize)
invest_ed_db.funder = require('../models/Invest-Ed_DB/Funder')(sequelize, Sequelize)
invest_ed_db.funderEducationSubsector = require('../models/Invest-Ed_DB/FunderEducationSubsector')(sequelize, Sequelize)
invest_ed_db.funderInternationalBase = require('../models/Invest-Ed_DB/FunderInternationalBase')(sequelize, Sequelize)
invest_ed_db.funderOperation = require('../models/Invest-Ed_DB/FunderOperation')(sequelize, Sequelize)
invest_ed_db.funderOrganizationTraits = require('../models/Invest-Ed_DB/FunderOrganizationTraits')(sequelize, Sequelize)
invest_ed_db.funds = require('../models/Invest-Ed_DB/Funds')(sequelize, Sequelize)
invest_ed_db.implementor = require('../models/Invest-Ed_DB/Implementor')(sequelize, Sequelize)
invest_ed_db.implements = require('../models/Invest-Ed_DB/Implements')(sequelize, Sequelize)
invest_ed_db.initiativeSourceOfFees = require('../models/Invest-Ed_DB/InitiaitveSourceOfFees')(sequelize, Sequelize)
invest_ed_db.initiative = require('../models/Invest-Ed_DB/Initiative')(sequelize, Sequelize)
invest_ed_db.initiativeCountry = require('../models/Invest-Ed_DB/InitiativeCountry')(sequelize, Sequelize)
invest_ed_db.initiativeEducationSubsectors = require('../models/Invest-Ed_DB/InitiativeEducationSubsectors')(sequelize, Sequelize)
invest_ed_db.initiativeMainEducationSubsector = require('../models/Invest-Ed_DB/InitiativeMainEducationSubsector')(sequelize, Sequelize)
invest_ed_db.initiativeProgrammingActivities = require('../models/Invest-Ed_DB/InitiativeProgrammingActivities')(sequelize, Sequelize)
invest_ed_db.initiativeRegion = require('../models/Invest-Ed_DB/InitiativeRegion')(sequelize, Sequelize)
invest_ed_db.initiativeTargetFunder = require('../models/Invest-Ed_DB/InitiativeTargetFunder')(sequelize, Sequelize)
invest_ed_db.initiativeTargetGeography= require('../models/Invest-Ed_DB/InitiativeTargetGeography')(sequelize, Sequelize)
invest_ed_db.initiativeTargetSchoolManagement = require('../models/Invest-Ed_DB/InitiativeTargetSchoolManagement')(sequelize, Sequelize)
invest_ed_db.regions = require('../models/Invest-Ed_DB/Regions')(sequelize, Sequelize)

//Relationships

//Regions & Country
invest_ed_db.countries.hasMany(invest_ed_db.regions, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.regions.belongsTo(invest_ed_db.countries)

//International base
invest_ed_db.countries.hasMany(invest_ed_db.funderInternationalBase)
invest_ed_db.funderInternationalBase.belongsTo(invest_ed_db.countries)

//Funder Mutlivalued traits
invest_ed_db.funder.hasMany(invest_ed_db.funderEducationSubsector, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.funderEducationSubsector.belongsTo(invest_ed_db.funder)

invest_ed_db.funder.hasMany(invest_ed_db.funderInternationalBase,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.funderInternationalBase.belongsTo(invest_ed_db.funder)


invest_ed_db.funder.hasMany(invest_ed_db.funderOperation,  {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.funderOperation.belongsTo(invest_ed_db.funder)

invest_ed_db.funder.hasMany(invest_ed_db.funderOrganizationTraits, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.funderOrganizationTraits.belongsTo(invest_ed_db.funder)

//Country 1:M Initiative Country
invest_ed_db.countries.hasMany(invest_ed_db.initiativeCountry, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeCountry.belongsTo(invest_ed_db.countries)

//Initiative Multivalued Traits
invest_ed_db.initiative.hasMany(invest_ed_db.initiativeCountry,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeCountry.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeRegion, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeRegion.belongsTo(invest_ed_db.initiative)

invest_ed_db.regions.hasMany(invest_ed_db.initiativeRegion, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeRegion.belongsTo(invest_ed_db.regions)


invest_ed_db.initiative.hasMany(invest_ed_db.regions)
invest_ed_db.regions.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeSourceOfFees, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeSourceOfFees.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeTargetGeography, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeTargetGeography.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeTargetSchoolManagement, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeTargetSchoolManagement.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeMainEducationSubsector, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeMainEducationSubsector.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeProgrammingActivities, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeProgrammingActivities.belongsTo(invest_ed_db.initiative)

invest_ed_db.initiative.hasMany(invest_ed_db.initiativeEducationSubsectors, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeEducationSubsectors.belongsTo(invest_ed_db.initiative)

//Implementor - Implements - Initiatives
invest_ed_db.implementor.hasMany(invest_ed_db.implements, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.implements.belongsTo(invest_ed_db.implementor)

invest_ed_db.implements.hasMany(invest_ed_db.initiative, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiative.belongsTo(invest_ed_db.implements)

// Funder - is Target Funder - Initiative
invest_ed_db.funder.hasMany(invest_ed_db.initiativeTargetFunder, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiativeTargetFunder.belongsTo(invest_ed_db.funder)

invest_ed_db.initiativeTargetFunder.hasMany(invest_ed_db.initiative)
invest_ed_db.initiative.belongsTo(invest_ed_db.initiativeTargetFunder)

invest_ed_db.initiativeTargetFunder.hasOne(invest_ed_db.funder)
invest_ed_db.funder.belongsTo(invest_ed_db.initiativeTargetFunder)

invest_ed_db.initiative.hasOne(invest_ed_db.initiativeTargetFunder, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'})
invest_ed_db.initiativeTargetFunder.belongsTo(invest_ed_db.initiative)


//Funder - Funds - Initiative 
invest_ed_db.funder.hasMany(invest_ed_db.funds)
invest_ed_db.funds.belongsTo(invest_ed_db.funder)

invest_ed_db.funds.hasOne(invest_ed_db.funder,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.funder.belongsTo(invest_ed_db.funds)

invest_ed_db.funds.hasOne(invest_ed_db.initiative, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
invest_ed_db.initiative.belongsTo(invest_ed_db.funds)

invest_ed_db.initiative.hasMany(invest_ed_db.funds)
invest_ed_db.funds.belongsTo(invest_ed_db.initiative)



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Invest-Ed database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to Invest-Ed database:', err);
  });

module.exports = invest_ed_db