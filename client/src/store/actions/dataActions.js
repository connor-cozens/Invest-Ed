import axios from '../../axios/axiosConfig';
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_CLEAR,
  REGISTER_CLEAR_ERROR,
  CLEAR_REGISTER_ERROR,
  SET_USER,
  SET_REVIEW_FORM,
  SET_MODIFY_FORM,
  SET_ADD_FORM,
  PULLED_APPROVED_FORM,
  NOT_PULLED_APPROVED_FORM,
  CLEAR_FORM_STATUS,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_CLEAR,

  SET_FUNDER_DATA,
  SET_IMPLEMENTER_DATA,
  SET_INITIATIVE_DATA,
  SET_FUNDER_ATTRIBUTES,
  SET_IMPLEMENTER_ATTRIBUTES,
  SET_FUNDERTYPE_INITIATIVE,
  SET_IMPLEMENTERTYPE_INITIATIVE,
  SET_FUNDER_INITIATIVE,
  SET_IMPLEMENTER_INITIATIVE,
  UNSET_VISUALIZED_DATA,
  ACCESS_ERROR,
  CLEAR_ACCESS_ERROR
} from '../reducers/dataReducer';

import {forceLogout} from './authActions';

export const registerUser = (user) => (dispatch) => {
  axios.post(`/register`, {
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    username: user.username,
    organization: user.organization,
    accessLevel: user.accesslevel,
    password: user.password,
    confirmPassword: user.confirmpassword},
    {withCredentials: true})
    .then(response => {
      // If there are validation errors
      if (response.data.error ==  true) {
        const errorList = response.data.messages;
        const errorMsgList = [];
        errorList.forEach(error => {
          errorMsgList.push(error.message);
        });
        dispatch({type: REGISTER_ERROR, payload: errorMsgList});
      }

      // If there are no validation errors
      else {
        dispatch({type: REGISTER_SUCCESS});
      }
    })
    .catch(err => {
      dispatch({type: REGISTER_ERROR, payload: ["Registration Error"]});
    })
}

export const setRegistrationComplete = () => (dispatch) => {
  try {
    dispatch({type: REGISTER_CLEAR});
  }
  catch(err) {
    dispatch({type: REGISTER_CLEAR_ERROR, payload: err});
  }
}

export const clearRegisterError = () => (dispatch) => {
  dispatch({type: CLEAR_REGISTER_ERROR});
}

export const getUser = () => (dispatch) => {
  axios.get(`/`,
    {withCredentials: true, accepts: "application/json"})
    .then(response => {
      if (response.data.error == false) {
        console.log(response)
        dispatch({type: SET_USER, payload: response.data.message[0]});
      } else {
        //If user not authorized to access content but they are set to authorized, need to log them out immediately
        if (response.data.message == "Not authorized to view this content") {
          dispatch(forceLogout())
        }
        else {
          dispatch({type: ACCESS_ERROR, payload: response.data.message})
        }
      }
    })
    .catch(err => {
      dispatch({type: ACCESS_ERROR, payload: err})
    })
}

export const clearFormStatus = () => (dispatch) => {
  dispatch({type: CLEAR_FORM_STATUS});
}

export const setNewFormStatus = () => (dispatch) => {
  dispatch({type: SET_ADD_FORM});
  dispatch({type: CLEAR_ACCESS_ERROR})
}

const readForm = (response => {
  const initiativeRegions = [];
  response.data.table2.forEach((item) => { initiativeRegions.push(item.region); });

  const initiativeCountries = [];  //Countries of Operation
  response.data.table3.forEach((item) => { initiativeCountries.push(item.country); });

  const initiativeProgrammingActivities = [];
  response.data.table4.forEach((item) => { initiativeProgrammingActivities.push(item.programmingActivity); });

  const initiativeSourcesOfFunding = [];
  response.data.table5.forEach((item) => { initiativeSourcesOfFunding.push(item.sourceOfFunding); });

  const initiativeLaunchCountries = [];
  response.data.table6.forEach((item) => { initiativeLaunchCountries.push(item.launchCountry); });

  const initiativeTargetGeographies = [];
  response.data.table7.forEach((item) => { initiativeTargetGeographies.push(item.targetGeography); });

  const initiativeTargetPopulationSectors = [];
  response.data.table8.forEach((item) => { initiativeTargetPopulationSectors.push(item.targetPopulationSector); });

  const initiativeMonitoredOutcomes = [];
  response.data.table9.forEach((item) => { initiativeMonitoredOutcomes.push(item.monitoredOutcome); });

  const initiativeMainEducationSubsectors = [];
  response.data.table10.forEach((item) => { initiativeMainEducationSubsectors.push(item.mainEducationSubsector); });

  const initiativeEducationSubsectors = [];
  response.data.table11.forEach((item) => { initiativeEducationSubsectors.push(item.educationSubsector); });

  const initiativeTargetSchoolManagement = [];
  response.data.table12.forEach((item) => { initiativeTargetSchoolManagement.push(item.targetSchoolManagementType); });

  const implementers = [];
  if (response.data.table13.length > 0) {
    response.data.table13.forEach((implementer) => { implementers.push(implementer); });
  }

  const funders = [];
  if (response.data.table14.length > 0) {
    response.data.table14.forEach((funder) => { funders.push(funder); });
  }

  const status = [];
  if (response.data.table15 !== undefined) {
    status.push(response.data.table15);
  }

  const reviews = [];
  if (response.data.table16 !== undefined) {
    reviews.push(response.data.table16);
  }

  const startYear = parseInt(response.data.table1[0].startYear);
  const endYear = parseInt(response.data.table1[0].endYear);

  //Prepare initiative object to be dispatched to store
  const initiative = {
    tagNumber: response.data.table1[0].tagNumber,
    name: response.data.table1[0].initiativeName,
    description: response.data.table1[0].description,
    website: response.data.table1[0].initiativeWebsite,
    startYear: startYear,
    endYear: endYear,
    mainProgrammingArea: response.data.table1[0].mainProgrammingArea,
    mainProgrammingActivity: response.data.table1[0].mainProgrammingActivity,
    targetsWomen: response.data.table1[0].startYear == 0 ? false : true,
    feeToAccess: response.data.table1[0].feeToAccess == 0 ? false: true,
    regions: initiativeRegions,
    countriesOfOperation: initiativeCountries,
    programmingActivities: initiativeProgrammingActivities,
    sourcesOfFunding: initiativeSourcesOfFunding,
    launchCountry: initiativeLaunchCountries,
    targetGeographies: initiativeTargetGeographies,
    targetPopulationSectors: initiativeTargetPopulationSectors,
    monitoredOutcomes:initiativeMonitoredOutcomes,
    mainEducationSubsectors: initiativeMainEducationSubsectors,
    educationSubSectors: initiativeEducationSubsectors,
    targetSchoolManagementType: initiativeTargetSchoolManagement,
    implementers: implementers,
    funders: funders,
    status: status,
    reviews: reviews
  };
  return initiative;
})

