const express = require("express")
const dashboardRA = express.Router()
const cors = require('cors')

const db = require("../database/invest-ed_db")

dashboardRA.use(cors())

//GET from from DB
dashboardRA.get('/form', (req, res) =>{
    tagnum = req.query.tagNum
    
    iData = db.initiative.findAll({
        where: {
            tagNumber: tagnum
        }
    });

    console.log(iData)

    const form = {
        // Funder Single Types
        fName: db.funder.funderName,
        fWebsite: db.funder.funderWebsite,
        fProfitMotive: db.funder.funderProfitMotive,
        fImpactInvesting: db.funder.impactInvesting,
        fOrganizationalForm: db.funder.organizationForm,
        // Funder Multivalued Types
        fAsiaBases: db.funderAsiaBases.asiaBase,
        fAsiaOperations: db.funderAsiaOperations.asiaOperatons,
        fEducationSubsectors: db.funderEducationSubsectors.educationSubsector,
        fInternationalBases: db.funderInternationalBases.baseLocation,
        fOrganizationalTraits: db.funderOrganizationTraits.trait,
        // Implementors Single Types
        imName: db.implementor.implementorName,
        imProfitMotive: db.implementor.profitMotive,
        // Initiative Single Types
        inTagNumber: db.initiative.tagNumber,
        inName: db.initiative.initiativeName,
        inWebsite: db.initiative.initiativeWebsite,
        inTargetsWomen: db.initiative.targetsWomen,
        inStartYear: db.initiative.startYear,
        inEndYear: db.initiative.endYear,
        inDescription: db.initiative.description,
        inMainProgrammingArea: db.initiative.mainProgrammingArea,
        inMainProgrammingActivity: db.initiative.mainProgrammingActivity,
        inFeeToAccess: db.initiative.feeToAccess,
        // Initiative Multivalued Types
        inCountryOfOperation: db.initiativeCountryOfOperation.country,
        inEducationSubsector: db.initiativeEducationSubsectors.educationSubsector,
        inFundingSource: db.initiativeFundingSource.sourceOfFunding,
        inLaunchCountry: db.initiativeLaunchCountry.launchCountry,
        inMainEducationSubsector: db.initiativeMainEducationSubsector.mainEducationSubsector,
        inMonitoredOutcomes: db.initiativeMonitoredOutcomes.monitoredOutcome,
        inProgrammingActivities: db.initiativeProgrammingActivities.programmingActivity,
        inRegion: db.initiativeRegion.region,
        inTargetGeography: db.initiativeTargetGeography.targetGeography,
        inTargetPopulationSubsector: db.initiativeTargetPopulationSector.targetPopulationSector,
        inTargetSchoolManagementType: db.initiativeTargetSchoolManagement.targetSchoolManagementType
    }
    //res.send("hello!")
})

//GET form from temp DB
dashboardRA.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST new form to temp DB
dashboardRA.post('/new-form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST modified form to temp DB
dashboardRA.post('/modified-form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST new form to DB
dashboardRA.post('/new-form', (req, res) =>{
    //res.send("hello!")
})

//Post modified form to DB
dashboardRA.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})



module.exports = dashboardRA