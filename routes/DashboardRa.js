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

    try {
        
    } catch(error) {

    }

})

//Post modified form to DB
dashboardRA.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})



module.exports = dashboardRA