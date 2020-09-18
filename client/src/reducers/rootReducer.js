import { combineReducers } from 'redux';
import userReducer from './alert'
import auThentication from './authen';
import CurrentProfile from './profile';
import CurrentPosts from './Posts-reducer';

export default combineReducers ({
    userReducer,
    auThentication,
    CurrentProfile,
    CurrentPosts
   
    
});