//Get approved forms from main DB
export const getApprovedForm = (tag, getType) => (dispatch) => {
  const tagNum = tag
  const url = `/dashboard/form/${tagNum}`;
  axios.get(url, null, {tagNum})
    .then(response => {
      if (response.data.error !== undefined) {
        dispatch({type: ACCESS_ERROR, payload: response.data.error});
      }
      else {
        const initiative = readForm(response);
        //Dispatch action to store form data in store
        if (getType == 'modify') {
          dispatch({type: SET_MODIFY_FORM, payload: initiative});
          dispatch({type: PULLED_APPROVED_FORM});
        }
        else if (getType == 'review') {
          dispatch({type: SET_REVIEW_FORM, payload: initiative});
          dispatch({type: PULLED_APPROVED_FORM});
        }
        dispatch({type: CLEAR_ACCESS_ERROR});
      }
    })
    .catch(err =>  {
      dispatch({type: ACCESS_ERROR, payload: "Error retrieving form"});
    })
}

//Get non-approved forms from temp DB for organization/RA user to modify
export const getNonApprovedForm = (tag, getType) => (dispatch) => {
  const tagNum = tag
  const url = `/dashboard/form-temp/${tagNum}`;
  axios.get(url, null, {tagNum})
    .then(response => {
      if (response.data.error !== undefined) {
        dispatch({type: NOT_PULLED_APPROVED_FORM});
        //If couldn't find form in temp db, then check for form in main db
        dispatch(getApprovedForm(tag, getType));
      }
      else {
        const initiative = readForm(response);
        //Dispatch action to store form data in store
        if (getType == 'modify') {
          dispatch({type: SET_MODIFY_FORM, payload: initiative});
        }
        else if (getType == 'review') {
          dispatch({type: SET_REVIEW_FORM, payload: initiative});
        }
        dispatch({type: CLEAR_ACCESS_ERROR});
      }
    })
    .catch(err =>  {
      dispatch({type: NOT_PULLED_APPROVED_FORM});
      //If couldn't find form in temp db, then check for form in main db
      dispatch(getApprovedForm(tag, getType));
    })
}

const changeRequestRA = (form, isModified) => {
  //Setting up multi val initatives
  const regions = [];
  if (form.regions !== undefined) { form.regions.forEach((item) => {regions.push(item.key); }); }
  const countries = [];
  if (form.countries !== undefined) { form.countries.forEach((item) => {countries.push(item.key); }); }
  const activities = [];
  if (form.activities !== undefined) { form.activities.forEach((item) => {activities.push(item.key); }); }
  const sourceOfFees = [];
  if (form.sourceOfFees !== undefined) { form.sourceOfFees.forEach((item) => {sourceOfFees.push(item.key); }); }
  const launchCountries = [];
  if (form.launchCountries !== undefined) { form.launchCountries.forEach((item) => {launchCountries.push(item.key); }); }
  const targetGeos = [];
  if (form.targetGeos !== undefined) { form.targetGeos.forEach((item) => {targetGeos.push(item.key); }); }
  const targetPopulationSectors = [];
  if (form.targetPopulationSectors !== undefined) { form.targetPopulationSectors.forEach((item) => {targetPopulationSectors.push(item.key); }); }
  const outcomesMonitored = [];
  if (form.outcomesMonitored !== undefined) { form.outcomesMonitored.forEach((item) => {outcomesMonitored.push(item.key); }); }
  const mEdSubs = [];
  if (form.mEdSubs !== undefined) { form.mEdSubs.forEach((item) => {mEdSubs.push(item.key); }); }
  const oEdSubs = [];
  if (form.oEdSubs !== undefined) { form.oEdSubs.forEach((item) => {oEdSubs.push(item.key); }); }
  const managementTypes = [];
  if (form.managementTypes !== undefined) { form.managementTypes.forEach((item) => {managementTypes.push(item.key); }); }

  //Setting up multi val funders
  const internationalBases = [];
  if (form.internationalBases !== undefined) { form.internationalBases.forEach((item) => {internationalBases.push(item.key); }); }
  const edSubs = [];
  if (form.edSubs !== undefined) { form.edSubs.forEach((item) => {edSubs.push(item.key); }); }
  const orgTraits = [];
  if (form.orgTraits !== undefined) { form.orgTraits.forEach((item) => {orgTraits.push(item.key); }); }
  const asiaIBases = [];
  if (form.asiaIBases !== undefined) { form.asiaIBases.forEach((item) => {asiaIBases.push(item.key); }); }
  const asiaOperations = [];
  if (form.asiaOperations !== undefined) { form.asiaOperations.forEach((item) => {asiaOperations.push(item.key);}); }

  const reqBody = {
    fname: form.fname,
    furl: form.furl,
    motive: form.motive,
    impact: form.impact,
    organizationForm: form.organizationForm,
    // multi val funder
    internationalBases: internationalBases,
    edSubs: form.edSubs,
    orgTraits: form.orgTraits,
    asialBases: asiaIBases,
    asiaOperations: asiaOperations,
    // single val initiative
    initName: form.initName,
    initURL: form.initURL,
    tWomen: form.tWomen,
    initStart: form.initStart,
    initEnd: form.initEnd,
    idescription: form.idescription,
    programArea: form.programArea,
    initativeMainProgramActivity: form.mainProgramActivity,
    feeAccess: form.feeAccess,
    // multi val initiative
    regions: regions,
    countries: countries,
    activities: activities,
    sourceOfFees: sourceOfFees,
    launchCountry: launchCountries,
    targetGeos: form.targetGeos,
    targetPopulationSectors: targetPopulationSectors,
    outcomesMonitored: outcomesMonitored,
    mEdSubs: form.mEdSubs,
    oEdSubs: form.oEdSubs,
    managementTypes: managementTypes,
    // single val implementer
    iname: form.iname,
    impMotive: form.impMotive,
  }

  if (isModified) {
    reqBody.tagNum = form.tagNum;
    reqBody.ofname = form.originalFunderName;
    reqBody.oiname = form.originalImplementerName;
  }

  return reqBody;
}

