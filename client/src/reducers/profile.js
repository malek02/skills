const INITIAL_STATE = {
   profile:null,
 profiles:null,
    loading:true,
    repos:[],
    error:{}

}


const CurrentProfile = (state = INITIAL_STATE, action) => { ////see this after
    switch (action.type) {

case 'PROFILE_SUCCESS':
    return{...state,  
        loading:false,
        profile:action.payload
    }

    case 'PROFILE_FAIL':
      
        return{...state,  
            loading:false,
            error:action.payload
           
        }

        case 'CLEAR_PROFILE':
        return{...state,  
            profile:null,
            loading:true,
    repos:[]
           
        }
        case 'REGISTER_PROFILE':
            return{...state,  
                profile:action.payload,
                loading:true,
        repos:[]
               
            }
            case 'REGISTER_EXPERIENCE':
            return{...state,  
                profile:action.payload,
              
            }
            case 'EXPERIENCE_ERROR':
                return{...state,  
                    error:action.payload,loading:true
                  
                }
            case 'REGISTER_EDUCATION':
                return{...state,  
                    profile:action.payload,
                  
                }
                case 'EDUCATION_ERROR':
                return{...state,  
                    error:action.payload,loading:true
                  
                }    
                case 'DELETE_EXPERIENCE':
                    return{...state,  
                        profile:action.payload
                      
                    }  
                    case 'DELETE_EXPERIENCE':
                    return{...state,  
                        profile:action.payload
                      
                    }   
                    case 'DELETE_EXPERIENCE_ERROR':
                        return{...state,  
                            error:action.payload,loading:true
                          
                        }    
                        case 'DELETE_EDUCATION':
                            return{...state,  
                                profile:action.payload
                              
                            }   
                            case 'DELETE_EDUCATION_ERROR':
                                return{...state,  
                                    error:action.payload,loading:true
                                  
                                }            
        default:
            return state;
    
}};
export default CurrentProfile 

