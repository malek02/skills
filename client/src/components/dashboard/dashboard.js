import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profile";
import {Link} from 'react-router-dom';
import Spinner  from '../router/Spinner';
import ExperienceProfile from './ExperienceProfile';
import EuducationProfile from './EducationProfile';


const Dashboard = ({ getCurrentProfile, user,profile,loading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
 
  return (
    <>
{ !profile &&  !loading? <Spinner/> :

    <div>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user.name}
      </p>
  
      {profile ? '' : <h5>you dont have profile please add your one profile</h5> }

      {profile? 
      <>
      <div className="dash-buttons">
        <Link  to="/editprofile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        
        <Link  to="/addexperience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        
        <Link  to="/addeducation" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        
      </div> 
      <Fragment>
<ExperienceProfile experience={profile.experience} />
<EuducationProfile education={profile.education} />
    </Fragment>
      </>
      :
      <Link to="/createprofile" className="btn btn-primary my-1">
        Creat Profile
      </Link>}
    </div>
    }

    </>);
};

const mapToProps = (state) => ({
  user: state.auThentication.user,
  profile:state.CurrentProfile.profile,
  loading: state.auThentication.loading
});
export default connect(mapToProps,{getCurrentProfile})(Dashboard);
