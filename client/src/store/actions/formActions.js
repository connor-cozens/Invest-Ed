import axios from "../../axios/axiosConfig";
import { CLEAR_FORM_STATUS, SET_ADD_FORM, CLEAR_SET_FORM_ERROR, SET_FORM_ERROR, SET_MODIFY_FORM, SET_REVIEW_FORM, NOT_PULLED_APPROVED_FORM, SET_VIEW_FORM, FORM_SUBMIT_ERROR, FORM_SUBMIT_SUCCESS, FORM_REVIEW_ERROR, FORM_REVIEW_SUCCESS, FORM_SUBMIT_CLEAR, FORM_REVIEW_CLEAR } from "../reducers/dataReducer";

//FORM ACTIONS


export const clearFormStatus = () => (dispatch) => {
    dispatch({ type: CLEAR_FORM_STATUS });
};

export const setNewFormStatus = () => (dispatch) => {
    dispatch({ type: SET_ADD_FORM });
    dispatch({ type: CLEAR_SET_FORM_ERROR });
};

export const clearFormRetrievalError = () => (dispatch) => {
    dispatch({ type: CLEAR_SET_FORM_ERROR });
};
const readForm = (response => {
    let initiativeRegions = [];
    response.data.table2.forEach((item) => { initiativeRegions.push(item.region); });

    let initiativeCountries = []; //Countries of Operation
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
                    return funder.funderName === indivFunder[0][0].funderName;
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
                                    funderObj[key].push(attribute[key]);
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
        mainProgrammingArea: response.data.table1[0].mainProgrammingArea !== null ? response.data.table1[0].mainProgrammingArea : '',
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
});
//Get approved forms from main DB

export const getApprovedForm = (tag, getType) => (dispatch) => {
    const tagNum = tag;
    const url = `/dashboard/form/${tagNum}`;

    axios.get(url, { withCredentials: true, accepts: "application/json" }, { tagNum })
        .then(response => {
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: SET_FORM_ERROR, payload: { errorMessage: "There was an issue retrieving this form.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: SET_FORM_ERROR, payload: response.data.error.message });
                }
            }
            else {
                const initiative = readForm(response);
                //Dispatch action to store form data in store
                if (getType === 'modify') {
                    dispatch({ type: SET_MODIFY_FORM, payload: initiative });
                }
                else if (getType === 'review') {
                    dispatch({ type: SET_REVIEW_FORM, payload: initiative });
                }
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: SET_FORM_ERROR, payload: err.message });
            } else {
                dispatch({ type: SET_FORM_ERROR, payload: err });
            }
        });
};
//Get non-approved forms from temp DB for organization/RA user to modify

export const getNonApprovedForm = (tag, getType) => (dispatch) => {
    const tagNum = tag;
    const url = `/dashboard/form-temp/${tagNum}`;

    axios.get(url, { withCredentials: true, accepts: "application/json" }, { tagNum })
        .then(response => {
            if (response.data.error !== undefined) {
                dispatch({ type: NOT_PULLED_APPROVED_FORM });

                //If user doesn't have edit access rights to the form, set form to view only (readOnly)
                if (response.data.error.message.unauthorizedEdit !== undefined) {
                    dispatch({ type: SET_VIEW_FORM, payload: response.data.error.message.unauthorizedEdit });
                }
                //If couldn't find form in temp db or user doesnt have edit access rights to form in temp db, then check for form in main db
                dispatch(getApprovedForm(tag, getType));
            }
            else {
                const initiative = readForm(response);
                //Dispatch action to store form data in store
                if (getType === 'modify') {
                    dispatch({ type: SET_MODIFY_FORM, payload: initiative });
                }
                else if (getType === 'review') {
                    dispatch({ type: SET_REVIEW_FORM, payload: initiative });
                }
            }
        })
        .catch(err => {
            dispatch({ type: NOT_PULLED_APPROVED_FORM });
            //If couldn't find form in temp db, then check for form in main db
            dispatch(getApprovedForm(tag, getType));
        });
};
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
    };

    if (isModified) {
        reqBody.tagNum = form.tagNum;
        reqBody.ofname = form.originalFunderName;
        reqBody.oiname = form.originalImplementerName;
    }

    return reqBody;
};
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
    };

    if (isModified) {
        reqBody.tagNum = form.tagNum;
        reqBody.ofname = form.originalFunderName;
        reqBody.oiname = form.originalImplementerName;
    }

    return reqBody;
};
//Organization user to modify existing form from either main or temp DB (could be in main DB since might have been approved) and submit it to temp db

export const modifyForm = (form, inDB, isModified) => (dispatch) => {
    const req = changeRequest(form, inDB, isModified, false);
    axios.post(`/dashboard/update-form-temp`, req, { withCredentials: true })
        .then(response => {
            //If error occured on server
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: { errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: response.data.error.message });
                }

            } else {
                if (response.data.tagNum !== undefined) {
                    dispatch({ type: FORM_SUBMIT_SUCCESS, payload: { tagNumber: response.data.tagNum } });
                } else {
                    dispatch({ type: FORM_SUBMIT_SUCCESS, payload: { tagNumber: "Tag number could not be retrieved successfully" } });
                }
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err.message });
            } else {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err });
            }
        });
};
//RA user to modify existing form in main DB

