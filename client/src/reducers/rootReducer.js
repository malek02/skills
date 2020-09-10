import { combineReducers } from 'redux';
import userReducer from './alert'
import auThentication from './authen';
import CurrentProfile from './profile';

export default combineReducers ({
    userReducer,
    auThentication,
    CurrentProfile
    
});