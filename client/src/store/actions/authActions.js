import axios from '../../axios/axiosConfig';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../reducers/authReducer';

import {
  REGISTER_CLEAR,
  UNSET_USER
} from '../reducers/dataReducer';

export const loginUser = (user) => (dispatch) => {
  axios.post(`/login`, {
    username: user.username,
    password: user.password},
    {withCredentials: true})
    .then(response => {
      // If there are validation errors
      if (response.data.error ==  true) {
        const errorList = response.data.messages;
        const errorMsgList = [];
        errorList.forEach(error => {
          errorMsgList.push(error.message);
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
      dispatch({type: LOGIN_ERROR, payload: ["An error occurred"]})
    })
}

export const logoutUser = () => (dispatch) => {
  axios.get(`/logout`,
    {withCredentials: true})
    .then(response => {
      if (response.data.error == true) {
          dispatch({type: LOGOUT_ERROR, payload: [response.data.message]});
      }
      else {
        //REMOVED LOGIC TO GET LOCALSTORAGE because don't want to disable user logout if they remove their localstorage
        dispatch({type: LOGOUT_SUCCESS});
        dispatch({type: UNSET_USER});
      }
    })
    .catch(err => {
      dispatch({type: LOGOUT_ERROR, payload: [err]});
    })
}

//Force logout if for any reason user is not authenticated when attempting to access a resource while they should have been logged in
export const forceLogout = () => (dispatch) => {
  dispatch({type: LOGOUT_SUCCESS});
  dispatch({type: UNSET_USER});
}
