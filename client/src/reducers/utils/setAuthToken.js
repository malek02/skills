import axios from 'axios';




 const setAuthtoken= (a)=>{
     if(a){
          axios.defaults.headers.common['x-auth-token']=a
         
     }
else{
    delete axios.defaults.headers.common['x-auth-token'];
}
 }
 export default setAuthtoken;
 