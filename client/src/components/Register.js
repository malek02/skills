import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../action/action";
import { setRegister } from "../action/auth";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    
  });

  const { name, email, password, confirmpassword } = formData;

  const holdChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handelSabmit = (e) => {
    e.preventDefault();
    let valid=validation()
    console.log('state form',valid)
    if (!valid){
    if (password !== confirmpassword) {
      props.setCurrentUser("password not match", "danger");
    } else {
      props.setRegister({ name, email, password });
    }}
   
    setTimeout(() => {
      setFormData({
        name,
      email,
      password,
        passwordError: '',
        emailError:'',
        nameError:''
      });
    }, 4000);
  };
  if (props.isAuthenticated) {
    return <Redirect to="/Dashboard" />;
  }
  const validation=()=>{
    if(!name) {
      props.setCurrentUser("name not match", "danger")
      return true }
      if (/[^a-zA-Z -]/.test(name)) {
        props.setCurrentUser("invalid name caracter not match", "danger")
         return true
      }
      if (name.trim().length < 4) {
        props.setCurrentUser(`${name} needs to be at least three characters`, "danger");
     return true }
    if(!email){
      props.setCurrentUser("invalid email  not match", "danger")
      return true }
    if(!password){
      props.setCurrentUser("invalid password not match", "danger")
      return true }
      if (password.trim().length < 7) {
        props.setCurrentUser(`password must have more than 6 characters`, "danger");
     return true }

else{return false}


}
  return (
    <section className="container">
     
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => handelSabmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="first name and last name"
            value={name}
            onChange={(e) => holdChange(e)}
            name="name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => holdChange(e)}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => holdChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={(e) => holdChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};
const mapToProps = (state) => ({
  isAuthenticated: state.auThentication.isAuthenticated,
});
const mapdispatchToProps = (dispatch) => ({
  setCurrentUser: (user, alerttyp) => dispatch(setCurrentUser(user, alerttyp)),
  setRegister: ({ name, email, password }) =>
    dispatch(setRegister({ name, email, password })),
});

export default connect(mapToProps, mapdispatchToProps)(Register);
