//Registration
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_CLEAR_ERROR = 'REGISTER_CLEAR_ERROR';
export const REGISTER_CLEAR = 'REGISTER_CLEAR';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const CLEAR_REGISTER_ERROR = 'CLEAR_REGISTER_ERROR';

//User retrieval
export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER';
export const SET_USER_ERROR = 'SET_USER_ERROR';
export const CLEAR_SET_USER_ERROR = 'CLEAR_SET_USER_ERROR';

//Form retrieval
export const SET_REVIEW_FORM = 'SET_REVIEW_FORM';
export const SET_ADD_FORM = 'SET_ADD_FORM';
export const SET_MODIFY_FORM = 'SET_MODIFY_FORM';
export const SET_VIEW_FORM = 'SET_VIEW_FORM';  //For readOnly access to form

export const PULLED_APPROVED_FORM = 'PULLED_APPROVED_FORM';
export const NOT_PULLED_APPROVED_FORM = 'NOT_PULLED_APPROVED_FORM';
export const CLEAR_FORM_STATUS = 'CLEAR_FORM_STATUS';
export const SET_FORM_ERROR = 'SET_FORM_ERROR';
export const CLEAR_SET_FORM_ERROR = 'CLEAR_SET_FORM_ERROR';

//Form review and submission
export const FORM_SUBMIT_SUCCESS = 'FORM_SUBMIT_SUCCESS';
export const FORM_SUBMIT_ERROR = 'FORM_SUBMIT_ERROR';
export const FORM_SUBMIT_CLEAR = 'FORM_SUBMIT_CLEAR';
export const FORM_REVIEW_SUCCESS = 'FORM_REVIEW_SUCCESS';
export const FORM_REVIEW_ERROR = 'FORM_REVIEW_ERROR';
export const FORM_REVIEW_CLEAR = 'FORM_REVIEW_CLEAR';

//Data Visualization
export const SET_FUNDER_DATA = 'SET_FUNDER_DATA';
export const SET_IMPLEMENTER_DATA = 'SET_IMPLEMENTER_DATA';
export const SET_INITIATIVE_DATA = 'SET_INITIATIVE_DATA';
export const SET_FUNDER_ATTRIBUTES = 'SET_FUNDER_ATTRIBUTES';
export const SET_IMPLEMENTER_ATTRIBUTES = 'SET_IMPLEMENTER_ATTRIBUTES';
export const SET_FUNDERTYPE_INITIATIVE = 'SET_FUNDERTYPE_INITIATIVE';
export const SET_IMPLEMENTERTYPE_INITIATIVE = 'SET_IMPLEMENTERTYPE_INITIATIVE';
export const SET_FUNDER_INITIATIVE = 'SET_FUNDER_INITIATIVE';
export const SET_IMPLEMENTER_INITIATIVE = 'SET_IMPLEMENTER_INITIATIVE';
export const UNSET_VISUALIZED_DATA = 'UNSET_VISUALIZED_DATA';
export const SET_VISUALIZED_DATA_ERROR = 'SET_VISUALIZED_DATA_ERROR';
export const CLEAR_SET_VISUALIZED_DATA_ERROR = 'CLEAR_SET_VISUALIZED_DATA_ERROR';

