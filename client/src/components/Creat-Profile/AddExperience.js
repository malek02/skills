import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../action/profile";

const AddExperience = ({ addExperience, history}) => {
  const [openfield, setOpenfield] = useState(false);
  const [formaDta, setFormaDta] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const { title, company, location, from, to, current, description } = formaDta;

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormaDta({ ...formaDta, [name]: value });
    console.log("state add experience", formaDta);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    addExperience(formaDta, history);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handelSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => handelChange(e)}
            value={title}
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => handelChange(e)}
            value={company}
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => handelChange(e)}
            value={location}
            placeholder="Location"
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            onChange={(e) => handelChange(e)}
            value={from}
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              onChange={(e) => {
                setFormaDta({ ...formaDta, current: !current });
                setOpenfield(!openfield);
              }}
              name="current"
              value={current}
              checked={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            onChange={(e) => handelChange(e)}
            name="to"
            value={to}
            disabled={openfield ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={description}
            onChange={(e) => handelChange(e)}
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/Dashboard" href="dashboard.html">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default connect(null, { addExperience})(withRouter(AddExperience)
);
