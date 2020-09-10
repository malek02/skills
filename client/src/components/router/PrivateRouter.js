import React from 'react'
import {Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


 const PrivateRouter=({component:Component,isAuthenticated,...otherprops})=>(
<>
    
<Route {...otherprops} render={() => isAuthenticated ? (
        <Component {...otherprops}  />) : (<Redirect to='/login'/>)}

    />
    </>
 )



 
    
 
 const mapToProps=state=>({
    isAuthenticated: state.auThentication.isAuthenticated
  })

 export default connect(mapToProps)(PrivateRouter) ;