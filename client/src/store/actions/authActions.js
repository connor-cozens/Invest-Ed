import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../reducers/authReducer';

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
      dispatch({type: REGISTER_ERROR, payload: err})
    })
}

export const loginUser = (user) => (dispatch) => {
  axios.post(`http://localhost:4000/login`, {
    email: user.email,
    password: user.password})
    .then(response => {
      // If there are validation errors
      if (response.data.err ==  true) {
        const errorList = response.data.errors;
        const errorMsgList = [];
        errorList.forEach(error => {
          errorMsgList.push(error.msg);
        });
        dispatch({type: LOGIN_ERROR, payload: errorMsgList});
      }

      // If there are no validation errors
      else {
        console.log(response);
        dispatch({type: LOGIN_SUCCESS});
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({type: LOGIN_ERROR, payload: err})
    })
}

export const logoutUser = () => (dispatch) => {
    try {
      const deserializedState = localStorage.getItem('state');
      if (deserializedState !== null){
        const deserializedStateObj = JSON.parse(deserializedState);
        console.log(deserializedStateObj.authenticate.auth);
        if (deserializedStateObj.authenticate.auth){
          dispatch({type: LOGOUT_SUCCESS});
        }
        else{
          dispatch({type: LOGOUT_ERROR});
        }
      }
      else{
        dispatch({type: LOGOUT_ERROR});
      }
    }
    catch(err){
      console.log(err);
      dispatch({type: LOGOUT_ERROR});
    }

    // dispatch({type: LOG, payload: errorMsgList});
    // ;
}
