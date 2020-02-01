export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

const initState = {
  auth: false,
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        auth: true,
        authError: null
      };
    case REGISTER_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        auth: false,
        authError: action.payload
      };
    default:
     return state;
   }
 }

 export default authReducer;
