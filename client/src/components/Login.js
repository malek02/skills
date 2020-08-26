import React, {useState} from 'react';
import {Link} from 'react-router-dom';


 const Login = () => {
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
            
            const body=JSON.stringify(newUser)
            console.log('body',body)
            }
           
          
    
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
export default Login;