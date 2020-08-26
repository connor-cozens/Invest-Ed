import axios from '../../axios/axiosConfig';
import {
  //REGISTER
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_CLEAR,
  REGISTER_CLEAR_ERROR,
  CLEAR_REGISTER_ERROR,

  //USER
  SET_USER,
  SET_USER_ERROR,
  CLEAR_SET_USER_ERROR,

  //FORMS
  SET_REVIEW_FORM,
  SET_MODIFY_FORM,
  SET_ADD_FORM,
  SET_VIEW_FORM,

  PULLED_APPROVED_FORM,
  NOT_PULLED_APPROVED_FORM,

  CLEAR_FORM_STATUS,
  SET_FORM_ERROR,
  CLEAR_SET_FORM_ERROR,

  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_CLEAR,
  FORM_REVIEW_SUCCESS,
  FORM_REVIEW_ERROR,
  FORM_REVIEW_CLEAR,

  //DATA VISUALIZATION
  SET_FUNDER_DATA,
  SET_FUNDER_NUMBERS,
  SET_IMPLEMENTER_DATA,
  SET_IMPLEMENTER_NUMBERS,
  SET_INITIATIVE_DATA,
  SET_INITIATIVE_NUMBERS,
  SET_FUNDER_ATTRIBUTES,
  SET_IMPLEMENTER_ATTRIBUTES,
  SET_FUNDERTYPE_INITIATIVE,
  SET_IMPLEMENTERTYPE_INITIATIVE,
  SET_FUNDER_INITIATIVE,
  SET_IMPLEMENTER_INITIATIVE,
  UNSET_VISUALIZED_DATA
} from '../reducers/dataReducer';

import {LOGIN_SUCCESS} from '../reducers/authReducer';
import {forceLogout} from './authActions';

//USER REGISTRATION ACTIONS
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

//USER RETRIEVAL ACTIONS
export const getUser = () => (dispatch) => {
  axios.get(`/`,
    {withCredentials: true, accepts: "application/json"})
    .then(response => {
      if (response.data.error == false) {
        dispatch({type: SET_USER, payload: response.data.message[0]});
        dispatch({type: LOGIN_SUCCESS});
        dispatch(clearUserRetrievalError());
      } else {
        //If user not authorized to access content but they are set to authorized, need to log them out immediately
        if (response.data.message == "Not authorized to view this content") {
          dispatch(forceLogout())
        }
        else {
          dispatch({type: SET_USER_ERROR, payload: response.data.message})
        }
      }
    })
    .catch(err => {
      dispatch({type: SET_USER_ERROR, payload: err})
    })
}

export const clearUserRetrievalError = () => (dispatch) => {
  dispatch({type: CLEAR_SET_USER_ERROR});
}

//FORM ACTIONS
export const clearFormStatus = () => (dispatch) => {
  dispatch({type: CLEAR_FORM_STATUS});
}

export const setNewFormStatus = () => (dispatch) => {
  dispatch({type: SET_ADD_FORM});
  dispatch({type: CLEAR_SET_FORM_ERROR})
}