const changeRequest = (form, inDB, isModified) => {
  //Setting up multi val initatives
  const regions = [];
  if (form.regions !== undefined) { form.regions.forEach((item) => {regions.push(item.key); }); }
  const countries = [];
  if (form.countries !== undefined) { form.countries.forEach((item) => {countries.push(item.key); }); }
  const activities = [];
  if (form.activities !== undefined) { form.activities.forEach((item) => {activities.push(item.key); }); }
  const sourceOfFees = [];
  if (form.sourceOfFees !== undefined) { form.sourceOfFees.forEach((item) => {sourceOfFees.push(item.key); }); }
  const launchCountries = [];
  if (form.launchCountries !== undefined) { form.launchCountries.forEach((item) => {launchCountries.push(item.key); }); }
  const targetGeos = [];
  if (form.targetGeos !== undefined) { form.targetGeos.forEach((item) => {targetGeos.push(item.key); }); }
  const targetPopulationSectors = [];
  if (form.targetPopulationSectors !== undefined) { form.targetPopulationSectors.forEach((item) => {targetPopulationSectors.push(item.key); }); }
  const outcomesMonitored = [];
  if (form.outcomesMonitored !== undefined) { form.outcomesMonitored.forEach((item) => {outcomesMonitored.push(item.key); }); }
  const mEdSubs = [];
  if (form.mEdSubs !== undefined) { form.mEdSubs.forEach((item) => {mEdSubs.push(item.key); }); }
  const oEdSubs = [];
  if (form.oEdSubs !== undefined) { form.oEdSubs.forEach((item) => {oEdSubs.push(item.key); }); }
  const managementTypes = [];
  if (form.managementTypes !== undefined) { form.managementTypes.forEach((item) => {managementTypes.push(item.key); }); }

  //Setting up multi val funders
  const internationalBases = [];
  if (form.internationalBases !== undefined) { form.internationalBases.forEach((item) => {internationalBases.push(item.key); }); }
  const edSubs = [];
  if (form.edSubs !== undefined) { form.edSubs.forEach((item) => {edSubs.push(item.key); }); }
  const orgTraits = [];
  if (form.orgTraits !== undefined) { form.orgTraits.forEach((item) => {orgTraits.push(item.key); }); }
  const asiaIBases = [];
  if (form.asiaIBases !== undefined) { form.asiaIBases.forEach((item) => {asiaIBases.push(item.key); }); }
  const asiaOperations = [];
  if (form.asiaOperations !== undefined) { form.asiaOperations.forEach((item) => {asiaOperations.push(item.key);}); }

  const reqBody = {
    fname: form.fname,
    furl: form.furl,
    motive: form.motive,
    impact: form.impact,
    organizationForm: form.organizationForm,
    // multi val funder
    internationalBases: internationalBases,
    edSubs: form.edSubs,
    orgTraits: form.orgTraits,
    asialBases: asiaIBases,
    asiaOperations: asiaOperations,
    // single val initiative
    initName: form.initName,
    initURL: form.initURL,
    tWomen: form.tWomen,
    initStart: form.initStart,
    initEnd: form.initEnd,
    idescription: form.idescription,
    programArea: form.programArea,
    initativeMainProgramActivity: form.mainProgramActivity,
    feeAccess: form.feeAccess,
    // multi val initiative
    regions: regions,
    countries: countries,
    activities: activities,
    sourceOfFees: sourceOfFees,
    launchCountry: launchCountries,
    targetGeos: form.targetGeos,
    targetPopulationSectors: targetPopulationSectors,
    outcomesMonitored: outcomesMonitored,
    mEdSubs: form.mEdSubs,
    oEdSubs: form.oEdSubs,
    managementTypes: managementTypes,
    // single val implementer
    iname: form.iname,
    impMotive: form.impMotive,

    //Section Reviews - Only to be used when submitting into temp db
    fnameA: 0,
    furlA: 0,
    motiveA: 0,
    impactA: 0,
    organizationFormA: 0,
    // multi val funder
    internationalBasesA: 0,
    edSubsA: 0,
    orgTraitsA: 0,
    asialBasesA: 0,
    asiaOperationsA: 0,
    // single val initiative
    initNameA: 0,
    initURLA: 0,
    tWomenA: 0,
    initStartA: 0,
    initEndA: 0,
    idescriptionA: 0,
    programAreaA: 0,
    initiativeMainProgramActivityA: 0,
    feeAccessA: 0,
    // multi val initiative
    regionsA: 0,
    countriesA: 0,
    activitiesA: 0,
    sourceOfFeesA: 0,
    launchCountryA: 0,
    targetGeosA: 0,
    targetPopulationSectorsA: 0,
    outcomesMonitoredA: 0,
    mEdSubsA: 0,
    oEdSubsA: 0,
    managementTypesA: 0,
    // single val implementer
    inameA: 0,
    impMotiveA: 0,
    // single val other
    comments: form.comments,
    needsReview: 1,
    inDB: (inDB === true) ? 1 : 0
  }

  if (isModified) {
    reqBody.tagNum = form.tagNum;
    reqBody.ofname = form.originalFunderName;
    reqBody.oiname = form.originalImplementerName;
  }

  return reqBody;
}

