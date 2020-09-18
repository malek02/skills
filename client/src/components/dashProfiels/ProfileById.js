import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {GetProfilByid} from '../../action/profile';
import Spinner from '../router/Spinner'
import Moment from 'react-moment'
 const ProfileById=({GetProfilByid,profile,match,isAuthenticated,user,...rest})=> {
console.log(rest)
    useEffect(()=>{
 GetProfilByid(match.params._id)
    },[])



console.log(777777777,profile)
    return (
        <>
        {!profile ? <Spinner /> :
        (<>
        <section className="container">
    
    
      <>
      <div className="profile-grid my-1">
        
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profile.user.avatar}
            alt=""
          />
          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">{profile.company?profile.company:''}</p>
          <p>{profile.location}</p>
          <div className="icons my-1">
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
            <a href={profile.social ? profile.social.twitter:''} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href={profile.social ? profile.social.facebook:''} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href={profile.social ? profile.social.linkedin:""} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href={profile.social ? profile.social.instagram :''} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name} Bio</h2>
          <p>
            {profile.bio}
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
      
         <div className="skills" >
         {profile.skills.map ((item)=>(
            <div className="p-1" key={item._id}><i className="fa fa-check"></i> {item}</div>))}
          </div>
        </div>

          
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.map ((item)=>( 
          <div  key={item._id}>
            <h3 className="text-dark">{item.company}</h3>
            <Moment format='YYYY/MM/DD'>
            <p>{item.from}</p></Moment> - {item.to === null ? ('Now') :
(<Moment format='YYYY/MM/DD'>{item.to}</Moment>)}
            <p><strong>Position: </strong>{item.title}</p>
            <p>
              <strong>Description: </strong>{item.description}
            </p>
          </div>))}
          
        </div>

    
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.map ((item)=>( 
          <div key={item._id}>
            <h3>{item.school}</h3>
            <Moment format='YYYY/MM/DD'>
            <p>{item.from}</p></Moment> - {item.to === null ? ('Now') :
(<Moment format='YYYY/MM/DD'>{item.to}</Moment>)}
            <p><strong>Degree: </strong>{item.dgree}</p>
            <p><strong>Field Of Study: </strong>{item.fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{item.description}
            </p>
          </div>))}
        </div>

    
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Username: {profile.githubusername}
          </h2>
          
        </div>
      </div>
      </>
      <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
     {isAuthenticated && user._id===profile.user._id ? <Link to="/editprofile" className="btn btn-dark">Edit Profile</Link>: "" }
    </section>
    </>)}
    </>
    )
}

const mapToProps=state=>({
    profiles: state.CurrentProfile.profiles,
    profile: state.CurrentProfile.profile,
    user:state.auThentication.user,
    isAuthenticated:state.auThentication.isAuthenticated
  })
export default connect( mapToProps,{GetProfilByid})(withRouter(ProfileById))