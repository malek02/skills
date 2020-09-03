import { v4 as uuidv4 } from 'uuid';


export  const setCurrentUser = (user,alerttyp) =>dispatch=>{
dispatch({
    

    type: 'SET_CURRENT_USER',
    payload: {user,alerttyp,id:uuidv4()}
     
});
setTimeout(()=>dispatch({
    type: 'SET_CURRENT_ALERT',
    payload: uuidv4()
}),7000)
}