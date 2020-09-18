import React,{useEffect} from 'react'
import {Route, Redirect } from 'react-router-dom';
import {connect,useSelector} from 'react-redux';


 const PrivateRouter=({component:Component,...otherprops})=>{
    
   
   
   
      const isAuthenticated= useSelector(state=>state.auThentication.isAuthenticated)
      const loading= useSelector(state=>state.auThentication.loading)
      
   
  
   
   
   return(
   
   
<>
<Route {...otherprops} render={() => isAuthenticated && !loading ? (
        <Component {...otherprops}  />) : (<Redirect to='/login'/>)}

    />
    </>
 )
}



    
 
 

 export default connect()(PrivateRouter) ;