//Organization user to modify existing form in either main or temp DB (could be in main DB since might have been approved)
export const modifyForm = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified);
  axios.post(`/dashboard//update-form-temp`, req)
    .then(response => {
      dispatch({type: FORM_SUBMIT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: FORM_SUBMIT_ERROR, payload: err});
    })
}

//RA user to modify existing form in main DB
export const modifyFormRA = (form, isModified) => (dispatch) => {
  const req = changeRequestRA(form, isModified);
  axios.post(`/dashboard/update-form`, req)
    .then(response => {
      dispatch({type: FORM_SUBMIT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: FORM_SUBMIT_ERROR, payload: err});
    })
}

//Organization user to add new form to temp DB
export const addForm = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified);
  axios.post(`/dashboard/submit-form-temp`, req)
    .then(response => {
      dispatch({type: FORM_SUBMIT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: FORM_SUBMIT_ERROR, payload: err});
    })
}

//RA user to add new form to main DB
export const addFormRA = (form, isModified) => (dispatch) => {
    const req = changeRequestRA(form, isModified);
    axios.post(`/dashboard/submitform`, req)
      .then(response => {
        dispatch({type: FORM_SUBMIT_SUCCESS});
      })
      .catch(err => {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err});
      })
}

export const setFormSubmissionComplete = () => (dispatch) => {
  dispatch({type: FORM_SUBMIT_CLEAR});
}

/////VISUALIZATION REQUESTS//////////////////////////////////////////////////////////

//FUNDERS
//Single-Valued Funder Attributes
const singleValFunderAttr = (response, attribute) => {
  const funderAttribute = [];
  if (response.data.table1) {
    response.data.table1.forEach((funder) => {
      const name = attribute == 'profitMotive' ? funder.profitMotive : (
      attribute == 'organizationalForm' ? funder.organizationalForm: (
        attribute == 'impactInvesting' ? funder.impactInvesting: null)
      );

      var object = funderAttribute.find((obj) => { return obj.name == name });

      //If object exists in profitMotives object
      if (object !== undefined){
        object.value++;
      }
      //Otherwise, add new key and value pair
      else{
        funderAttribute.push({name: name, value: 1})
      }
    });
  }
  return funderAttribute
}

//Multi-Valued Funder Attributes
const multiValFunderAttr = (response, attribute) => {
  const funderAttribute = [];

  const arr = attribute == 'educationSubsector' ? response.data.table4 : (
  attribute == 'baseLocation' ? response.data.table5 : null )

  if (arr) {
    arr.forEach((funder) => {
      const name = attribute == 'educationSubsector' ? funder.educationSubsector : (
        attribute == 'baseLocation' ? funder.baseLocation : null
      );
      var object = funderAttribute.find((obj) => { return obj.name == name });

      //If object already exists
      if (object !== undefined){
        object.value++;
      }
      //Otherwise, add new key and value pair
      else{
        funderAttribute.push({name: name, value: 1})
      }
    });
  }
  return funderAttribute
}

export const getFunderData = () => (dispatch) => {
  axios.get(`/visualize/target-funder`)
    .then(response => {
      const FunderData = {};

      //Funder Attributes
      FunderData.profitMotives = singleValFunderAttr(response, 'profitMotive');
      FunderData.organizationForm = singleValFunderAttr(response, 'organizationalForm');

      FunderData.impactInvesting = singleValFunderAttr(response, 'impactInvesting');
      FunderData.educationSubsector = multiValFunderAttr(response, 'educationSubsector');
      FunderData.baseLocation = multiValFunderAttr(response, 'baseLocation');

      dispatch({type: SET_FUNDER_DATA, payload: FunderData});
    })
    .catch(err => {
      console.log(err);
      //dispatch({type: ACCESS_ERROR, payload: "Error retrieving data"});
    })
}



//IMPLEMENTERS
const singleValImplementerAttr = (response) => {
  const impAttribute = [];
  if (response.data.table1) {
    response.data.table1.forEach((imp) => {
      const name = imp.profitMotive;

      var object = impAttribute.find((obj) => { return obj.name == name });

      //If object exists in profitMotives object
      if (object !== undefined){
        object.value++;
      }
      //Otherwise, add new key and value pair
      else{
        impAttribute.push({name: name, value: 1})
      }
    });
  }
  return impAttribute
}

export const getImplementerData = () => (dispatch) => {
  axios.get(`/visualize/implementor`)
    .then(response => {
      const ImplementerData = {};

      //Implementer Attributes
      ImplementerData.profitMotives = singleValImplementerAttr(response);
      dispatch({type: SET_IMPLEMENTER_DATA, payload: ImplementerData});
    })
    .catch(err => {
      console.log(err);
    })
}