export const clearFormRetrievalError = () => (dispatch) => {
  dispatch({type: CLEAR_SET_FORM_ERROR})
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

  axios.get(url, {withCredentials: true, accepts: "application/json"}, {tagNum})
    .then(response => {
      if (response.data.error !== undefined) {
        //If error was from attempted sql query
        if (response.data.error.message.sqlMessage !== undefined) {
          dispatch({type: SET_FORM_ERROR, payload: {errorMessage: "There was an issue retrieving this form.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
        } else {
          dispatch({type: SET_FORM_ERROR, payload: response.data.error.message});
        }
      }
      else {
        const initiative = readForm(response);
        //dispatch({type: CLEAR_SET_FORM_ERROR});
        //Dispatch action to store form data in store
        if (getType == 'modify') {
          dispatch({type: SET_MODIFY_FORM, payload: initiative})
        }
        else if (getType == 'review') {
          dispatch({type: SET_REVIEW_FORM, payload: initiative})
        }
      }
    })
    .catch(err =>  {
      //If network error
      if (err.message !== undefined) {
        dispatch({type: SET_FORM_ERROR, payload: err.message})
      } else {
        dispatch({type: SET_FORM_ERROR, payload: err})
      }
    })
}

//Get non-approved forms from temp DB for organization/RA user to modify
export const getNonApprovedForm = (tag, getType) => (dispatch) => {
  const tagNum = tag
  const url = `/dashboard/form-temp/${tagNum}`;

  axios.get(url, {withCredentials: true, accepts: "application/json"}, {tagNum})
    .then(response => {
      if (response.data.error !== undefined) {
        dispatch({type: NOT_PULLED_APPROVED_FORM});

        //If user doesn't have edit access rights to the form, set form to view only (readOnly)
        if (response.data.error.message.unauthorizedEdit !== undefined) {
          dispatch({type: SET_VIEW_FORM, payload: response.data.error.message.unauthorizedEdit})
        }
        //If couldn't find form in temp db or user doesnt have edit access rights to form in temp db, then check for form in main db
        dispatch(getApprovedForm(tag, getType))
      }
      else {
        const initiative = readForm(response);
        // dispatch({type: CLEAR_SET_FORM_ERROR})
        //Dispatch action to store form data in store
        if (getType == 'modify') {
          dispatch({type: SET_MODIFY_FORM, payload: initiative})
        }
        else if (getType == 'review') {
          dispatch({type: SET_REVIEW_FORM, payload: initiative})
        }
      }
    })
    .catch(err => {
      dispatch({type: NOT_PULLED_APPROVED_FORM});
      //If couldn't find form in temp db, then check for form in main db
      dispatch(getApprovedForm(tag, getType))
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
    fnameA: form.reviews.fnameA,
    furlA: form.reviews.furlA,
    motiveA: form.reviews.motiveA,
    impactA: form.reviews.impactA,
    organizationFormA: form.reviews.organizationFormA,
    // multi val funder
    internationalBasesA: form.reviews.internationalBasesA,
    edSubsA: form.reviews.edSubsA,
    orgTraitsA: form.reviews.orgTraitsA,
    asialBasesA: form.reviews.asialBasesA,
    asiaOperationsA: form.reviews.asiaOperationsA,
    // single val initiative
    initNameA: form.reviews.initNameA,
    initURLA: form.reviews.initURLA,
    tWomenA: form.reviews.tWomenA,
    initStartA: form.reviews.initStartA,
    initEndA: form.reviews.initEndA,
    idescriptionA: form.reviews.idescriptionA,
    programAreaA: form.reviews.programAreaA,
    initiativeMainProgramActivityA: form.reviews.initiativeMainProgramActivityA,
    feeAccessA: form.reviews.feeAccessA,
    // multi val initiative
    regionsA: form.reviews.regionsA,
    countriesA: form.reviews.countriesA,
    activitiesA: form.reviews.activitiesA,
    sourceOfFeesA: form.reviews.sourceOfFeesA,
    launchCountryA: form.reviews.launchCountryA,
    targetGeosA: form.reviews.targetGeosA,
    targetPopulationSectorsA: form.reviews.targetPopulationSectorsA,
    outcomesMonitoredA: form.reviews.outcomesMonitoredA,
    mEdSubsA: form.reviews.mEdSubsA,
    oEdSubsA: form.reviews.oEdSubsA,
    managementTypesA: form.reviews.managementTypesA,
    // single val implementer
    inameA: form.reviews.inameA,
    impMotiveA: form.reviews.impMotiveA,
    // single val other
    comments: form.comments,
    needsReview: form.needsReview,
    inDB: isReviewed === true ? (form.needsReview === 1 ? 0 : 1) : (inDB === true ? 0 : (form.needsReview === 1 ? 0 : 1))
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
  axios.post(`/dashboard/update-form-temp`, req, {withCredentials: true})
    .then(response => {
      //If error occured on server
      if (response.data.error !== undefined) {
        //If error was from attempted sql query
        if (response.data.error.message.sqlMessage !== undefined) {
          dispatch({type: FORM_SUBMIT_ERROR, payload: {errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
        } else {
          dispatch({type: FORM_SUBMIT_ERROR, payload: response.data.error.message});
        }

      } else {
        if (response.data.tagNum !== undefined) {
          dispatch({type: FORM_SUBMIT_SUCCESS, payload: {tagNumber: response.data.tagNum}});
        } else {
          dispatch({type: FORM_SUBMIT_SUCCESS, payload: {tagNumber: "Tag number could not be retrieved successfully"}});
        }
      }
    })
    .catch(err => {
      //If network error
      if (err.message !== undefined) {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err.message});
      } else {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err});
      }
    })
}

//RA user to modify existing form in main DB
export const modifyFormRA = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequestRA(form, isModified);
  axios.post(`/dashboard/update-form`, req, {withCredentials: true})
    .then(response => {
      if (response.data.error !== undefined) {
        //If error was from attempted sql query
        if (response.data.error.message.sqlMessage !== undefined) {
          dispatch({type: FORM_SUBMIT_ERROR, payload: {errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
        } else {
          dispatch({type: FORM_SUBMIT_ERROR, payload: response.data.error.message});
        }

      } else {
        dispatch(modifyForm(form, inDB, true));
      }
    })
    .catch(err => {
      //If network error
      if (err.message !== undefined) {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err.message});
      } else {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err});
      }
    })
}

//RA user to submit approved form to main db
const approveForm = (form, isModified) => (dispatch) => {
  const req = changeRequestRA(form, isModified);
  axios.post(`/dashboard/update-form`, req, {withCredentials: true})
    .then(response => {
      //If error occured on server
      if (response.data.error !== undefined) {
        //If error was from attempted sql query
        if (response.data.error.message.sqlMessage !== undefined) {
          dispatch({type: FORM_REVIEW_ERROR, payload: {errorMessage: "There was an issue submitting this form review.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
        } else {
          dispatch({type: FORM_REVIEW_ERROR, payload: response.data.error.message});
        }

      } else {
        dispatch({type: FORM_REVIEW_SUCCESS});
      }
    })
    .catch(err => {
      //If network error
      if (err.message !== undefined) {
        dispatch({type: FORM_REVIEW_ERROR, payload: err.message});
      } else {
        dispatch({type: FORM_REVIEW_ERROR, payload: err});
      }
    })
}

//RA user to submit review of form to temp db
export const reviewForm = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified, true);
  axios.post(`/dashboard/update-form-temp`, req, {withCredentials: true})
    .then(response => {
      //If error occured on server
      if (response.data.error !== undefined) {
        //If error was from attempted sql query
        if (response.data.error.message.sqlMessage !== undefined) {
          dispatch({type: FORM_REVIEW_ERROR, payload: {errorMessage: "There was an issue submitting this form review.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
        } else {
          dispatch({type: FORM_REVIEW_ERROR, payload: response.data.error.message});
        }

      } else {
        //If form is approved, then submit approval
        if (form.needsReview === 0) {
          dispatch(approveForm(form, true));
        } else {
          dispatch({type: FORM_REVIEW_SUCCESS});
        }
      }
    })
    .catch(err => {
      //If network error
      if (err.message !== undefined) {
        dispatch({type: FORM_REVIEW_ERROR, payload: err.message});
      } else {
        dispatch({type: FORM_REVIEW_ERROR, payload: err});
      }
    })
}


//Organization user to add new form to temp DB
export const addForm = (form, inDB, isModified) => (dispatch) => {
  const req = changeRequest(form, inDB, isModified, false);
  axios.post(`/dashboard/submit-form-temp`, req, {withCredentials: true})
    .then(response => {
      if (response.data.error !== undefined) {
        //If error was from attempted sql query
        if (response.data.error.message.sqlMessage !== undefined) {
          dispatch({type: FORM_SUBMIT_ERROR, payload: {errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
        } else {
          dispatch({type: FORM_SUBMIT_ERROR, payload: response.data.error.message});
        }

        //Retrieve tagNumber of attempted submission, in order to send updated form after error on initial new form submission
        if (response.data.error.tagNum !== undefined) {
          dispatch({type: SET_MODIFY_FORM, payload: {tagNumber: parseInt(response.data.error.tagNum)}});
        }

      } else {
        if (response.data.tagNum !== undefined) {
          dispatch({type: FORM_SUBMIT_SUCCESS, payload: {tagNumber: response.data.tagNum}});
        } else {
          dispatch({type: FORM_SUBMIT_SUCCESS, payload: {tagNumber: "Tag number could not be retrieved successfully"}});
        }
      }
    })
    .catch(err => {
      //If network error
      if (err.message !== undefined) {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err.message});
      } else {
        dispatch({type: FORM_SUBMIT_ERROR, payload: err});
      }
    })
}

//RA user to add new form to main DB
export const addFormRA = (form, isModified) => (dispatch) => {
    const req = changeRequestRA(form, isModified);
    axios.post(`/dashboard/submitform`, req, {withCredentials: true})
      .then(response => {
        //If error occured on server
        if (response.data.error !== undefined) {
          //If error was from attempted sql query
          if (response.data.error.message.sqlMessage !== undefined) {
            dispatch({type: FORM_SUBMIT_ERROR, payload: {errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage}});
          } else {
            dispatch({type: FORM_SUBMIT_ERROR, payload: response.data.error.message});
          }

          //Retrieve tagNumber of attempted submission, in order to send updated form after error on initial new form submission
          if (response.data.error.tagNum !== undefined) {
            dispatch({type: SET_MODIFY_FORM, payload: {tagNumber: parseInt(response.data.error.tagNum)}});
          }

        } else {
          if (response.data.tagNum !== undefined) {
            dispatch({type: FORM_SUBMIT_SUCCESS, payload: {tagNumber: response.data.tagNum}});
          } else {
            dispatch({type: FORM_SUBMIT_SUCCESS, payload: {tagNumber: "Tag number could not be retrieved successfully"}});
          }
        }
      })
      .catch(err => {
        //If network error
        if (err.message !== undefined) {
          dispatch({type: FORM_SUBMIT_ERROR, payload: err.message});
        } else {
          dispatch({type: FORM_SUBMIT_ERROR, payload: err});
        }
      })
}

export const setFormSubmissionComplete = () => (dispatch) => {
  dispatch({type: FORM_SUBMIT_CLEAR});
}

export const setFormReviewComplete = () => (dispatch) => {
  dispatch({type: FORM_REVIEW_CLEAR});
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


//Get number of funders
const getNumFunders = (response) => {
  if (response.data.table1) {
    return response.data.table1.length
  }
}

export const getFunderData = () => (dispatch) => {
  axios.get(`/visualize/target-funder`)
    .then(response => {
      const FunderData = {};

      //Set Funder Attributes
      FunderData.profitMotives = singleValFunderAttr(response, 'profitMotive');
      FunderData.organizationForm = singleValFunderAttr(response, 'organizationalForm');

      FunderData.impactInvesting = singleValFunderAttr(response, 'impactInvesting');
      FunderData.educationSubsector = multiValFunderAttr(response, 'educationSubsector');
      FunderData.baseLocation = multiValFunderAttr(response, 'baseLocation');

      dispatch({type: SET_FUNDER_DATA, payload: FunderData});

      //Set the number of funders
      dispatch({type: SET_FUNDER_NUMBERS, payload: getNumFunders(response)})
    })
    .catch(err => {
      console.log(err);
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

//Get number of implementers
const getNumImplementers = (response) => {
  if (response.data.table1) {
    return response.data.table1.length
  }
}

export const getImplementerData = () => (dispatch) => {
  axios.get(`/visualize/implementor`)
    .then(response => {
      const ImplementerData = {};

      //Set Implementer Attributes
      ImplementerData.profitMotives = singleValImplementerAttr(response);
      dispatch({type: SET_IMPLEMENTER_DATA, payload: ImplementerData});

      //Set the number of implementers
      dispatch({type: SET_IMPLEMENTER_NUMBERS, payload: getNumImplementers(response)})
    })
    .catch(err => {
      console.log(err);
    })
}



//INITIATIVES
const singleValInitAttr = (response, attribute) => {
  const initAttributes = [];
  const initNames = [];

  if (response.data.table1) {
    response.data.table1.forEach((init) => {
      const name = attribute == 'mainProgrammingArea' ? init.mainProgrammingActivity : (
      attribute == 'mainProgrammingActivity' ? init.mainProgrammingActivity: null
      );

      //Populate initiative numbers by attribute
        //Check if object already added to initAttributes array with attribute name (I.E. India as attribute name for countryOfOperation attribute)
        let objectInitAttributes = initAttributes.find((obj) => { return obj.name == name });
        //If object already exists
        if (objectInitAttributes !== undefined){
          objectInitAttributes.value++;
        }
        //Otherwise, add new key and value pair
        else{
          initAttributes.push({name: name, value: 1})
        }

      //Populate initiative names by attribute
        //Check if object already added to initNames array with attribute name (I.E. India as attribute name for countryOfOperation attribute)
        let objectInitNames = initNames.find((obj) => { return obj.name == name });

        //If object already exists
        if (objectInitNames !== undefined){
          objectInitNames.value.push(init.initiativeName);
        }
        //Otherwise, add new key and value pair
        else{
          initNames.push({name: name, value: [init.initiativeName]})
        }
    });
  }
  return {initAttributes, initNames}
}

const multiValInitAttr = (response, attribute) => {
  const initAttributes = [];
  const initNames = [];

  const arr = attribute == 'region' ? response.data.table2 : (
  attribute == 'country' ? response.data.table3 : (
      attribute == 'programmingActivity' ? response.data.table4 : (
          attribute == 'sourceOfFunding' ? response.data.table5 : (
            attribute == 'launchCountry' ? response.data.table6 : (
              attribute == 'targetGeography' ? response.data.table7 : (
                  attribute == 'targetPopulationSector' ? response.data.table8 : (
                      attribute == 'monitoredOutcome' ? response.data.table9 : (
                          attribute == 'mainEducationSubsector' ? response.data.table10 : (
                              attribute == 'educationSubsector' ? response.data.table11 : (
                                attribute == 'targetSchoolManagementType' ? response.data.table12 : null
                              )
                          )
                      )
                  )
              )
          )
      )
  )));

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
                                  attribute == 'launchCountry' ? init.launchCountry : (
                                    attribute == 'educationSubsector' ? init.educationSubsector : (
                                        attribute == 'targetSchoolManagementType' ? init.targetSchoolManagementType : null
                                    )
                                  )
                              )
                          )
                      )
                  )
              )
          )
      ));

    //Populate initiative numbers by attribute
      //Check if object already added to initAttributes array with attribute name (I.E. India as attribute name for countryOfOperation attribute)
      let objectInitAttributes = initAttributes.find((obj) => { return obj.name == name });
      //If object already exists
      if (objectInitAttributes !== undefined){
        objectInitAttributes.value++;
      }
      //Otherwise, add new key and value pair
      else{
        initAttributes.push({name: name, value: 1})
      }

    //Populate initiative names by attribute
      //Find matching initiative in initiative table
      let matchingInitObject;
      if (attribute == 'educationSubsector') {
        matchingInitObject = response.data.table1.find((obj) => { return obj.tagNumber == init.initiativeTagNumber })
      } else {
        matchingInitObject = response.data.table1.find((obj) => { return obj.tagNumber == init.tagNumber })
      }

      //If match found
      if (matchingInitObject !== undefined) {
        //Check if object already added to initNames array with attribute name (I.E. India as attribute name for countryOfOperation attribute)
        let objectInitNames = initNames.find((obj) => { return obj.name == name });

        //If object already exists
        if (objectInitNames !== undefined){
          objectInitNames.value.push(matchingInitObject.initiativeName);
        }
        //Otherwise, add new key and value pair
        else{
          initNames.push({name: name, value: [matchingInitObject.initiativeName]})
        }
      }
    });
  }
  return {initAttributes, initNames}
}


