import {Useractiontypes} from '../action/trype'



const INITIAL_STATE = []



const userReducer = (state = INITIAL_STATE, action) => { ////see this after
    switch (action.type) {
        case Useractiontypes.SET_CURRENT_USER:
            return [...state,action.payload];
            case Useractiontypes.SET_ALERT:
                return state.filter(alertt=>alertt.id ===action.payload);
                
        default:
            return state;
    }
};
export default userReducer;