//INITIATIVES
const singleValInitAttr = (response, attribute) => {
  const initAttribute = [];
  if (response.data.table1) {
    response.data.table1.forEach((init) => {
      const name = attribute == 'mainProgrammingArea' ? init.mainProgrammingActivity : (
      attribute == 'mainProgrammingActivity' ? init.mainProgrammingActivity: null
      );

      var object = initAttribute.find((obj) => { return obj.name == name });

      //If object exists in profitMotives object
      if (object !== undefined){
        object.value++;
      }
      //Otherwise, add new key and value pair
      else{
        initAttribute.push({name: name, value: 1})
      }
    });
  }
  return initAttribute
}

const multiValInitAttr = (response, attribute) => {
  const initAttribute = [];

  const arr = attribute == 'region' ? response.data.table2 : (
  attribute == 'country' ? response.data.table3 : (
      attribute == 'programmingActivity' ? response.data.table4 : (
          attribute == 'sourceOfFunding' ? response.data.table5 : (
              attribute == 'targetGeography' ? response.data.table7 : (
                  attribute == 'targetPopulationSector' ? response.data.table8 : (
                      attribute == 'monitoredOutcome' ? response.data.table9 : (
                          attribute == 'mainEducationSubsector' ? response.data.table10 : (
                              attribute == 'targetSchoolManagementType' ? response.data.table11 : null
                          )
                      )
                  )
              )
          )
      )
  ));

  if (arr) {
    arr.forEach((init) => {
      const name = attribute == 'region' ? init.region : (
      attribute == 'country' ? init.country : (
          attribute == 'programmingActivity' ? init.programmingActivity : (
              attribute == 'sourceOfFunding' ? init.sourceOfFunding : (
                  attribute == 'targetGeography' ? init.targetGeography : (
                      attribute == 'targetPopulationSector' ? init.targetPopulationSector : (
                          attribute == 'monitoredOutcome' ? init.monitoredOutcome : (
                              attribute == 'mainEducationSubsector' ? init.mainEducationSubsector : (
                                  attribute == 'targetSchoolManagementType' ? init.targetSchoolManagementType : null
                              )
                          )
                      )
                  )
              )
          )
      ));

      var object = initAttribute.find((obj) => { return obj.name == name });

      //If object already exists
      if (object !== undefined){
        object.value++;
      }
      //Otherwise, add new key and value pair
      else{
        initAttribute.push({name: name, value: 1})
      }
    });
  }
  return initAttribute
}

export const getInitiativeData = () => (dispatch) => {
  axios.get(`/visualize/initiative`)
    .then(response => {
      const InitiativeData = {};

      //Initiative Attributes
      InitiativeData.mainProgrammingArea = singleValInitAttr(response, 'mainProgrammingArea');
      InitiativeData.mainProgrammingActivity = singleValInitAttr(response, 'mainProgrammingActivity');

      InitiativeData.region = multiValInitAttr(response, 'region');
      InitiativeData.countryOfOperation = multiValInitAttr(response, 'country');
      InitiativeData.programmingActivity = multiValInitAttr(response, 'programmingActivity');
      InitiativeData.sourceOfFunding = multiValInitAttr(response, 'sourceOfFunding');
      InitiativeData.targetGeography = multiValInitAttr(response, 'targetGeography');
      InitiativeData.targetPopulationSector = multiValInitAttr(response, 'targetPopulationSector');
      InitiativeData.monitoredOutcome = multiValInitAttr(response, 'monitoredOutcome');
      InitiativeData.mainEducationSubsector = multiValInitAttr(response, 'mainEducationSubsector');
      InitiativeData.targetSchoolManagementType = multiValInitAttr(response, 'targetSchoolManagementType');

      dispatch({type: SET_INITIATIVE_DATA, payload: InitiativeData});
    })
    .catch(err => {
      console.log(err);
    })
}



//INITIATIVE FUNDERS BY ATTRIBUTE
const fundersPerFunderAttrType = (response, attribute) => {
  const funders = [];

  const arr = attribute == 'profitMotive' ? response.data.table1 : (
  attribute == 'organizationalForm' ? response.data.table2 : (
    attribute == 'impactInvesting' ? response.data.table3 : (
      attribute == 'educationSubsector' ? response.data.table4 : (
          attribute == 'baseLocation' ? response.data.table5 : null
        )
      )
    )
  );

  if (arr) {
    arr.forEach((funder) => {
      const name = attribute == 'profitMotive' ? funder.profitMotive : (
      attribute == 'organizationalForm' ? funder.organizationalForm: (
        attribute == 'impactInvesting' ? funder.impactInvesting: (
          attribute == 'educationSubsector' ? funder.educationSubsector: (
            attribute == 'baseLocation' ? funder.baseLocation: null
            )
          )
        )
      );

      var object = funders.find((obj) => { return obj.name == name });

      //If object exists in profitMotives object
      if (object !== undefined){
        object.value.push(funder.funderName);
      }
      //Otherwise, add new key and value pair
      else{
        funders.push({name: name, value: [funder.funderName]});
      }
    });
  }
  return funders;
}
const initativesPerFunder = (response, funder) => {
  const initiatives = [];
  response.data.table6.forEach(funds => {
    //Only get current funder instances
    if (funds.funderName == funder) {
      const currentTag = funds.tagNum;
      var object = initiatives.find(obj => { return obj.initiative == currentTag });

      if (object === undefined) {
        initiatives.push({initiative: currentTag});
      }
    }
  });
  return initiatives;
}