//Get number of implementers
const getNumInitiatives = (response) => {
  if (response.data.table1) {
    return response.data.table1.length
  }
}

export const getInitiativeData = () => (dispatch) => {
  axios.get(`/visualize/initiative`)
    .then(response => {
      const InitiativeData = {};

      //Set Initiative Attributes
      InitiativeData.mainProgrammingArea = singleValInitAttr(response, 'mainProgrammingArea');
      InitiativeData.mainProgrammingActivity = singleValInitAttr(response, 'mainProgrammingActivity');

      InitiativeData.region = multiValInitAttr(response, 'region');
      InitiativeData.countryOfOperation = multiValInitAttr(response, 'country');
      InitiativeData.launchCountry = multiValInitAttr(response, 'launchCountry');
      InitiativeData.programmingActivity = multiValInitAttr(response, 'programmingActivity');
      InitiativeData.sourceOfFunding = multiValInitAttr(response, 'sourceOfFunding');
      InitiativeData.targetGeography = multiValInitAttr(response, 'targetGeography');
      InitiativeData.targetPopulationSector = multiValInitAttr(response, 'targetPopulationSector');
      InitiativeData.monitoredOutcome = multiValInitAttr(response, 'monitoredOutcome');
      InitiativeData.mainEducationSubsector = multiValInitAttr(response, 'mainEducationSubsector');
      InitiativeData.educationSubsector = multiValInitAttr(response, 'educationSubsector');
      InitiativeData.targetSchoolManagementType = multiValInitAttr(response, 'targetSchoolManagementType');

      dispatch({type: SET_INITIATIVE_DATA, payload: InitiativeData});

      //Set the number of initiatives
      dispatch({type: SET_INITIATIVE_NUMBERS, payload: getNumInitiatives(response)})
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

// const initiativesByMainProgActivity = (d, response) => {
//   const data = [];
//   d.forEach(initiatives => {
//     initiatives.forEach(init => {
//       //Check if init is in the database first
//       var object = response.data.table7.find(obj => {return init.initiative == obj.tagNumber});
//       if (object !== undefined) {
//         const name = object.mainProgrammingArea;
//
//         //Then check if the database value is already in the data array
//         var objectFromData = data.find(obj => {return name == obj.name});
//
//         if (objectFromData !== undefined) {
//           objectFromData.value++;
//         }
//         else {
//           data.push({name: name, value: 1})
//         }
//       }
//     });
//   });
//   return data
// }
// const initiativeEntityByMainProgActivity = (d, response) => {
//   const data = [];
//   d.forEach(init => {
//     //Check if init is in the database first
//     var object = response.data.table7.find(obj => {return init.initiative == obj.tagNumber});
//     if (object !== undefined) {
//       const name = object.mainProgrammingArea;
//
//       //Then check if the database value is already in the data array
//       var objectFromData = data.find(obj => {return name == obj.name});
//
//       if (objectFromData !== undefined) {
//         objectFromData.value++;
//       }
//       else {
//         data.push({name: name, value: 1})
//       }
//     }
//   });
//   return data
// }
//
//
// const initiativesByCountriesOfOperation = (d, response) => {
//   const data = [];
//   d.forEach(initiatives => {
//     initiatives.forEach(init => {
//       //Check if init is in the database first
//       var object = response.data.table9.find(obj => {return init.initiative == obj.tagNumber});
//       if (object !== undefined) {
//          const name = object.country;
//          //Then check if the database value is already in the data array
//          var objectFromData = data.find(obj => {return name == obj.name});
//
//          if (objectFromData !== undefined) {
//            objectFromData.value++;
//          }
//          else {
//            data.push({name: name, value: 1})
//          }
//       }
//     });
//   });
//   return data
// }
// const initiativeEntityByCountriesOfOperation = (d, response) => {
//   const data = [];
//   d.forEach(init => {
//     //Check if init is in the database first
//     var object = response.data.table9.find(obj => {return init.initiative == obj.tagNumber});
//     if (object !== undefined) {
//        const name = object.country;
//        //Then check if the database value is already in the data array
//        var objectFromData = data.find(obj => {return name == obj.name});
//
//        if (objectFromData !== undefined) {
//          objectFromData.value++;
//        }
//        else {
//          data.push({name: name, value: 1})
//        }
//     }
//   });
//   return data
// }

///////
const initiativesByFunderAttr = (d, response, attribute) => {
  const data = [];
  const arr = attribute == 'region' ? response.data.table8 : (
  attribute == 'country' ? response.data.table9 : (
      attribute == 'programmingActivity' ? response.data.table10 : (
          attribute == 'sourceOfFunding' ? response.data.table11 : (
            attribute == 'launchCountry' ? response.data.table12 : (
              attribute == 'targetGeography' ? response.data.table13 : (
                  attribute == 'targetPopulationSector' ? response.data.table14 : (
                      attribute == 'monitoredOutcome' ? response.data.table15 : (
                          attribute == 'mainEducationSubsector' ? response.data.table16 : (
                              attribute == 'educationSubsector' ? response.data.table17 : (
                                attribute == 'targetSchoolManagementType' ? response.data.table18 : (
                                  (attribute == 'mainProgrammingActivity' || attribute == 'mainProgrammingArea') ? response.data.table6 : null
                                )
                              )
                          )
                      )
                  )
              )
          )
      )
  )));

  d.forEach(initiatives => {
    initiatives.forEach(init => {
      if (arr) {
        //Check if init is in the database first
        let object;
        if (attribute == 'educationSubsector'){
          object = arr.find(obj => {return init.initiative == obj.initiativeTagNumber});
        } else {
          object = arr.find(obj => {return init.initiative == obj.tagNumber});
        }
        if (object !== undefined) {
          const name = attribute == 'region' ? object.region : (
          attribute == 'country' ? object.country : (
              attribute == 'programmingActivity' ? object.programmingActivity : (
                  attribute == 'sourceOfFunding' ? object.sourceOfFunding : (
                      attribute == 'targetGeography' ? object.targetGeography : (
                          attribute == 'targetPopulationSector' ? object.targetPopulationSector : (
                              attribute == 'monitoredOutcome' ? object.monitoredOutcome : (
                                  attribute == 'mainEducationSubsector' ? object.mainEducationSubsector : (
                                      attribute == 'launchCountry' ? object.launchCountry : (
                                        attribute == 'educationSubsector' ? object.educationSubsector : (
                                            attribute == 'targetSchoolManagementType' ? object.targetSchoolManagementType : (
                                              attribute == 'mainProgrammingActivity' ? object.mainProgrammingActivity : (
                                                attribute == 'mainProgrammingArea' ? object.mainProgrammingArea : null
                                              )
                                            )
                                        )
                                      )
                                  )
                              )
                          )
                      )
                  )
              )
           ));
           //Then check if the database value is already in the data array
           var objectFromData = data.find(obj => {return name == obj.name});

           if (objectFromData !== undefined) {
             objectFromData.value++;
           }
           else {
             data.push({name: name, value: 1})
           }
        }
      }
    });
  });
  return data
}

///
const initiativeEntityByFunderAttr = (d, response, attribute) => {
  const data = [];
  const arr = attribute == 'region' ? response.data.table8 : (
  attribute == 'country' ? response.data.table9 : (
      attribute == 'programmingActivity' ? response.data.table10 : (
          attribute == 'sourceOfFunding' ? response.data.table11 : (
            attribute == 'launchCountry' ? response.data.table12 : (
              attribute == 'targetGeography' ? response.data.table13 : (
                  attribute == 'targetPopulationSector' ? response.data.table14 : (
                      attribute == 'monitoredOutcome' ? response.data.table15 : (
                          attribute == 'mainEducationSubsector' ? response.data.table16 : (
                              attribute == 'educationSubsector' ? response.data.table17 : (
                                attribute == 'targetSchoolManagementType' ? response.data.table18 : (
                                  (attribute == 'mainProgrammingActivity' || attribute == 'mainProgrammingArea') ? response.data.table6 : null
                                )
                              )
                          )
                      )
                  )
              )
          )
      )
  )));

  d.forEach(init => {
    if (arr) {
      //Check if init is in the database first
      let object;
      if (attribute == 'educationSubsector'){
        object = arr.find(obj => {return init.initiative == obj.initiativeTagNumber});
      } else {
        object = arr.find(obj => {return init.initiative == obj.tagNumber});
      }
      if (object !== undefined) {
        const name = attribute == 'region' ? object.region : (
        attribute == 'country' ? object.country : (
            attribute == 'programmingActivity' ? object.programmingActivity : (
                attribute == 'sourceOfFunding' ? object.sourceOfFunding : (
                    attribute == 'targetGeography' ? object.targetGeography : (
                        attribute == 'targetPopulationSector' ? object.targetPopulationSector : (
                            attribute == 'monitoredOutcome' ? object.monitoredOutcome : (
                                attribute == 'mainEducationSubsector' ? object.mainEducationSubsector : (
                                    attribute == 'launchCountry' ? object.launchCountry : (
                                      attribute == 'educationSubsector' ? object.educationSubsector : (
                                          attribute == 'targetSchoolManagementType' ? object.targetSchoolManagementType : (
                                            attribute == 'mainProgrammingActivity' ? object.mainProgrammingActivity : (
                                              attribute == 'mainProgrammingArea' ? object.mainProgrammingArea : null
                                            )
                                          )
                                      )
                                    )
                                )
                            )
                        )
                    )
                )
            )
         ));
         //Then check if the database value is already in the data array
         var objectFromData = data.find(obj => {return name == obj.name});

         if (objectFromData !== undefined) {
           objectFromData.value++;
         }
         else {
           data.push({name: name, value: 1})
         }
      }
    }
  });
  return data
}
//////


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
      const MainProgrammingArea1 = [];
      const Region1 = [];
      const CountryOfOperation1 = [];
      const ProgrammingActivity1 = [];
      const FundingSource1 = [];
      const LaunchCountry1 = [];
      const MonitoredOutcome1 = [];
      const TargetGeography1 = [];
      const TargetPopulationSector1 = [];
      const MainEducationSubsector1 = [];
      const EducationSubsector1 = [];
      const TargetSchoolManagementType1 = [];

      const RelationshipFunder1 = {};
      const MainProgrammingActivityFunder1 = [];
      const MainProgrammingAreaFunder1 = [];
      const RegionFunder1 = [];
      const CountryOfOperationFunder1 = [];
      const ProgrammingActivityFunder1 = [];
      const FundingSourceFunder1 = [];
      const LaunchCountryFunder1 = [];
      const MonitoredOutcomeFunder1 = [];
      const TargetGeographyFunder1 = [];
      const TargetPopulationSectorFunder1 = [];
      const MainEducationSubsectorFunder1 = [];
      const EducationSubsectorFunder1 = [];
      const TargetSchoolManagementTypeFunder1 = [];

      const fundersByProfitMotive = fundersPerFunderAttrType(response, 'profitMotive');
      fundersByProfitMotive.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);

          MainProgrammingActivityFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingActivity')});
          MainProgrammingAreaFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingArea')});
          RegionFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'region')});
          CountryOfOperationFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'country')});
          ProgrammingActivityFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'programmingActivity')});
          FundingSourceFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'sourceOfFunding')});
          LaunchCountryFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'launchCountry')});
          MonitoredOutcomeFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'monitoredOutcome')});
          TargetGeographyFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetGeography')});
          TargetPopulationSectorFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetPopulationSector')});
          MainEducationSubsectorFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainEducationSubsector')});
          EducationSubsectorFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'educationSubsector')});
          TargetSchoolManagementTypeFunder1.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetSchoolManagementType')});

          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        ProfitMotiveTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingActivity')});
        MainProgrammingArea1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingArea')});
        Region1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'region')});
        CountryOfOperation1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'country')});
        ProgrammingActivity1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'programmingActivity')});
        FundingSource1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'sourceOfFunding')});
        LaunchCountry1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'launchCountry')});
        MonitoredOutcome1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'monitoredOutcome')});
        TargetGeography1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetGeography')});
        TargetPopulationSector1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetPopulationSector')});
        MainEducationSubsector1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainEducationSubsector')});
        EducationSubsector1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'educationSubsector')});
        TargetSchoolManagementType1.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetSchoolManagementType')});
      });
      Relationship1.mainProgramActivity = MainProgrammingActivity1;
      Relationship1.mainProgramArea = MainProgrammingArea1;
      Relationship1.region = Region1;
      Relationship1.countryOfOperation = CountryOfOperation1;
      Relationship1.programmingActivity = ProgrammingActivity1;
      Relationship1.sourceOfFunding = FundingSource1;
      Relationship1.launchCountry = LaunchCountry1;
      Relationship1.monitoredOutcome = MonitoredOutcome1;
      Relationship1.targetGeography = TargetGeography1;
      Relationship1.targetPopulationSector = TargetPopulationSector1;
      Relationship1.mainEducationSubsector = MainEducationSubsector1;
      Relationship1.educationSubsector = EducationSubsector1;
      Relationship1.targetSchoolManagementType = TargetSchoolManagementType1;

      RelationshipFunder1.mainProgramActivity = MainProgrammingActivityFunder1;
      RelationshipFunder1.mainProgramArea = MainProgrammingAreaFunder1;
      RelationshipFunder1.region = RegionFunder1;
      RelationshipFunder1.countryOfOperation = CountryOfOperationFunder1;
      RelationshipFunder1.programmingActivity = ProgrammingActivityFunder1;
      RelationshipFunder1.sourceOfFunding = FundingSourceFunder1;
      RelationshipFunder1.launchCountry = LaunchCountryFunder1;
      RelationshipFunder1.monitoredOutcome = MonitoredOutcomeFunder1;
      RelationshipFunder1.targetGeography = TargetGeographyFunder1;
      RelationshipFunder1.targetPopulationSector = TargetPopulationSectorFunder1;
      RelationshipFunder1.mainEducationSubsector = MainEducationSubsectorFunder1;
      RelationshipFunder1.educationSubsector = EducationSubsectorFunder1;
      RelationshipFunder1.targetSchoolManagementType = TargetSchoolManagementTypeFunder1;


      //ATTRIBUTE 2 - ORGANIZATION FORM
      const OrgFormTargetFunder = [];

      const Relationship2 = {};
      const MainProgrammingActivity2 = [];
      const MainProgrammingArea2 = [];
      const Region2 = [];
      const CountryOfOperation2 = [];
      const ProgrammingActivity2 = [];
      const FundingSource2 = [];
      const LaunchCountry2 = [];
      const MonitoredOutcome2 = [];
      const TargetGeography2 = [];
      const TargetPopulationSector2 = [];
      const MainEducationSubsector2 = [];
      const EducationSubsector2 = [];
      const TargetSchoolManagementType2 = [];

      const RelationshipFunder2 = {};
      const MainProgrammingActivityFunder2 = [];
      const MainProgrammingAreaFunder2 = [];
      const RegionFunder2 = [];
      const CountryOfOperationFunder2 = [];
      const ProgrammingActivityFunder2 = [];
      const FundingSourceFunder2 = [];
      const LaunchCountryFunder2 = [];
      const MonitoredOutcomeFunder2 = [];
      const TargetGeographyFunder2 = [];
      const TargetPopulationSectorFunder2 = [];
      const MainEducationSubsectorFunder2 = [];
      const EducationSubsectorFunder2 = [];
      const TargetSchoolManagementTypeFunder2 = [];

      const fundersByOrgForm = fundersPerFunderAttrType(response, 'organizationalForm');
      fundersByOrgForm.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingActivity')});
          MainProgrammingAreaFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingArea')});
          RegionFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'region')});
          CountryOfOperationFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'country')});
          ProgrammingActivityFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'programmingActivity')});
          FundingSourceFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'sourceOfFunding')});
          LaunchCountryFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'launchCountry')});
          MonitoredOutcomeFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'monitoredOutcome')});
          TargetGeographyFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetGeography')});
          TargetPopulationSectorFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetPopulationSector')});
          MainEducationSubsectorFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainEducationSubsector')});
          EducationSubsectorFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'educationSubsector')});
          TargetSchoolManagementTypeFunder2.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetSchoolManagementType')});

          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        OrgFormTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingActivity')});
        MainProgrammingArea2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingArea')});
        Region2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'region')});
        CountryOfOperation2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'country')});
        ProgrammingActivity2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'programmingActivity')});
        FundingSource2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'sourceOfFunding')});
        LaunchCountry2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'launchCountry')});
        MonitoredOutcome2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'monitoredOutcome')});
        TargetGeography2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetGeography')});
        TargetPopulationSector2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetPopulationSector')});
        MainEducationSubsector2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainEducationSubsector')});
        EducationSubsector2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'educationSubsector')});
        TargetSchoolManagementType2.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetSchoolManagementType')});
      });
      Relationship2.mainProgramActivity = MainProgrammingActivity2;
      Relationship2.mainProgramArea = MainProgrammingArea2;
      Relationship2.region = Region2;
      Relationship2.countryOfOperation = CountryOfOperation2;
      Relationship2.programmingActivity = ProgrammingActivity2;
      Relationship2.sourceOfFunding = FundingSource2;
      Relationship2.launchCountry = LaunchCountry2;
      Relationship2.monitoredOutcome = MonitoredOutcome2;
      Relationship2.targetGeography = TargetGeography2;
      Relationship2.targetPopulationSector = TargetPopulationSector2;
      Relationship2.mainEducationSubsector = MainEducationSubsector2;
      Relationship2.educationSubsector = EducationSubsector2;
      Relationship2.targetSchoolManagementType = TargetSchoolManagementType2;

      RelationshipFunder2.mainProgramActivity = MainProgrammingActivityFunder2;
      RelationshipFunder2.mainProgramArea = MainProgrammingAreaFunder2;
      RelationshipFunder2.region = RegionFunder2;
      RelationshipFunder2.countryOfOperation = CountryOfOperationFunder2;
      RelationshipFunder2.programmingActivity = ProgrammingActivityFunder2;
      RelationshipFunder2.sourceOfFunding = FundingSourceFunder2;
      RelationshipFunder2.launchCountry = LaunchCountryFunder2;
      RelationshipFunder2.monitoredOutcome = MonitoredOutcomeFunder2;
      RelationshipFunder2.targetGeography = TargetGeographyFunder2;
      RelationshipFunder2.targetPopulationSector = TargetPopulationSectorFunder2;
      RelationshipFunder2.mainEducationSubsector = MainEducationSubsectorFunder2;
      RelationshipFunder2.educationSubsector = EducationSubsectorFunder2;
      RelationshipFunder2.targetSchoolManagementType = TargetSchoolManagementTypeFunder2;

      //ATTRIBUTE 3 - IMPACT INVESTING
      const ImpactInvestingTargetFunder = [];

      const Relationship3 = {};
      const MainProgrammingActivity3 = [];
      const MainProgrammingArea3 = [];
      const Region3 = [];
      const CountryOfOperation3 = [];
      const ProgrammingActivity3 = [];
      const FundingSource3 = [];
      const LaunchCountry3 = [];
      const MonitoredOutcome3 = [];
      const TargetGeography3 = [];
      const TargetPopulationSector3 = [];
      const MainEducationSubsector3 = [];
      const EducationSubsector3 = [];
      const TargetSchoolManagementType3 = [];

      const RelationshipFunder3 = {};
      const MainProgrammingActivityFunder3 = [];
      const MainProgrammingAreaFunder3 = [];
      const RegionFunder3 = [];
      const CountryOfOperationFunder3 = [];
      const ProgrammingActivityFunder3 = [];
      const FundingSourceFunder3 = [];
      const LaunchCountryFunder3 = [];
      const MonitoredOutcomeFunder3 = [];
      const TargetGeographyFunder3 = [];
      const TargetPopulationSectorFunder3 = [];
      const MainEducationSubsectorFunder3 = [];
      const EducationSubsectorFunder3 = [];
      const TargetSchoolManagementTypeFunder3 = [];

      const fundersByImpactInvesting = fundersPerFunderAttrType(response, 'impactInvesting');
      fundersByImpactInvesting.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingActivity')});
          MainProgrammingAreaFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingArea')});
          RegionFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'region')});
          CountryOfOperationFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'country')});
          ProgrammingActivityFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'programmingActivity')});
          FundingSourceFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'sourceOfFunding')});
          LaunchCountryFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'launchCountry')});
          MonitoredOutcomeFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'monitoredOutcome')});
          TargetGeographyFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetGeography')});
          TargetPopulationSectorFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetPopulationSector')});
          MainEducationSubsectorFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainEducationSubsector')});
          EducationSubsectorFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'educationSubsector')});
          TargetSchoolManagementTypeFunder3.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetSchoolManagementType')});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        ImpactInvestingTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingActivity')});
        MainProgrammingArea3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingArea')});
        Region3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'region')});
        CountryOfOperation3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'country')});
        ProgrammingActivity3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'programmingActivity')});
        FundingSource3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'sourceOfFunding')});
        LaunchCountry3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'launchCountry')});
        MonitoredOutcome3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'monitoredOutcome')});
        TargetGeography3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetGeography')});
        TargetPopulationSector3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetPopulationSector')});
        MainEducationSubsector3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainEducationSubsector')});
        EducationSubsector3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'educationSubsector')});
        TargetSchoolManagementType3.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetSchoolManagementType')});
      });
      Relationship3.mainProgramActivity = MainProgrammingActivity3;
      Relationship3.mainProgramArea = MainProgrammingArea3;
      Relationship3.region = Region3;
      Relationship3.countryOfOperation = CountryOfOperation3;
      Relationship3.programmingActivity = ProgrammingActivity3;
      Relationship3.sourceOfFunding = FundingSource3;
      Relationship3.launchCountry = LaunchCountry3;
      Relationship3.monitoredOutcome = MonitoredOutcome3;
      Relationship3.targetGeography = TargetGeography3;
      Relationship3.targetPopulationSector = TargetPopulationSector3;
      Relationship3.mainEducationSubsector = MainEducationSubsector3;
      Relationship3.educationSubsector = EducationSubsector3;
      Relationship3.targetSchoolManagementType = TargetSchoolManagementType3;

      RelationshipFunder3.mainProgramActivity = MainProgrammingActivityFunder3;
      RelationshipFunder3.mainProgramArea = MainProgrammingAreaFunder3;
      RelationshipFunder3.region = RegionFunder3;
      RelationshipFunder3.countryOfOperation = CountryOfOperationFunder3;
      RelationshipFunder3.programmingActivity = ProgrammingActivityFunder3;
      RelationshipFunder3.sourceOfFunding = FundingSourceFunder3;
      RelationshipFunder3.launchCountry = LaunchCountryFunder3;
      RelationshipFunder3.monitoredOutcome = MonitoredOutcomeFunder3;
      RelationshipFunder3.targetGeography = TargetGeographyFunder3;
      RelationshipFunder3.targetPopulationSector = TargetPopulationSectorFunder3;
      RelationshipFunder3.mainEducationSubsector = MainEducationSubsectorFunder3;
      RelationshipFunder3.educationSubsector = EducationSubsectorFunder3;
      RelationshipFunder3.targetSchoolManagementType = TargetSchoolManagementTypeFunder3;

      //ATTRIBUTE 4 - EDUCATION SUBSECTORS
      const EduSubsectorsTargetFunder = [];

      const Relationship4 = {};
      const MainProgrammingActivity4 = [];
      const MainProgrammingArea4 = [];
      const Region4 = [];
      const CountryOfOperation4 = [];
      const ProgrammingActivity4 = [];
      const FundingSource4 = [];
      const LaunchCountry4 = [];
      const MonitoredOutcome4 = [];
      const TargetGeography4 = [];
      const TargetPopulationSector4 = [];
      const MainEducationSubsector4 = [];
      const EducationSubsector4 = [];
      const TargetSchoolManagementType4 = [];

      const RelationshipFunder4 = {};
      const MainProgrammingActivityFunder4 = [];
      const MainProgrammingAreaFunder4 = [];
      const RegionFunder4 = [];
      const CountryOfOperationFunder4 = [];
      const ProgrammingActivityFunder4 = [];
      const FundingSourceFunder4 = [];
      const LaunchCountryFunder4 = [];
      const MonitoredOutcomeFunder4 = [];
      const TargetGeographyFunder4 = [];
      const TargetPopulationSectorFunder4 = [];
      const MainEducationSubsectorFunder4 = [];
      const EducationSubsectorFunder4 = [];
      const TargetSchoolManagementTypeFunder4 = [];

      const fundersByEduSubsector = fundersPerFunderAttrType(response, 'educationSubsector');
      fundersByEduSubsector.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingActivity')});
          MainProgrammingAreaFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingArea')});
          RegionFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'region')});
          CountryOfOperationFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'country')});
          ProgrammingActivityFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'programmingActivity')});
          FundingSourceFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'sourceOfFunding')});
          LaunchCountryFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'launchCountry')});
          MonitoredOutcomeFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'monitoredOutcome')});
          TargetGeographyFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetGeography')});
          TargetPopulationSectorFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetPopulationSector')});
          MainEducationSubsectorFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainEducationSubsector')});
          EducationSubsectorFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'educationSubsector')});
          TargetSchoolManagementTypeFunder4.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetSchoolManagementType')});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        EduSubsectorsTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingActivity')});
        MainProgrammingArea4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingArea')});
        Region4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'region')});
        CountryOfOperation4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'country')});
        ProgrammingActivity4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'programmingActivity')});
        FundingSource4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'sourceOfFunding')});
        LaunchCountry4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'launchCountry')});
        MonitoredOutcome4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'monitoredOutcome')});
        TargetGeography4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetGeography')});
        TargetPopulationSector4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetPopulationSector')});
        MainEducationSubsector4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainEducationSubsector')});
        EducationSubsector4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'educationSubsector')});
        TargetSchoolManagementType4.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetSchoolManagementType')});
      });
      Relationship4.mainProgramActivity = MainProgrammingActivity4;
      Relationship4.mainProgramArea = MainProgrammingArea4;
      Relationship4.region = Region4;
      Relationship4.countryOfOperation = CountryOfOperation4;
      Relationship4.programmingActivity = ProgrammingActivity4;
      Relationship4.sourceOfFunding = FundingSource4;
      Relationship4.launchCountry = LaunchCountry4;
      Relationship4.monitoredOutcome = MonitoredOutcome4;
      Relationship4.targetGeography = TargetGeography4;
      Relationship4.targetPopulationSector = TargetPopulationSector4;
      Relationship4.mainEducationSubsector = MainEducationSubsector4;
      Relationship4.educationSubsector = EducationSubsector4;
      Relationship4.targetSchoolManagementType = TargetSchoolManagementType4;

      RelationshipFunder4.mainProgramActivity = MainProgrammingActivityFunder4;
      RelationshipFunder4.mainProgramArea = MainProgrammingAreaFunder4;
      RelationshipFunder4.region = RegionFunder4;
      RelationshipFunder4.countryOfOperation = CountryOfOperationFunder4;
      RelationshipFunder4.programmingActivity = ProgrammingActivityFunder4;
      RelationshipFunder4.sourceOfFunding = FundingSourceFunder4;
      RelationshipFunder4.launchCountry = LaunchCountryFunder4;
      RelationshipFunder4.monitoredOutcome = MonitoredOutcomeFunder4;
      RelationshipFunder4.targetGeography = TargetGeographyFunder4;
      RelationshipFunder4.targetPopulationSector = TargetPopulationSectorFunder4;
      RelationshipFunder4.mainEducationSubsector = MainEducationSubsectorFunder4;
      RelationshipFunder4.educationSubsector = EducationSubsectorFunder4;
      RelationshipFunder4.targetSchoolManagementType = TargetSchoolManagementTypeFunder4;

      //ATTRIBUTE 5 - BASE LOCATION
      const BaseLocationTargetFunder = [];

      const Relationship5 = {};
      const MainProgrammingActivity5 = [];
      const MainProgrammingArea5 = [];
      const Region5 = [];
      const CountryOfOperation5 = [];
      const ProgrammingActivity5 = [];
      const FundingSource5 = [];
      const LaunchCountry5 = [];
      const MonitoredOutcome5 = [];
      const TargetGeography5 = [];
      const TargetPopulationSector5 = [];
      const MainEducationSubsector5 = [];
      const EducationSubsector5 = [];
      const TargetSchoolManagementType5 = [];

      const RelationshipFunder5 = {};
      const MainProgrammingActivityFunder5 = [];
      const MainProgrammingAreaFunder5 = [];
      const RegionFunder5 = [];
      const CountryOfOperationFunder5 = [];
      const ProgrammingActivityFunder5 = [];
      const FundingSourceFunder5 = [];
      const LaunchCountryFunder5 = [];
      const MonitoredOutcomeFunder5 = [];
      const TargetGeographyFunder5 = [];
      const TargetPopulationSectorFunder5 = [];
      const MainEducationSubsectorFunder5 = [];
      const EducationSubsectorFunder5 = [];
      const TargetSchoolManagementTypeFunder5 = [];

      const fundersByBaseLocation = fundersPerFunderAttrType(response, 'baseLocation');
      fundersByBaseLocation.forEach(attrType => {
        const data = [];
        const dataFunderAttr = [];

        attrType.value.forEach(funder => {
          const initPerFunder = initativesPerFunder(response, funder);
          dataFunderAttr.push(initPerFunder);
          MainProgrammingActivityFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingActivity')});
          MainProgrammingAreaFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainProgrammingArea')});
          RegionFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'region')});
          CountryOfOperationFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'country')});
          ProgrammingActivityFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'programmingActivity')});
          FundingSourceFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'sourceOfFunding')});
          LaunchCountryFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'launchCountry')});
          MonitoredOutcomeFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'monitoredOutcome')});
          TargetGeographyFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetGeography')});
          TargetPopulationSectorFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetPopulationSector')});
          MainEducationSubsectorFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'mainEducationSubsector')});
          EducationSubsectorFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'educationSubsector')});
          TargetSchoolManagementTypeFunder5.push({id: funder, data: initiativeEntityByFunderAttr(initPerFunder, response, 'targetSchoolManagementType')});
          var numInitativesFunded = initPerFunder.length;

          if (numInitativesFunded !== 0) {
            data.push({name: funder, value: numInitativesFunded});
          }
        });
        BaseLocationTargetFunder.push({id: attrType.name, data: data});
        MainProgrammingActivity5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingActivity')});
        MainProgrammingArea5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainProgrammingArea')});
        Region5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'region')});
        CountryOfOperation5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'country')});
        ProgrammingActivity5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'programmingActivity')});
        FundingSource5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'sourceOfFunding')});
        LaunchCountry5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'launchCountry')});
        MonitoredOutcome5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'monitoredOutcome')});
        TargetGeography5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetGeography')});
        TargetPopulationSector5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetPopulationSector')});
        MainEducationSubsector5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'mainEducationSubsector')});
        EducationSubsector5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'educationSubsector')});
        TargetSchoolManagementType5.push({ id: attrType.name, data: initiativesByFunderAttr(dataFunderAttr, response, 'targetSchoolManagementType')});
      });
      Relationship5.mainProgramActivity = MainProgrammingActivity5;
      Relationship5.mainProgramArea = MainProgrammingArea5;
      Relationship5.region = Region5;
      Relationship5.countryOfOperation = CountryOfOperation5;
      Relationship5.programmingActivity = ProgrammingActivity5;
      Relationship5.sourceOfFunding = FundingSource5;
      Relationship5.launchCountry = LaunchCountry5;
      Relationship5.monitoredOutcome = MonitoredOutcome5;
      Relationship5.targetGeography = TargetGeography5;
      Relationship5.targetPopulationSector = TargetPopulationSector5;
      Relationship5.mainEducationSubsector = MainEducationSubsector5;
      Relationship5.educationSubsector = EducationSubsector5;
      Relationship5.targetSchoolManagementType = TargetSchoolManagementType5;

      RelationshipFunder5.mainProgramActivity = MainProgrammingActivityFunder5;
      RelationshipFunder5.mainProgramArea = MainProgrammingAreaFunder5;
      RelationshipFunder5.region = RegionFunder5;
      RelationshipFunder5.countryOfOperation = CountryOfOperationFunder5;
      RelationshipFunder5.programmingActivity = ProgrammingActivityFunder5;
      RelationshipFunder5.sourceOfFunding = FundingSourceFunder5;
      RelationshipFunder5.launchCountry = LaunchCountryFunder5;
      RelationshipFunder5.monitoredOutcome = MonitoredOutcomeFunder5;
      RelationshipFunder5.targetGeography = TargetGeographyFunder5;
      RelationshipFunder5.targetPopulationSector = TargetPopulationSectorFunder5;
      RelationshipFunder5.mainEducationSubsector = MainEducationSubsectorFunder5;
      RelationshipFunder5.educationSubsector = EducationSubsectorFunder5;
      RelationshipFunder5.targetSchoolManagementType = TargetSchoolManagementTypeFunder5;


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
const implementersPerImpAttrType = (response) => {
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

const initiativesImpTypeByInitAttr = (d, response, attribute) => {
  const data = [];
  const arr = attribute == 'region' ? response.data.table4 : (
  attribute == 'country' ? response.data.table5 : (
      attribute == 'programmingActivity' ? response.data.table6 : (
          attribute == 'sourceOfFunding' ? response.data.table7 : (
            attribute == 'launchCountry' ? response.data.table8 : (
              attribute == 'targetGeography' ? response.data.table9 : (
                  attribute == 'targetPopulationSector' ? response.data.table10 : (
                      attribute == 'monitoredOutcome' ? response.data.table11 : (
                          attribute == 'mainEducationSubsector' ? response.data.table12 : (
                              attribute == 'educationSubsector' ? response.data.table13 : (
                                attribute == 'targetSchoolManagementType' ? response.data.table14 : (
                                  (attribute == 'mainProgrammingActivity' || attribute == 'mainProgrammingArea') ? response.data.table3 : null
                                )
                              )
                          )
                      )
                  )
              )
          )
      )
  )));
  d.forEach(initiatives => {
    initiatives.forEach(init => {
      if (arr) {
        //Check if init is in the database first
        let object;
        if (attribute == 'educationSubsector'){
          object = arr.find(obj => {return init.initiative == obj.initiativeTagNumber});
        } else {
          object = arr.find(obj => {return init.initiative == obj.tagNumber});
        }
        if (object !== undefined) {
           const name = attribute == 'region' ? object.region : (
           attribute == 'country' ? object.country : (
               attribute == 'programmingActivity' ? object.programmingActivity : (
                   attribute == 'sourceOfFunding' ? object.sourceOfFunding : (
                       attribute == 'targetGeography' ? object.targetGeography : (
                           attribute == 'targetPopulationSector' ? object.targetPopulationSector : (
                               attribute == 'monitoredOutcome' ? object.monitoredOutcome : (
                                   attribute == 'mainEducationSubsector' ? object.mainEducationSubsector : (
                                       attribute == 'launchCountry' ? object.launchCountry : (
                                         attribute == 'educationSubsector' ? object.educationSubsector : (
                                             attribute == 'targetSchoolManagementType' ? object.targetSchoolManagementType : (
                                               attribute == 'mainProgrammingActivity' ? object.mainProgrammingActivity : (
                                                 attribute == 'mainProgrammingArea' ? object.mainProgrammingArea : null
                                               )
                                             )
                                         )
                                       )
                                   )
                               )
                           )
                       )
                   )
               )
           ));
           //Then check if the database value is already in the data array
           let objectFromData = data.find(obj => {return name == obj.name});

           if (objectFromData !== undefined) {
             objectFromData.value++;
           }
           else {
             data.push({name: name, value: 1})
           }
        }
      }
    });
  });
  return data
}

const initiativesImpByInitAttr = (d, response, attribute) => {
  const data = [];
  const arr = attribute == 'region' ? response.data.table4 : (
  attribute == 'country' ? response.data.table5 : (
      attribute == 'programmingActivity' ? response.data.table6 : (
          attribute == 'sourceOfFunding' ? response.data.table7 : (
            attribute == 'launchCountry' ? response.data.table8 : (
              attribute == 'targetGeography' ? response.data.table9 : (
                  attribute == 'targetPopulationSector' ? response.data.table10 : (
                      attribute == 'monitoredOutcome' ? response.data.table11 : (
                          attribute == 'mainEducationSubsector' ? response.data.table12 : (
                              attribute == 'educationSubsector' ? response.data.table13 : (
                                attribute == 'targetSchoolManagementType' ? response.data.table14 : (
                                  (attribute == 'mainProgrammingActivity' || attribute == 'mainProgrammingArea') ? response.data.table3 : null
                                )
                              )
                          )
                      )
                  )
              )
          )
      )
  )));
  d.forEach(init => {
    if (arr) {
      //Check if init is in the database first
      let object;
      if (attribute == 'educationSubsector'){
        object = arr.find(obj => {return init.initiative == obj.initiativeTagNumber});
      } else {
        object = arr.find(obj => {return init.initiative == obj.tagNumber});
      }
      if (object !== undefined) {
        const name = attribute == 'region' ? object.region : (
        attribute == 'country' ? object.country : (
            attribute == 'programmingActivity' ? object.programmingActivity : (
                attribute == 'sourceOfFunding' ? object.sourceOfFunding : (
                    attribute == 'targetGeography' ? object.targetGeography : (
                        attribute == 'targetPopulationSector' ? object.targetPopulationSector : (
                            attribute == 'monitoredOutcome' ? object.monitoredOutcome : (
                                attribute == 'mainEducationSubsector' ? object.mainEducationSubsector : (
                                    attribute == 'launchCountry' ? object.launchCountry : (
                                      attribute == 'educationSubsector' ? object.educationSubsector : (
                                          attribute == 'targetSchoolManagementType' ? object.targetSchoolManagementType : (
                                            attribute == 'mainProgrammingActivity' ? object.mainProgrammingActivity : (
                                              attribute == 'mainProgrammingArea' ? object.mainProgrammingArea : null
                                            )
                                          )
                                      )
                                    )
                                )
                            )
                        )
                    )
                )
            )
         ));
         //Then check if the database value is already in the data array
         var objectFromData = data.find(obj => {return name == obj.name});

         if (objectFromData !== undefined) {
           objectFromData.value++;
         }
         else {
           data.push({name: name, value: 1})
         }
      }
    }
  });
  return data
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
      const MainProgrammingArea1 = [];
      const Region1 = [];
      const CountryOfOperation1 = [];
      const ProgrammingActivity1 = [];
      const FundingSource1 = [];
      const LaunchCountry1 = [];
      const MonitoredOutcome1 = [];
      const TargetGeography1 = [];
      const TargetPopulationSector1 = [];
      const MainEducationSubsector1 = [];
      const EducationSubsector1 = [];
      const TargetSchoolManagementType1 = [];

      const RelationshipImplementer1 = {};
      const MainProgrammingActivityImplementer1 = [];
      const MainProgrammingAreaImplementer1 = [];
      const RegionImplementer1 = [];
      const CountryOfOperationImplementer1 = [];
      const ProgrammingActivityImplementer1 = [];
      const FundingSourceImplementer1 = [];
      const LaunchCountryImplementer1 = [];
      const MonitoredOutcomeImplementer1 = [];
      const TargetGeographyImplementer1 = [];
      const TargetPopulationSectorImplementer1 = [];
      const MainEducationSubsectorImplementer1 = [];
      const EducationSubsectorImplementer1 = [];
      const TargetSchoolManagementTypeImplementer1 = [];

      const implementersByProfitMotive = implementersPerImpAttrType(response);
      implementersByProfitMotive.forEach(attrType => {
        const data = [];
        const dataImplementerAttr = [];

        attrType.value.forEach(implementer => {
          const initPerImplementer = initativesPerImplementer(response, implementer);
          dataImplementerAttr.push(initPerImplementer);
          MainProgrammingActivityImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'mainProgrammingActivity')});
          MainProgrammingAreaImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'mainProgrammingArea')});
          RegionImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'region')});
          CountryOfOperationImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'country')});
          ProgrammingActivityImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'programmingActivity')});
          FundingSourceImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'sourceOfFunding')});
          LaunchCountryImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'launchCountry')});
          MonitoredOutcomeImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'monitoredOutcome')});
          TargetGeographyImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'targetGeography')});
          TargetPopulationSectorImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'targetPopulationSector')});
          MainEducationSubsectorImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'mainEducationSubsector')});
          EducationSubsectorImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'educationSubsector')});
          TargetSchoolManagementTypeImplementer1.push({id: implementer, data: initiativesImpByInitAttr(initPerImplementer, response, 'targetSchoolManagementType')});

          var numInitativesImplemented = initPerImplementer.length;
          if (numInitativesImplemented !== 0) {
            data.push({name: implementer, value: numInitativesImplemented});
          }
        });
        ProfitMotiveImplementer.push({id: attrType.name, data: data});
        MainProgrammingActivity1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'mainProgrammingActivity')});
        MainProgrammingArea1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'mainProgrammingArea')});
        Region1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'region')});
        CountryOfOperation1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'country')});
        ProgrammingActivity1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'programmingActivity')});
        FundingSource1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'sourceOfFunding')});
        LaunchCountry1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'launchCountry')});
        MonitoredOutcome1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'monitoredOutcome')});
        TargetGeography1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'targetGeography')});
        TargetPopulationSector1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'targetPopulationSector')});
        MainEducationSubsector1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'mainEducationSubsector')});
        EducationSubsector1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'educationSubsector')});
        TargetSchoolManagementType1.push({ id: attrType.name, data: initiativesImpTypeByInitAttr(dataImplementerAttr, response, 'targetSchoolManagementType')});
      });
      Relationship1.mainProgramActivity = MainProgrammingActivity1;
      Relationship1.mainProgramArea = MainProgrammingArea1;
      Relationship1.region = Region1;
      Relationship1.countryOfOperation = CountryOfOperation1;
      Relationship1.programmingActivity = ProgrammingActivity1;
      Relationship1.sourceOfFunding = FundingSource1;
      Relationship1.launchCountry = LaunchCountry1;
      Relationship1.monitoredOutcome = MonitoredOutcome1;
      Relationship1.targetGeography = TargetGeography1;
      Relationship1.targetPopulationSector = TargetPopulationSector1;
      Relationship1.mainEducationSubsector = MainEducationSubsector1;
      Relationship1.educationSubsector = EducationSubsector1;
      Relationship1.targetSchoolManagementType = TargetSchoolManagementType1;

      RelationshipImplementer1.mainProgramActivity = MainProgrammingActivityImplementer1;
      RelationshipImplementer1.mainProgramArea = MainProgrammingAreaImplementer1;
      RelationshipImplementer1.region = RegionImplementer1;
      RelationshipImplementer1.countryOfOperation = CountryOfOperationImplementer1;
      RelationshipImplementer1.programmingActivity = ProgrammingActivityImplementer1;
      RelationshipImplementer1.sourceOfFunding = FundingSourceImplementer1;
      RelationshipImplementer1.launchCountry = LaunchCountryImplementer1;
      RelationshipImplementer1.monitoredOutcome = MonitoredOutcomeImplementer1;
      RelationshipImplementer1.targetGeography = TargetGeographyImplementer1;
      RelationshipImplementer1.targetPopulationSector = TargetPopulationSectorImplementer1;
      RelationshipImplementer1.mainEducationSubsector = MainEducationSubsectorImplementer1;
      RelationshipImplementer1.educationSubsector = EducationSubsectorImplementer1;
      RelationshipImplementer1.targetSchoolManagementType = TargetSchoolManagementTypeImplementer1;

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

export const userSendEmail = (contents) => (dispatch) => {
  axios.post(`/contact/email`, {
  firstName: contents.firstName,
  lastName: contents.lastName,
  emailSubject: contents.emailSubject,
  organization: contents.organization,
  emailBody: contents.emailBody,
  senderEmail: contents.senderEmail
  })
  .then(response => {
    console.log("Emailed");
  })
}
