import axios from "../../axios/axiosConfig";
import { LOGIN_SUCCESS } from "../reducers/authReducer";
import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_CLEAR, REGISTER_CLEAR_ERROR, CLEAR_REGISTER_ERROR, SET_USER, SET_USER_ERROR, CLEAR_SET_USER_ERROR } from "../reducers/dataReducer";
import { forceLogout } from "./authActions";

//USER REGISTRATION ACTIONS
export const registerUser = (user) => (dispatch) => {
    axios.post(`/register`, {
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        username: user.username,
        organization: user.organization,
        accessLevel: user.accesslevel,
        password: user.password,
        confirmPassword: user.confirmpassword
    },
        { withCredentials: true })
        .then(response => {
            // If there are validation errors
            if (response.data.error === true) {
                const errorList = response.data.messages;
                const errorMsgList = [];
                errorList.forEach(error => {
                    errorMsgList.push(error.message);
                });
                dispatch({ type: REGISTER_ERROR, payload: errorMsgList });
            }


            // If there are no validation errors
            else {
                dispatch({ type: REGISTER_SUCCESS });
            }
        })
        .catch(err => {
            dispatch({ type: REGISTER_ERROR, payload: ["Registration Error"] });
        });
};

export const setRegistrationComplete = () => (dispatch) => {
    try {
        dispatch({ type: REGISTER_CLEAR });
    }
    catch (err) {
        dispatch({ type: REGISTER_CLEAR_ERROR, payload: err });
    }
};

export const clearRegisterError = () => (dispatch) => {
    dispatch({ type: CLEAR_REGISTER_ERROR });
};
//USER RETRIEVAL ACTIONS

export const getUser = () => (dispatch) => {
    axios.get(`/`,
        { withCredentials: true, accepts: "application/json" })
        .then(response => {
            if (response.data.error === false) {
                dispatch({ type: SET_USER, payload: response.data.message[0] });
                dispatch({ type: LOGIN_SUCCESS });
                dispatch(clearUserRetrievalError());
            } else {
                //If user not authorized to access content but they are set to authorized, need to log them out immediately
                if (response.data.message === "Not authorized to view this content") {
                    dispatch(forceLogout());
                }
                else {
                    dispatch({ type: SET_USER_ERROR, payload: response.data.message });
                }
            }
        })
        .catch(err => {
            dispatch({ type: SET_USER_ERROR, payload: err });
        });
};

export const clearUserRetrievalError = () => (dispatch) => {
    dispatch({ type: CLEAR_SET_USER_ERROR });
};