const initiativesByMainProgActivity = (d, response) => {
  const data = [];
  d.forEach(initiatives => {
    initiatives.forEach(init => {
      //Check if init is in the database first
      var object = response.data.table7.find(obj => {return init.initiative == obj.tagNumber});
      const name = object.mainProgrammingArea;

      //Then check if the database value is already in the data array
      var objectFromData = data.find(obj => {return name == obj.name});

      if (objectFromData !== undefined) {
        objectFromData.value++;
      }
      else {
        data.push({name: name, value: 1})
      }
    });
  });
  return data
}
const initiativeEntityByMainProgActivity = (d, response) => {
  const data = [];
  d.forEach(init => {
    //Check if init is in the database first
    var object = response.data.table7.find(obj => {return init.initiative == obj.tagNumber});
    const name = object.mainProgrammingArea;

    //Then check if the database value is already in the data array
    var objectFromData = data.find(obj => {return name == obj.name});

    if (objectFromData !== undefined) {
      objectFromData.value++;
    }
    else {
      data.push({name: name, value: 1})
    }
  });
  return data
}


const initiativesByCountriesOfOperation = (d, response) => {
  const data = [];
  d.forEach(initiatives => {
    initiatives.forEach(init => {
      //Check if init is in the database first
      var object = response.data.table9.find(obj => {return init.initiative == obj.tagNumber});
      if (object !== undefined) {
         const name = object.country;
         //Then check if the database value is already in the data array
         var objectFromData = data.find(obj => {return name == obj.name});

         if (objectFromData !== undefined) {
           objectFromData.value++;
         }
         else {
           data.push({name: name, value: 1})
         }
      }
    });
  });
  return data
}
const initiativeEntityByCountriesOfOperation = (d, response) => {
  const data = [];
  d.forEach(init => {
    //Check if init is in the database first
    var object = response.data.table9.find(obj => {return init.initiative == obj.tagNumber});
    if (object !== undefined) {
       const name = object.country;
       //Then check if the database value is already in the data array
       var objectFromData = data.find(obj => {return name == obj.name});

       if (objectFromData !== undefined) {
         objectFromData.value++;
       }
       else {
         data.push({name: name, value: 1})
       }
    }
  });
  return data
}


