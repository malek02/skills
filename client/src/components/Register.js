import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser} from '../action/action';
import {setRegister} from '../action/auth'


 const Register = (props) => {

const [ formData , setFormData ] = useState(
    { 
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    })


const {name,email,password,confirmpassword}=formData

const holdChange=async (e)=>{
    const {name , value}=e.target
    setFormData({...formData,[name]:value})
    console.log(formData)
}
const handelSabmit=async (e)=>{
    e.preventDefault();
   if(password!== confirmpassword)
   {
      props.setCurrentUser('password not match','danger')
   }
        else{props.setRegister({name,email,password})}                                        
            
        
    }
    return (
        
        <section className="container">

      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>handelSabmit(e)}>
        <div className="form-group">
          <input type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e=>holdChange(e)}
          name="name" 
         />
        </div>
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
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={confirmpassword}
            
            onChange={e=>holdChange(e)}
          />
        </div>
        <input type="submit"  className="btn btn-primary" value="register"  />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
   
   
        
    )
}
const mapdispatchToProps = dispatch => ({
    setCurrentUser: (user,alerttyp) => dispatch(setCurrentUser(user,alerttyp)),
    setRegister:({name,email,password})=>dispatch(setRegister({name,email,password}))
  })

export default connect (null, mapdispatchToProps)(Register);