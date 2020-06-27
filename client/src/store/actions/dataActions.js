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
  FORM_REVIEW_SUCCESS,
  FORM_REVIEW_ERROR,
  FORM_REVIEW_CLEAR,

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
  let initiativeRegions = [];
  response.data.table2.forEach((item) => { initiativeRegions.push(item.region); });

  let initiativeCountries = [];  //Countries of Operation
  response.data.table3.forEach((item) => { initiativeCountries.push(item.country); });

  let initiativeProgrammingActivities = [];
  response.data.table4.forEach((item) => { initiativeProgrammingActivities.push(item.programmingActivity); });

  let initiativeSourcesOfFunding = [];
  response.data.table5.forEach((item) => { initiativeSourcesOfFunding.push(item.sourceOfFunding); });

  let initiativeLaunchCountries = [];
  response.data.table6.forEach((item) => { initiativeLaunchCountries.push(item.launchCountry); });

  let initiativeTargetGeographies = [];
  response.data.table7.forEach((item) => { initiativeTargetGeographies.push(item.targetGeography); });

  let initiativeTargetPopulationSectors = [];
  response.data.table8.forEach((item) => { initiativeTargetPopulationSectors.push(item.targetPopulationSector); });

  let initiativeMonitoredOutcomes = [];
  response.data.table9.forEach((item) => { initiativeMonitoredOutcomes.push(item.monitoredOutcome); });

  let initiativeMainEducationSubsectors = [];
  response.data.table10.forEach((item) => { initiativeMainEducationSubsectors.push(item.mainEducationSubsector); });

  let initiativeEducationSubsectors = [];
  response.data.table11.forEach((item) => { initiativeEducationSubsectors.push(item.educationSubsector); });

  let initiativeTargetSchoolManagement = [];
  response.data.table12.forEach((item) => { initiativeTargetSchoolManagement.push(item.targetSchoolManagementType); });

  let implementers = [];
  if (response.data.table13.length > 0) {
    response.data.table13.forEach((implementer) => { implementers.push(implementer); });
  }

  let funders = [];
  if (response.data.table14.length > 0) {
    response.data.table14.forEach((funder) => { funders.push(funder); });
  }

  //Get multi-valued funder attributes - base locations, asia bases, asia operations, education subsectors, traits
  if (response.data.funderIndividual !== undefined) {
    //For each funder
    response.data.funderIndividual.forEach(indivFunder => {
      //Find matching funder from general funder info list
      let funderObj = funders.find(funder => {
        if (indivFunder[0][0] !== undefined) {
          return funder.funderName == indivFunder[0][0].funderName;
        } else {
          return false;
        }

      });
      if (funderObj !== undefined) {
        //For each funder attribute (eg. base location), get all the corresponding rows/values (eg. all corresponding country names) and add as object to general funder list
        indivFunder.forEach(attributeList => {
          attributeList.forEach(attribute => {
            Object.keys(attribute).forEach(key => {
              if (key !== 'funderName') {
                if (key in funderObj) {
                  funderObj[key].push(attribute[key])
                } else {
                  funderObj[key] = [attribute[key]];
                }
              }
            });
          });
        });
      }
    });
  }

  let status_comments = [];
  if (response.data.table15 !== undefined) {
    status_comments.push(response.data.table15);
  }

  let reviews = [];
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
    mainProgrammingArea: response.data.table1[0].mainProgrammingArea !== null ? response.data.table1[0].mainProgrammingArea : '' ,
    mainProgrammingActivity: response.data.table1[0].mainProgrammingActivity !== null ? response.data.table1[0].mainProgrammingActivity : '',
    targetsWomen: response.data.table1[0].targetsWomen,
    feeToAccess: response.data.table1[0].feeToAccess,
    regions: initiativeRegions,
    countriesOfOperation: initiativeCountries,
    programmingActivities: initiativeProgrammingActivities,
    sourcesOfFunding: initiativeSourcesOfFunding,
    launchCountry: initiativeLaunchCountries,
    targetGeographies: initiativeTargetGeographies,
    targetPopulationSectors: initiativeTargetPopulationSectors,
    monitoredOutcomes: initiativeMonitoredOutcomes,
    mainEducationSubSectors: initiativeMainEducationSubsectors,
    educationSubSectors: initiativeEducationSubsectors,
    targetSchoolManagementType: initiativeTargetSchoolManagement,
    implementers: implementers,
    funders: funders,
    status: status_comments,
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
      console.log(err)
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
    .catch(err => {
      console.log(err)
      dispatch({type: NOT_PULLED_APPROVED_FORM});
      //If couldn't find form in temp db, then check for form in main db
      dispatch(getApprovedForm(tag, getType));
    })
}