export const getInitiativeFundersByAttr = () => (dispatch) => {
  axios.get(`/visualize/target-funder-attributes`)
    .then(response => {
      const FunderAttributes = {};

      const FTRelationships = [];   //ARRAY OF RELATIONSHIPS
      const FunderTypeRelationships = {};

      const FRelationships = [];  //ARRAY OF RELATIONSHIPS
      const FunderRelationships = {};

      //ATTRIBUTE 1 - PROFIT MOTIVE
      const ProfitMotiveTargetFunder = [];

      const Relationship1 = {};
      const MainProgrammingActivity1 = [];
      const CountryOfOperation1 = [];

      const RelationshipFunder1 = {};
      const MainProgrammingActivityFunder1 = [];
      const CountryOfOperationFunder1 = [];

      const fundersByProfitMotive = fundersPerFunderAttrType(response, 'profitMotive');
      fundersByProfitMotive.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder1.push({id: funder, data: initiativeEntityByMainProgActivity(initPerFunder, response)});
          CountryOfOperationFunder1.push({id: funder, data: initiativeEntityByCountriesOfOperation(initPerFunder, response)});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        ProfitMotiveTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity1.push({ id: attrType.name, data: initiativesByMainProgActivity(dataFunderAttr, response)});
        CountryOfOperation1.push({ id: attrType.name, data: initiativesByCountriesOfOperation(dataFunderAttr, response)});
      });
      Relationship1.mainProgramActivity = MainProgrammingActivity1;
      Relationship1.countryOfOperation = CountryOfOperation1;
      RelationshipFunder1.mainProgramActivity = MainProgrammingActivityFunder1;
      RelationshipFunder1.countryOfOperation = CountryOfOperationFunder1;

      //ATTRIBUTE 2 - ORGANIZATION FORM
      const OrgFormTargetFunder = [];

      const Relationship2 = {};
      const MainProgrammingActivity2 = [];
      const CountryOfOperation2 = [];

      const RelationshipFunder2 = {};
      const MainProgrammingActivityFunder2 = [];
      const CountryOfOperationFunder2 = [];

      const fundersByOrgForm = fundersPerFunderAttrType(response, 'organizationalForm');
      fundersByOrgForm.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder2.push({id: funder, data: initiativeEntityByMainProgActivity(initPerFunder, response)});
          CountryOfOperationFunder2.push({id: funder, data: initiativeEntityByCountriesOfOperation(initPerFunder, response)});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        OrgFormTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity2.push({ id: attrType.name, data: initiativesByMainProgActivity(dataFunderAttr, response)});
        CountryOfOperation2.push({ id: attrType.name, data: initiativesByCountriesOfOperation(dataFunderAttr, response)});
      });
      Relationship2.mainProgramActivity = MainProgrammingActivity2;
      Relationship2.countryOfOperation = CountryOfOperation2;
      RelationshipFunder2.mainProgramActivity = MainProgrammingActivityFunder2;
      RelationshipFunder2.countryOfOperation = CountryOfOperationFunder2;

      //ATTRIBUTE 3 - IMPACT INVESTING
      const ImpactInvestingTargetFunder = [];

      const Relationship3 = {};
      const MainProgrammingActivity3 = [];
      const CountryOfOperation3 = [];

      const RelationshipFunder3 = {};
      const MainProgrammingActivityFunder3 = [];
      const CountryOfOperationFunder3 = [];

      const fundersByImpactInvesting = fundersPerFunderAttrType(response, 'impactInvesting');
      fundersByImpactInvesting.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder3.push({id: funder, data: initiativeEntityByMainProgActivity(initPerFunder, response)});
          CountryOfOperationFunder3.push({id: funder, data: initiativeEntityByCountriesOfOperation(initPerFunder, response)});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        ImpactInvestingTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity3.push({ id: attrType.name, data: initiativesByMainProgActivity(dataFunderAttr, response)});
        CountryOfOperation3.push({ id: attrType.name, data: initiativesByCountriesOfOperation(dataFunderAttr, response)});
      });
      Relationship3.mainProgramActivity = MainProgrammingActivity3;
      Relationship3.countryOfOperation = CountryOfOperation3;
      RelationshipFunder3.mainProgramActivity = MainProgrammingActivityFunder3;
      RelationshipFunder3.countryOfOperation = CountryOfOperationFunder3;

      //ATTRIBUTE 4 - EDUCATION SUBSECTORS
      const EduSubsectorsTargetFunder = [];

      const Relationship4 = {};
      const MainProgrammingActivity4 = [];
      const CountryOfOperation4 = [];

      const RelationshipFunder4 = {};
      const MainProgrammingActivityFunder4 = [];
      const CountryOfOperationFunder4 = [];

      const fundersByEduSubsector = fundersPerFunderAttrType(response, 'educationSubsector');
      fundersByEduSubsector.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder4.push({id: funder, data: initiativeEntityByMainProgActivity(initPerFunder, response)});
          CountryOfOperationFunder4.push({id: funder, data: initiativeEntityByCountriesOfOperation(initPerFunder, response)});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        EduSubsectorsTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity4.push({ id: attrType.name, data: initiativesByMainProgActivity(dataFunderAttr, response)});
        CountryOfOperation4.push({ id: attrType.name, data: initiativesByCountriesOfOperation(dataFunderAttr, response)});
      });
      Relationship4.mainProgramActivity = MainProgrammingActivity4;
      Relationship4.countryOfOperation = CountryOfOperation4;
      RelationshipFunder4.mainProgramActivity = MainProgrammingActivityFunder4;
      RelationshipFunder4.countryOfOperation = CountryOfOperationFunder4;

      //ATTRIBUTE 5 - BASE LOCATION
      const BaseLocationTargetFunder = [];

      const Relationship5 = {};
      const MainProgrammingActivity5 = [];
      const CountryOfOperation5 = [];

      const RelationshipFunder5 = {};
      const MainProgrammingActivityFunder5 = [];
      const CountryOfOperationFunder5 = [];

      const fundersByBaseLocation = fundersPerFunderAttrType(response, 'baseLocation');
      fundersByBaseLocation.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder5.push({id: funder, data: initiativeEntityByMainProgActivity(initPerFunder, response)});
          CountryOfOperationFunder5.push({id: funder, data: initiativeEntityByCountriesOfOperation(initPerFunder, response)});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        BaseLocationTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity5.push({ id: attrType.name, data: initiativesByMainProgActivity(dataFunderAttr, response)});
        CountryOfOperation5.push({ id: attrType.name, data: initiativesByCountriesOfOperation(dataFunderAttr, response)});
      });
      Relationship5.mainProgramActivity = MainProgrammingActivity5;
      Relationship5.countryOfOperation = CountryOfOperation5;
      RelationshipFunder5.mainProgramActivity = MainProgrammingActivityFunder5;
      RelationshipFunder5.countryOfOperation = CountryOfOperationFunder5;


      //Set attributes to funder attributes object
      FunderAttributes.ProfitMotiveTargetFunder = ProfitMotiveTargetFunder;
      FunderAttributes.OrgFormTargetFunder = OrgFormTargetFunder;
      FunderAttributes.ImpactInvestingTargetFunder = ImpactInvestingTargetFunder;
      FunderAttributes.EduSubsectorsTargetFunder = EduSubsectorsTargetFunder;
      FunderAttributes.BaseLocationTargetFunder = BaseLocationTargetFunder;

      //SET funders types associated with each initiative type
      FunderTypeRelationships.ProfitMotiveInitiative = Relationship1;
      FunderTypeRelationships.OrgFormInitiative = Relationship2;
      FunderTypeRelationships.ImpactInvestorInitiative = Relationship3;
      FunderTypeRelationships.ESubsectorInitiative = Relationship4;
      FunderTypeRelationships.BaseLocInitiative = Relationship5;

      FTRelationships.push(FunderTypeRelationships);
      // console.log(FTRelationships);

      //SET funders associated with each initiative type
      FunderRelationships.ProfitMotiveFunderInitiative = RelationshipFunder1;
      FunderRelationships.OrgFormFunderInitiative = RelationshipFunder2;
      FunderRelationships.ImpactInvestorFunderInitiative = RelationshipFunder3;
      FunderRelationships.ESubsectorFunderInitiative = RelationshipFunder4;
      FunderRelationships.BaseLocFunderInitiative = RelationshipFunder5;

      FRelationships.push(FunderRelationships);

      dispatch({type: SET_FUNDER_ATTRIBUTES, payload: FunderAttributes});
      dispatch({type: SET_FUNDERTYPE_INITIATIVE, payload: FTRelationships});
      dispatch({type: SET_FUNDER_INITIATIVE, payload: FRelationships});
    })
    .catch(err => {
      console.log(err);
    })
}


//INITIATIVE IMPLEMENTERS BY ATTRIBUTE
const implementersPerFunderAttrType = (response) => {
  const implementers = [];
  const arr = response.data.table1;
  if (arr) {
    arr.forEach((implementer) => {
      const name = implementer.profitMotive;
      var object = implementers.find((obj) => { return obj.name == name });
      //If object exists in profitMotives object
      if (object !== undefined){
        object.value.push(implementer.implementorName);
      }
      //Otherwise, add new key and value pair
      else{
        implementers.push({name: name, value: [implementer.implementorName]});
      }
    });
  }
  return implementers;
}


