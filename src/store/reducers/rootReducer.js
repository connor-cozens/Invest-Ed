import {combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';

//Create initialState
export const initialState = {};

//Create reducer
export const reducers = combineReducers({
    auth: authReducer
});

// Create enhancer
const middleware = [thunk];
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
    
export const enhancer = composeEnhancers(applyMiddleware(...middleware));
