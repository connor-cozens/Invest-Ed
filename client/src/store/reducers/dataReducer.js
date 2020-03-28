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
export const CLEAR_ACCESS_ERROR = 'CLEAR_ACCESS_ERROR';
export const ACCESS_ERROR = 'ACCESS_ERROR';
export const CLEAR_FORM_STATUS = 'CLEAR_FORM_STATUS';

const initState = {
  userInformation: null,
  form: null,
  formStatus: null,
  pulledformApproved: false,
  registered: false,
  registerError: null,
  accessError: null
}

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registered: true,
        registerError: null
      };
    //If sign out occurs during registration process
      case REGISTER_CLEAR:
        // console.log('am i clear');
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
        registered: false,
        registerError: null,
        accessError: null
      };
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
        form: action.payload,
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
        formStatus: null,
        pulledformApproved: false
      };

    case ACCESS_ERROR:
      return {
        ...state,
        accessError: action.payload
      };

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
