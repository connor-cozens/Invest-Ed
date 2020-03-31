import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_CLEAR,
  REGISTER_CLEAR_ERROR,
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
  ACCESS_ERROR,
  CLEAR_ACCESS_ERROR
} from '../reducers/dataReducer';

import {forceLogout} from './authActions';

export const registerUser = (user) => (dispatch) => {
  axios.post(`http://localhost:4000/register`, {
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    username: user.username,
    organization: user.organization,
    accessLevel: user.accesslevel,
    password: user.password,
    confirmPassword: user.confirmpassword})
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

export const getUser = () => (dispatch) => {
  axios.get(`http://localhost:4000/`,
    {withCredentials: true})
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

  console.log(initiative);
  
  return initiative;
})

//Get approved forms from main DB
export const getApprovedForm = (tag, getType) => (dispatch) => {
  console.log(tag);
  const tagNum = tag
  const url = `http://localhost:4000/dashboard/form/${tagNum}`;
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
  const url = `http://localhost:4000/dashboard/form-temp/${tagNum}`;
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
  axios.post(`http://localhost:4000/dashboard/update-test-temp`, req)
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
  axios.post(`http://localhost:4000/dashboard/update-test`, req)
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
  axios.post(`http://localhost:4000/dashboard/submit-form-temp`, req)
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
    axios.post(`http://localhost:4000/dashboard/submitform`, req)
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
