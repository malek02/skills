import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../action/auth'
import {connect} from 'react-redux';

 const Login = (props) => {
    const [ formData , setFormData ] = useState(
        {            
            email:'',
            password:''          
        })
    
    
    const {email,password}=formData
    
    const holdChange=async (e)=>{
        const {name , value}=e.target
        setFormData({...formData,[name]:value})
        console.log(formData)
    }
    const handelSabmit=(e)=>{
        e.preventDefault();
         props.login (email,password)
          }
          if(props.isAuthenticated){
            return <Redirect to='/' /> 
            
          }
    return (
     
        <section className="container">
        
      <h1 className="large text-primary">Sign In</h1>
      
      <form className="form" onSubmit={e=>handelSabmit(e)}>
        
        <div className="form-group">
          <input type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={e=>holdChange(e)}
          name="email" />
          
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>holdChange(e)}
            minLength="6"
          />
        </div>
        
        <input type="submit"  className="btn btn-primary" value="Login"  />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
    )
}
const mapdToProps = state => ({
  isAuthenticated: state.auThentication.isAuthenticated
})
export default connect(mapdToProps,{login})(Login);