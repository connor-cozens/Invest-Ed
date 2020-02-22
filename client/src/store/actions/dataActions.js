import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_CLEAR,
  REGISTER_CLEAR_ERROR
} from '../reducers/dataReducer';

export const registerUser = (user) => (dispatch) => {
  axios.post(`http://localhost:4000/register`, {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    organization: user.organization,
    accesslevel: user.accesslevel,
    password: user.password,
    confirmpassword: user.confirmpassword})
    .then(response => {
      // If there are validation errors
      if (response.data.err ==  true) {
        const errorList = response.data.errors;
        const errorMsgList = [];
        errorList.forEach(error => {
          errorMsgList.push(error.msg);
        });
        dispatch({type: REGISTER_ERROR, payload: errorMsgList});
      }

      // If there are no validation errors
      else {
        console.log("No register error");
        dispatch({type: REGISTER_SUCCESS});
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({type: REGISTER_ERROR, payload: err});
    })
}

export const setRegistrationComplete = () => (dispatch) => {
  try {
    dispatch({type: REGISTER_CLEAR});
  }
  catch(err) {
    console.log(err);
    dispatch({type: REGISTER_CLEAR_ERROR, payload: err});
  }
}
