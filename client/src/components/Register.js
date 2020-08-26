import React, {useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
 const Register = () => {

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
       alert('password not match')
   }
    else{
        const newUser={
            name:name,
            email:email,
            password:password
        };
        

        const head={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify(newUser)
        console.log('body',body)
        try{

const res= await axios.post('/api/users',body, head)
console.log(res.data)
        }
        catch(err){
console.error(err.response.data)
        }
    }

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
          required />
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={confirmpassword}
            minLength="6"
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
export default Register;