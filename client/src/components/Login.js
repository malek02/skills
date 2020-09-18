import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../action/auth";
import { connect } from "react-redux";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: null,
    emailError: null,
    passwordError: null,
  });
  console.log(1212121212, localStorage.token);

  const { email, password } = formData;

  const holdChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handelSabmit = (e) => {
    e.preventDefault();
    const valid = validation();
    if (!valid) {
      props.login(email, password);
      setFormData({
        email: "",
        password: "",
      });
    }
    setTimeout(() => {
      setFormData({
        passwordError: null,
      });
    }, 4000);
  };
  if (props.isAuthenticated) {
    return <Redirect to="/Dashboard" />;
  }
  const validation = () => {
    if (!formData.password) {
      let passworderror = "write your valid password";
      setFormData({ passwordError: passworderror });
      return true;
    } else {
      if (formData.password.length < 6) {
        let passworderror = "your password must have more than 6 caracter";
        setFormData({ passwordError: passworderror });
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <section className="container">
      {formData.passwordError ? (
        <div className="alert alert-danger">{formData.passwordError}</div>
      ) : (
        ""
      )}

      <h1 className="large text-primary">Sign In</h1>

      <form className="form" onSubmit={(e) => handelSabmit(e)}>
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};
const mapdToProps = (state) => ({
  isAuthenticated: state.auThentication.isAuthenticated,
});
export default connect(mapdToProps, { login })(Login);