const changeRequestRA = (form, isModified) => {
  const reqBody = {
    fname: form.fname,
    furl: form.furl,
    motive: form.motive,
    impact: form.impact,
    organizationForm: form.organizationForm,
    // multi val funder
    internationalBases: form.internationalBases,
    edSubs: form.edSubs,
    orgTraits: form.orgTraits,
    asialBases: form.asiaIBases,
    asiaOperations: form.asiaOperations,
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
    regions: form.regions,
    countries: form.countries,
    activities: form.activities,
    sourceOfFees: form.sourceOfFees,
    launchCountry: form.launchCountries,
    targetGeos: form.targetGeos,
    targetPopulationSectors: form.targetPopulationSectors,
    outcomesMonitored: form.outcomesMonitored,
    mEdSubs: form.mEdSubs,
    oEdSubs: form.oEdSubs,
    managementTypes: form.managementTypes,
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

//Call on submission of new form or update of existing form from organization user, or on submission of review from RA user
const changeRequest = (form, inDB, isModified, isReviewed) => {
  const reqBody = {
    fname: form.fname,
    furl: form.furl,
    motive: form.motive,
    impact: form.impact,
    organizationForm: form.organizationForm,
    // multi val funder
    internationalBases: form.internationalBases,
    edSubs: form.edSubs,
    orgTraits: form.orgTraits,
    asialBases: form.asiaIBases,
    asiaOperations: form.asiaOperations,
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
    regions: form.regions,
    countries: form.countries,
    activities: form.activities,
    sourceOfFees: form.sourceOfFees,
    launchCountry: form.launchCountries,
    targetGeos: form.targetGeos,
    targetPopulationSectors: form.targetPopulationSectors,
    outcomesMonitored: form.outcomesMonitored,
    mEdSubs: form.mEdSubs,
    oEdSubs: form.oEdSubs,
    managementTypes: form.managementTypes,
    // single val implementer
    iname: form.iname,
    impMotive: form.impMotive,

    //Section Reviews - Only to be used when submitting into temp db
    fnameA: isReviewed === true ? form.fnameA : 0,
    furlA: isReviewed === true ? form.furlA : 0,
    motiveA: isReviewed === true ? form.motiveA : 0,
    impactA: isReviewed === true ? form.impactA : 0,
    organizationFormA: isReviewed === true ? form.organizationFormA : 0,
    // multi val funder
    internationalBasesA: isReviewed === true ? form.internationalBasesA : 0,
    edSubsA: isReviewed === true ? form.edSubsA : 0,
    orgTraitsA: isReviewed === true ? form.orgTraitsA : 0,
    asialBasesA: isReviewed === true ? form.asialBasesA : 0,
    asiaOperationsA: isReviewed === true ? form.asiaOperationsA : 0,
    // single val initiative
    initNameA: isReviewed === true ? form.initNameA : 0,
    initURLA: isReviewed === true ? form.initURLA : 0,
    tWomenA: isReviewed === true ? form.tWomenA : 0,
    initStartA: isReviewed === true ? form.initStartA : 0,
    initEndA: isReviewed === true ? form.initEndA : 0,
    idescriptionA: isReviewed === true ? form.idescriptionA : 0,
    programAreaA: isReviewed === true ? form.programAreaA : 0,
    initiativeMainProgramActivityA: isReviewed === true ? form.initiativeMainProgramActivityA : 0,
    feeAccessA: isReviewed === true ? form.feeAccessA : 0,
    // multi val initiative
    regionsA: isReviewed === true ? form.regionsA : 0,
    countriesA: isReviewed === true ? form.countriesA : 0,
    activitiesA: isReviewed === true ? form.activitiesA : 0,
    sourceOfFeesA: isReviewed === true ? form.sourceOfFeesA : 0,
    launchCountryA: isReviewed === true ? form.launchCountryA : 0,
    targetGeosA: isReviewed === true ? form.targetGeosA : 0,
    targetPopulationSectorsA: isReviewed === true ? form.targetPopulationSectorsA : 0,
    outcomesMonitoredA: isReviewed === true ? form.outcomesMonitoredA : 0,
    mEdSubsA: isReviewed === true ? form.mEdSubsA : 0,
    oEdSubsA: isReviewed === true ? form.oEdSubsA : 0,
    managementTypesA: isReviewed === true ? form.managementTypesA : 0,
    // single val implementer
    inameA: isReviewed === true ? form.inameA : 0,
    impMotiveA: isReviewed === true ? form.impMotiveA : 0,
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

//Organization user to modify existing form from either main or temp DB (could be in main DB since might have been approved) and submit it to temp db
export const modifyForm = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified, false);
  axios.post(`/dashboard/update-form-temp`, req)
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
      dispatch(modifyForm(form, true, true));
    })
    .catch(err => {
      dispatch({type: FORM_SUBMIT_ERROR, payload: err});
    })
}

//RA user to submit rejection review of form to temp db
export const addRejectionReview = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified, true);
  axios.post(`/dashboard/update-form-temp`, req)
    .then(response => {
      dispatch({type: FORM_REVIEW_SUCCESS});
    })
    .catch(err => {
      dispatch({type: FORM_REVIEW_ERROR, payload: err});
    })
}


//Organization user to add new form to temp DB
export const addForm = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified, false);
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

      dispatch({type: SET_IMPLEMENTER_ATTRIBUTES, payload: ImplementerAttributes});
      dispatch({type: SET_IMPLEMENTERTYPE_INITIATIVE, payload: ImplementerTypeRelationships});
      dispatch({type: SET_IMPLEMENTER_INITIATIVE, payload: ImplementerRelationships});
    })
    .catch(err => {
      console.log(err);
    });
}
