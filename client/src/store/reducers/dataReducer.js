export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_CLEAR = 'REGISTER_CLEAR';
export const REGISTER_CLEAR_ERROR = 'REGISTER_CLEAR_ERROR';
export const REGISTER_ERROR = 'REGISTER_ERROR';

const initState = {
  registered: false,
  registerError: null
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
    default:
     return state;
   }
 }

 export default dataReducer;
