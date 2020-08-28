import axios from 'axios';
import {setCurrentUser} from './action'
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
        payload: res.data
         
    });}
    catch(err){
        const errors= err.response.data.errors;

        if(errors){
            errors.forEach(element => dispatch(setCurrentUser(element.user,'danger')))
                
            };
       
        dispatch({
            type: 'REGISTER_FAIL',
            
        })

    }
    
    }