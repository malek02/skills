import React, { useState} from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../action/profile";

const AddEducation = ({ addEducation, history}) => {
  const [openfield, setOpenfield] = useState(false);
  const [formaDta, setFormaDta] = useState({
    school: " ",
        dgree: "",
        fieldofstudy: "",
        from: "",
        to:"",
        current: false,
        description:""
  });
  const { school,dgree,fieldofstudy,from,to,current, description } = formaDta;

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormaDta({ ...formaDta, [name]: value });
    console.log("state add education", formaDta);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    addEducation(formaDta, history);
  };
  

  return (
    <section class="container">
      <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e=>handelSubmit(e)}>
        <div class="form-group">
          <input
         onChange={(e) => handelChange(e)}
         value={school}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div class="form-group">
          <input
           onChange={(e) => handelChange(e)}
           value={dgree}
            type="text"
            placeholder="* Degree or Certificate"
            name="dgree"
            required
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study"  value={fieldofstudy}
          onChange={(e) => handelChange(e)} name="fieldofstudy" />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date"  onChange={(e) => handelChange(e)} value={from} name="from" />
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox"   onClick={(e) => {
    setFormaDta({ ...formaDta, current: !current });
    setOpenfield(!openfield);
  }} 
  name="current" value={current} checked={current} /> Current School or Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" 
           onChange={(e) => handelChange(e)} value={to} name="to"  disabled={openfield? 'disabled':''} />
        </div>
        <div class="form-group">
          <textarea
           onChange={(e) => handelChange(e)}
            name="description"
            value={description}
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
      
        <Link class="btn btn-light my-1" to="/Dashboard" >
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default connect(null, { addEducation})(withRouter(AddEducation)
);