const initiativesImpTypeByMainProgActivity = (d, response) => {
  const data = [];
  d.forEach(initiatives => {
    initiatives.forEach(init => {
      //Check if init is in the database first
      var object = response.data.table3.find(obj => {return init.initiative == obj.tagNumber});
      const name = object.mainProgrammingArea;

      //Then check if the database value is already in the data array
      var objectFromData = data.find(obj => {return name == obj.name});

      if (objectFromData !== undefined) {
        objectFromData.value++;
      }
      else {
        data.push({name: name, value: 1})
      }
    });
  });
  return data
}
const initiativesImpByMainProgActivity = (d, response) => {
  const data = [];
  d.forEach(init => {
    //Check if init is in the database first
    var object = response.data.table3.find(obj => {return init.initiative == obj.tagNumber});
    const name = object.mainProgrammingArea;

    //Then check if the database value is already in the data array
    var objectFromData = data.find(obj => {return name == obj.name});

    if (objectFromData !== undefined) {
      objectFromData.value++;
    }
    else {
      data.push({name: name, value: 1})
    }
  });
  return data
}


const initiativesImpTypeByCountriesOfOperation = (d, response) => {
  const data = [];
  d.forEach(initiatives => {
    initiatives.forEach(init => {
      //Check if init is in the database first
      var object = response.data.table4.find(obj => {return init.initiative == obj.tagNumber});
      if (object !== undefined) {
         const name = object.country;
         //Then check if the database value is already in the data array
         var objectFromData = data.find(obj => {return name == obj.name});

         if (objectFromData !== undefined) {
           objectFromData.value++;
         }
         else {
           data.push({name: name, value: 1})
         }
      }
    });
  });
  return data
}
const initiativesImpByCountriesOfOperation = (d, response) => {
  const data = [];
  d.forEach(init => {
    //Check if init is in the database first
    var object = response.data.table4.find(obj => {return init.initiative == obj.tagNumber});
    if (object !== undefined) {
       const name = object.country;
       //Then check if the database value is already in the data array
       var objectFromData = data.find(obj => {return name == obj.name});

       if (objectFromData !== undefined) {
         objectFromData.value++;
       }
       else {
         data.push({name: name, value: 1})
       }
    }
  });
  return data
}

const initativesPerImplementer = (response, implementer) => {
  const initiatives = [];
  response.data.table2.forEach(_implements => {
    //Only get current funder instances
    if (_implements.implementorName == implementer) {
      const currentTag = _implements.tagNum;
      var object = initiatives.find(obj => { return obj.initiative == currentTag });

      if (object === undefined) {
        initiatives.push({initiative: currentTag});
      }
    }
  });
  return initiatives;
}

export const getInitiativeImplementersByAttr = () => (dispatch) => {
  axios.get(`/visualize/implementor-attributes`)
    .then(response => {
      const ImplementerAttributes = {};

      const ImplementerTypeRelationships = {};
      const ImplementerRelationships = {};

      //ATTRIBUTE 1 - PROFIT MOTIVE
      const ProfitMotiveImplementer = [];

      const Relationship1 = {};
      const MainProgrammingActivity1 = [];
      const CountryOfOperation1 = [];

      const RelationshipImplementer1 = {};
      const MainProgrammingActivityImplementer1 = [];
      const CountryOfOperationImplementer1 = [];

      const implementersByProfitMotive = implementersPerFunderAttrType(response);
      implementersByProfitMotive.forEach(attrType => {
        const data = [];
        const dataImplementerAttr = [];

        attrType.value.forEach(implementer => {
          const initPerImplementer = initativesPerImplementer(response, implementer);
          dataImplementerAttr.push(initPerImplementer);
          MainProgrammingActivityImplementer1.push({id: implementer, data: initiativesImpByMainProgActivity(initPerImplementer, response)});
          CountryOfOperationImplementer1.push({id: implementer, data: initiativesImpByCountriesOfOperation(initPerImplementer, response)});

          var numInitativesImplemented = initPerImplementer.length;
          if (numInitativesImplemented !== 0) {
            data.push({name: implementer, value: numInitativesImplemented});
          }
        });
        ProfitMotiveImplementer.push({id: attrType.name, data: data});
        MainProgrammingActivity1.push({ id: attrType.name, data: initiativesImpTypeByMainProgActivity(dataImplementerAttr, response)});
        CountryOfOperation1.push({ id: attrType.name, data: initiativesImpTypeByCountriesOfOperation(dataImplementerAttr, response)});
      });
      Relationship1.mainProgramActivity = MainProgrammingActivity1;
      Relationship1.countryOfOperation = CountryOfOperation1;
      RelationshipImplementer1.mainProgramActivity = MainProgrammingActivityImplementer1;
      RelationshipImplementer1.countryOfOperation = CountryOfOperationImplementer1;

      ImplementerTypeRelationships.ProfitMotiveInitiative = Relationship1;
      ImplementerRelationships.ProfitMotiveImplementerInitiative = RelationshipImplementer1;
      ImplementerAttributes.ProfitMotiveImplementer = ProfitMotiveImplementer;

      // console.log(ImplementerTypeRelationships);
      // console.log(ImplementerRelationships);

      dispatch({type: SET_IMPLEMENTER_ATTRIBUTES, payload: ImplementerAttributes});
      dispatch({type: SET_IMPLEMENTERTYPE_INITIATIVE, payload: ImplementerTypeRelationships});
      dispatch({type: SET_IMPLEMENTER_INITIATIVE, payload: ImplementerRelationships});
    })
    .catch(err => {
      console.log(err);
    });
}