export const modifyFormRA = (form, inDB, isModified) => (dispatch) => {
    const req = changeRequestRA(form, isModified);
    axios.post(`/dashboard/update-form`, req, { withCredentials: true })
        .then(response => {
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: { errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: response.data.error.message });
                }

            } else {
                dispatch(modifyForm(form, inDB, true));
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err.message });
            } else {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err });
            }
        });
};
//RA user to submit approved form to main db
const approveForm = (form, isModified) => (dispatch) => {
    const req = changeRequestRA(form, isModified);
    axios.post(`/dashboard/update-form`, req, { withCredentials: true })
        .then(response => {
            //If error occured on server
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: FORM_REVIEW_ERROR, payload: { errorMessage: "There was an issue submitting this form review.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: FORM_REVIEW_ERROR, payload: response.data.error.message });
                }

            } else {
                dispatch({ type: FORM_REVIEW_SUCCESS });
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: FORM_REVIEW_ERROR, payload: err.message });
            } else {
                dispatch({ type: FORM_REVIEW_ERROR, payload: err });
            }
        });
};
//RA user to submit review of form to temp db

export const reviewForm = (form, inDB, isModified) => (dispatch) => {
    const req = changeRequest(form, inDB, isModified, true);
    axios.post(`/dashboard/update-form-temp`, req, { withCredentials: true })
        .then(response => {
            //If error occured on server
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: FORM_REVIEW_ERROR, payload: { errorMessage: "There was an issue submitting this form review.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: FORM_REVIEW_ERROR, payload: response.data.error.message });
                }

            } else {
                //If form is approved, then submit approval
                if (form.needsReview === 0) {
                    dispatch(approveForm(form, true));
                } else {
                    dispatch({ type: FORM_REVIEW_SUCCESS });
                }
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: FORM_REVIEW_ERROR, payload: err.message });
            } else {
                dispatch({ type: FORM_REVIEW_ERROR, payload: err });
            }
        });
};
//Organization user to add new form to temp DB


export const addForm = (form, inDB, isModified) => (dispatch) => {
    const req = changeRequest(form, inDB, isModified, false);
    axios.post(`/dashboard/submit-form-temp`, req, { withCredentials: true })
        .then(response => {
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: { errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: response.data.error.message });
                }

                //Retrieve tagNumber of attempted submission, in order to send updated form after error on initial new form submission
                if (response.data.error.tagNum !== undefined) {
                    dispatch({ type: SET_MODIFY_FORM, payload: { tagNumber: parseInt(response.data.error.tagNum) } });
                }

            } else {
                if (response.data.tagNum !== undefined) {
                    dispatch({ type: FORM_SUBMIT_SUCCESS, payload: { tagNumber: response.data.tagNum } });
                } else {
                    dispatch({ type: FORM_SUBMIT_SUCCESS, payload: { tagNumber: "Tag number could not be retrieved successfully" } });
                }
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err.message });
            } else {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err });
            }
        });
};
//RA user to add new form to main DB

export const addFormRA = (form, isModified) => (dispatch) => {
    const req = changeRequestRA(form, isModified);
    axios.post(`/dashboard/submitform`, req, { withCredentials: true })
        .then(response => {
            //If error occured on server
            if (response.data.error !== undefined) {
                //If error was from attempted sql query
                if (response.data.error.message.sqlMessage !== undefined) {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: { errorMessage: "There was an issue submitting this form. Please review all fields and make sure they are accurate.", errorSpecs: "Error specifications: " + response.data.error.message.sqlMessage } });
                } else {
                    dispatch({ type: FORM_SUBMIT_ERROR, payload: response.data.error.message });
                }

                //Retrieve tagNumber of attempted submission, in order to send updated form after error on initial new form submission
                if (response.data.error.tagNum !== undefined) {
                    dispatch({ type: SET_MODIFY_FORM, payload: { tagNumber: parseInt(response.data.error.tagNum) } });
                }

            } else {
                if (response.data.tagNum !== undefined) {
                    dispatch({ type: FORM_SUBMIT_SUCCESS, payload: { tagNumber: response.data.tagNum } });
                } else {
                    dispatch({ type: FORM_SUBMIT_SUCCESS, payload: { tagNumber: "Tag number could not be retrieved successfully" } });
                }
            }
        })
        .catch(err => {
            //If network error
            if (err.message !== undefined) {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err.message });
            } else {
                dispatch({ type: FORM_SUBMIT_ERROR, payload: err });
            }
        });
};

export const setFormSubmissionComplete = () => (dispatch) => {
    dispatch({ type: FORM_SUBMIT_CLEAR });
};

export const setFormReviewComplete = () => (dispatch) => {
    dispatch({ type: FORM_REVIEW_CLEAR });
};
