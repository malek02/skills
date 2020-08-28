import {Useractiontypes} from '../action/trype'



const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null

}



const auThentication = (state = INITIAL_STATE, action) => { ////see this after
    switch (action.type) {
        case Useractiontypes.REGISTER_SUCCESS:
             localStorage.setItem('token',action.payload.token);
             return{
                 ...state,...action.payload,isAuthenticated:true,loading:false
             }
            case Useractiontypes.REGISTER_FAIL:
                localStorage.removeItem('token');
                return {...state,token:null,isAthenticated:false,loading:false};
                
        default:
            return state;
    }
};
export default auThentication;