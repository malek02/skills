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
    console.log(1,res)
    dispatch({    
        type: 'REGISTER_SUCCESS',
        payload: res.data,
         
    });}
    catch(err){
        const errors= err.response.data.errors;
console.log(err.response)
        if(errors){
            errors.forEach(element => dispatch(setCurrentUser(element.msg,'danger')))
                
            };
       
        dispatch({
            type: 'REGISTER_FAIL',
            
        })

    }
    
    }