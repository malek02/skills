import React from 'react'
import {Link} from 'react-router-dom';
import {connect,useSelector} from 'react-redux';
import {logout} from '../action/auth';
import {BsFillGridFill,BsUnion ,BsReverseLayoutTextSidebarReverse} from 'react-icons/bs'

const Navbar=(props)=> {
  
const autLink=(
  <>
        
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li> 
          </>
);
const unauthLink=(
  <>
  <li>
           <Link to="/posts">
           <BsReverseLayoutTextSidebarReverse/>{' '}
           <span className='hide-sm'>Posts</span>
         </Link>
         </li>
  <li>
         
         <Link to="/Dashboard">
    <i className='fas fa-user' />{' '}
    <span className='hide-sm'>{props.user ? props.user.name:"" }</span>
    </Link>
           </li>
           
  <li>
         
  <a onClick={e=>props.logout(e)} href='#!'>
    <i className='fas fa-sign-out-alt' />{' '}
    <span className='hide-sm'>Logout</span>
  </a>
           </li>         
           </>    
)

    return (
        <nav className="navbar bg-dark">
        <h1>
        
          
          <Link to="/"><BsFillGridFill /> FindSkills</Link>
          
        </h1>
        <ul>
      
         <li>
        <Link to="/profiles">
           <BsUnion/>{' '}
           <span className='hide-sm'>Skills</span>
         </Link>
                  </li> 
        
         { !props.loading && props.isAuthenticated ?
          unauthLink
         :
         autLink }
        </ul>
      </nav>
    )
}
const mapdispatchProps=state=>({
  isAuthenticated: state.auThentication.isAuthenticated,
  loading: state.auThentication.loading,
  user:state.auThentication.user
})
export default connect(mapdispatchProps,{logout})(Navbar);