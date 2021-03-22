import {combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

//Save redux store in localStorage
export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch(err){
    console.log(err);
  }
}

//Load redux store from localStorage
export const loadFromLocalStorage = () => {
  try {
    const deserializedState = localStorage.getItem('state');
    if (deserializedState === null){
      return undefined;
    }
    return JSON.parse(deserializedState);
  }
  catch(err){
    console.log(err);
  }
}

//Create initialState
export const initialState = {};

//Create reducer
export const reducers = combineReducers({
    authenticate: authReducer,
    data: dataReducer
});

// Create enhancer
const middleware = [thunk];
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancer = composeEnhancers(applyMiddleware(...middleware));