const initState = {
  //General user information
  userInformation: null,
  userRetrievalError: null,

  //On form retrieval
  form: null,
  formStatus: null,
  pulledformApproved: false,
  formUnauthorizedEditError: null,
  formRetrievalError: null,

  //On form submit
  formSubmitted: false,
  formSubmitError: null,

  //On form review
  formReviewed: false,
  formReviewError: null,

  //On register
  registered: false,
  registerError: null,

  //Visualization data
  FunderData: null,
  ImplementerData: null,
  InititativeData: null,
  FunderAttributes: null,
  ImplementerAttributes: null,

  FunderTypeInitiative: null,
  ImplementerTypeInitiative: null,
  FunderInitiative: null,
  ImplementerInitiative: null,
  visDataRetrievalError: null
}

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    //REGISTER DISPATCH HANDLERS
    case REGISTER_SUCCESS:
      return {
        ...state,
        registered: true,
        registerError: null
      };
    case REGISTER_CLEAR:
      return {
        ...state,
        registered: false,
        registerError: null
      };
    case REGISTER_CLEAR_ERROR:
      return {
        ...state,
        registerError: action.payload
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registered: false,
        registerError: action.payload
      };
    //If register page has errors and its reloaded, clear register errors
    case CLEAR_REGISTER_ERROR:
      return {
        ...state,
        registerError: null
      }


    //USER INFO DISPATCH HANDLERS
    case SET_USER:
      return {
        ...state,
        userInformation: action.payload
      };
    case UNSET_USER:
      return {
        ...state,
        userInformation: null,
        userRetrievalError: null,
        form: null,
        formStatus: null,
        pulledformApproved: false,
        formRetrievalError: null,
        formUnauthorizedEditError: null,
        formSubmitted: false,
        formSubmitError: null,
        formReviewed: false,
        formReviewError: null,
        registered: false,
        registerError: null,
        FunderData: null,
        ImplementerData: null,
        InititativeData: null,
        FunderAttributes: null,
        ImplementerAttributes: null,
        FunderTypeInitiative: null,
        ImplementerTypeInitiative: null,
        FunderInitiative: null,
        ImplementerInitiative: null,
        visDataRetrievalError: null
      };
      case SET_USER_ERROR:
        return {
          ...state,
          userRetrievalError: action.payload
        };
      //If error shouldnt appear anymore, then clear error from session state
      case CLEAR_SET_USER_ERROR:
        return {
          ...state,
          userRetrievalError: null
        };


    //FORM DISPATCH HANDLERS
    case SET_REVIEW_FORM:
      return {
        ...state,
        form: action.payload,
        formStatus: 'review',
        pulledformApproved: action.payload.status !== undefined ? (action.payload.status.length > 0 ? (action.payload.status[0].length > 0 ? (action.payload.status[0][0].inDB !== undefined ? (action.payload.status[0][0].inDB === 1 ? true : false) : true) : true) : false) : false
      };
    case SET_MODIFY_FORM:
      return {
        ...state,
        form: action.payload,
        formStatus: 'modify',
        pulledformApproved: action.payload.status !== undefined ? (action.payload.status.length > 0 ? (action.payload.status[0].length > 0 ? (action.payload.status[0][0].inDB !== undefined ? (action.payload.status[0][0].inDB === 1 ? true : false) : true) : true) : true) : false
      };
    case SET_ADD_FORM:
      return {
        ...state,
        formStatus: 'add'
      };
    //If form is readOnly
    case SET_VIEW_FORM:
      return {
        ...state,
        formUnauthorizedEditError: action.payload
      };


    case PULLED_APPROVED_FORM:
      return {
        ...state,
        pulledformApproved: true
      };
    case NOT_PULLED_APPROVED_FORM:
      return {
        ...state,
        pulledformApproved: false
      };
    case CLEAR_FORM_STATUS:
      return {
        ...state,
        form: null,
        formStatus: null,
        pulledformApproved: false,
        formSubmitError: null,
        formReviewError: null,
        formRetrievalError: null,
        formUnauthorizedEditError: null
      };
    case SET_FORM_ERROR:
      return {
        ...state,
        formRetrievalError: action.payload
      };
    //If error shouldnt appear anymore, then clear error from session state
    case CLEAR_SET_FORM_ERROR:
      return {
        ...state,
        formRetrievalError: null
      };

    case FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        form: action.payload,
        formSubmitted: true,
        formSubmitError: null
      }
    case FORM_SUBMIT_CLEAR:
      return {
        ...state,
        formSubmitted: false,
        formSubmitError: null
      }
    case FORM_SUBMIT_ERROR:
      return {
        ...state,
        formSubmitted: false,
        formSubmitError: action.payload
      }
    case FORM_REVIEW_SUCCESS:
      return {
        ...state,
        formReviewed: true,
        formReviewError: null
      }
    case FORM_REVIEW_CLEAR:
      return {
        ...state,
        formReviewed: false,
        formReviewError: null
      }
    case FORM_REVIEW_ERROR:
      return {
        ...state,
        formReviewed: false,
        formReviewError: action.payload
      }


    //VISUALIZE DISPATCH HANDLERS
    case SET_FUNDER_DATA:
      return {
        ...state,
        FunderData: action.payload
      };
    case SET_IMPLEMENTER_DATA:
      return {
        ...state,
        ImplementerData: action.payload
      };
    case SET_INITIATIVE_DATA:
      return {
        ...state,
        InititativeData: action.payload
      };
    case SET_FUNDER_ATTRIBUTES:
      return {
        ...state,
        FunderAttributes: action.payload
      };
    case SET_IMPLEMENTER_ATTRIBUTES:
      return {
        ...state,
        ImplementerAttributes: action.payload
      };
    case SET_FUNDERTYPE_INITIATIVE:
      return {
        ...state,
        FunderTypeInitiative: action.payload
      };
    case SET_IMPLEMENTERTYPE_INITIATIVE:
      return {
        ...state,
        ImplementerTypeInitiative: action.payload
      };
    case SET_FUNDER_INITIATIVE:
      return {
        ...state,
        FunderInitiative: action.payload
      };
    case SET_IMPLEMENTER_INITIATIVE:
      return {
        ...state,
        ImplementerInitiative: action.payload
      };

    case UNSET_VISUALIZED_DATA:
      return {
        ...state,
        FunderData: null,
        ImplementerData: null,
        InititativeData: null,
        FunderAttributes: null,
        ImplementerAttributes: null,
        FunderTypeInitiative: null,
        ImplementerTypeInitiative: null,
        FunderInitiative: null,
        ImplementerInitiative: null
      };
    case SET_VISUALIZED_DATA_ERROR:
      return {
        ...state,
        visDataRetrievalError: action.payload
      };
    //If error shouldnt appear anymore, then clear error from session state
    case CLEAR_SET_VISUALIZED_DATA_ERROR:
      return {
        ...state,
        visDataRetrievalError: null
      };

    default:
     return state;
   }
 }

 export default dataReducer;
