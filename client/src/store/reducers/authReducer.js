export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

const initState = {
  auth: false,
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: true,
        authError: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        auth: false,
        authError: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        auth: false,
        authError: null
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        auth: false,
        authError: action.payload
      };

    //If auth error shouldn't appear anymore, clear error from session state
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
     return state;
   }
 }

 export default authReducer;
