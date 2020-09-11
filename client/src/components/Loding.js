import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Loading = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Connect Engineers</h1>
          <p className="lead">
            Create your profile/portfolio, share posts and get help from
            other engineer
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapToProps = (state) => ({
  isAuthenticated: state.auThentication.isAuthenticated,
});
export default connect(mapToProps)(Loading);
