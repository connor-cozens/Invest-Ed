import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_CLEAR,
  REGISTER_CLEAR_ERROR,
  SET_USER,
  ACCESS_ERROR
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

// const getData = ((array, key) => {
//   arr = []
//   array.forEach((item) => {
//     key
//   })
//   return arr;
// })


export const getReviewForms = (tag) => (dispatch) => {
    const tagNum = tag.tagNum;
    const url = `http://localhost:4000/dashboard-ra/form/${tagNum}`;
    axios.get(url, null, {tagNum})
      .then(response => {
        const initiativeRegions = [];
        response.data.table2.forEach((item) => { initiativeRegions.push(item.region); });

        const initiativeCountries = [];  //Countries of Operation
        response.data.table3.forEach((item) => { initiativeCountries.push(item.country); });

        const initiativeProgrammingActivities = [];
        response.data.table4.forEach((item) => { initiativeProgrammingActivities.push(item.programmingActivity); });

        const initiativeSourcesOfFunding = [];
        response.data.table5.forEach((item) => { initiativeSourcesOfFunding.push(item.sourceOfFunding); });

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

        const implementers = [];
        response.data.table13.forEach((implementer) => { implementers.push(implementer); });

        const funders = [];
        response.data.table14.forEach((funder) => { funders.push(funder); });

        const initiatives = [];
        const initiative = {
          name: response.data.table1[0].initiativeName,
          description: response.data.table1[0].description,
          website: response.data.table1[0].initiativeWebsite,
          startYear: response.data.table1[0].startYear,
          endYear: response.data.table1[0].endYear,
          mainProgrammingArea: response.data.table1[0].mainProgrammingArea,
          mainProgrammingActivity: response.data.table1[0].mainProgrammingActivity,
          targetsWomen: response.data.table1[0].startYear == 0 ? false : true,
          feeToAccess: response.data.table1[0].feeToAccess == 0 ? false: true,
          regions: initiativeRegions,
          countriesOfOperation: initiativeCountries,
          programmingActivities: initiativeProgrammingActivities,
          sourcesOfFunding: initiativeSourcesOfFunding,
          launchCountry: response.data.table6[0].launchCountry,
          targetGeographies: initiativeTargetGeographies,
          targetPopulationSectors: initiativeTargetPopulationSectors,
          monitoredOutcomes:initiativeMonitoredOutcomes,
          mainEducationSubsectors: initiativeMainEducationSubsectors,
          educationSubSectors: initiativeEducationSubsectors,
          targetSchoolManagementType: response.data.table12[0].targetSchoolManagementType,
          implementers: implementers,
          funders: funders
        }

        console.log(initiative);
        console.log(response.data.table14);
      })
      .catch(err =>  {
        console.log(err);
      })
}
