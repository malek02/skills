import { combineReducers } from 'redux';
import userReducer from './alert'
import auThentication from './authen';

export default combineReducers ({
    userReducer,
    auThentication
    
});