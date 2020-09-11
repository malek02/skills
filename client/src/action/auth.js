import axios from 'axios';
import {setCurrentUser} from './action'
import  setAuthtoken from '../reducers/utils/setAuthToken';

export const loadUser =()=> async dispatch =>{
    if(localStorage.token){
        setAuthtoken(localStorage.token)
    }

try {
    const res= await axios.get('/api/auth');
  
    dispatch({
        type:'USER_LOADED',
        payload:res.data
    })
    
} catch (error) {
    dispatch({
        type: 'AUTH_ERROR'
    })
    
}



}



//resgiter user
export  const setRegister = ({name,email,password}) =>async dispatch=>{   
    const newUser={
        name:name,
        email:email,
        password:password
    };

    const head={
        headers:{
            'Content-Type':'application/json'
        }
    }
        const body=JSON.stringify(newUser);
try{
    
    const res= await axios.post('/api/users',body, head)
   
    dispatch({    
        type: 'REGISTER_SUCCESS',
        payload: res.data,
         
    });}
    catch(err){
        const errors= err.response.data.errors;

        if(errors){
            errors.forEach(element => dispatch(setCurrentUser(element.message,'danger')))
                
            };
       
        dispatch({
            type: 'REGISTER_FAIL',
            
        })

    }
    
    }

    export  const login = (email,password) =>async dispatch=>{   
        const newUser={
         
            email:email,
            password:password
        };
    
        const head={
            headers:{
                'Content-Type':'application/json'
            }
        }
            const body=JSON.stringify(newUser);
    try{
        
        const res= await axios.post('/api/auth',body, head)
       
        dispatch({    
            type: 'LOGIN_SUCCED',
            payload:res.data
             
        });
        dispatch(loadUser())
    
    }
        catch(err){
            const errors= err.response.data.errors;
    console.log(err.response)
            if(errors){
                errors.forEach(element => dispatch(setCurrentUser(element.msg,'danger')))
                    
                };
           
            dispatch({
                type: 'LOGIN_FAIL'
                
            })
          
        }
        
        }
export  const logout = () =>dispatch=>{


            dispatch({
                type: 'LOGOUT_NAVBAR',
                
            })

          }