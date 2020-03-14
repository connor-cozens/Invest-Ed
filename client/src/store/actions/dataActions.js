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
