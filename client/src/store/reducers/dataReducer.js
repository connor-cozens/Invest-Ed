export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_CLEAR_ERROR = 'REGISTER_CLEAR_ERROR';
export const REGISTER_CLEAR = 'REGISTER_CLEAR';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER';

export const SET_REVIEW_FORM = 'SET_REVIEW_FORMS';
export const SET_ADD_FORM = 'SET_ADD_FORM';
export const SET_MODIFY_FORM = 'SET_MODIFY_FORM';
export const PULLED_APPROVED_FORM = 'PULLED_APPROVED_FORM';
export const NOT_PULLED_APPROVED_FORM = 'NOT_PULLED_APPROVED_FORM';
export const CLEAR_FORM_STATUS = 'CLEAR_FORM_STATUS';
export const FORM_SUBMIT_SUCCESS = 'FORM_SUBMIT_SUCCESS';
export const FORM_SUBMIT_ERROR = 'FORM_SUBMIT_ERROR';
export const FORM_SUBMIT_CLEAR = 'FORM_SUBMIT_CLEAR';

export const CLEAR_ACCESS_ERROR = 'CLEAR_ACCESS_ERROR';
export const ACCESS_ERROR = 'ACCESS_ERROR';

const initState = {
  //General user information
  userInformation: null,

  //On form retrieval
  form: null,
  formStatus: null,
  pulledformApproved: false,

  //On form submit
  formSubmitted: false,
  formSubmitError: null,

  //On form review
  formReviewed: false,
  formReviewError: null,

  //On register
  registered: false,
  registerError: null,
  accessError: null
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
        form: null,
        formStatus: null,
        pulledformApproved: false,
        formSubmitted: false,
        formSubmitError: null,
        formReviewed: false,
        formReviewError: null,
        registered: false,
        registerError: null,
        accessError: null
      };

    //FORM DISPATCH HANDLERS
    case SET_REVIEW_FORM:
      return {
        ...state,
        form: action.payload,
        formStatus: 'review',
      };
    case SET_MODIFY_FORM:
      return {
        ...state,
        form: action.payload,
        formStatus: 'modify'
      };
    case SET_ADD_FORM:
      return {
        ...state,
        formStatus: 'add'
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
        pulledformApproved: false
      };
    case FORM_SUBMIT_SUCCESS:
      return {
        ...state,
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


    //GENERAL ACCESS DISPATCH HANDLERS
    case ACCESS_ERROR:
      return {
        ...state,
        accessError: action.payload
      };
    //If error shouldnt appear anymore, then clear error from session state
    case CLEAR_ACCESS_ERROR:
      return {
        ...state,
        accessError: null
      };

    default:
     return state;
   }
 }

 export default dataReducer;
