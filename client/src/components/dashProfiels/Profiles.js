import React,{useEffect} from "react";
import {connect} from 'react-redux';
import {GetProfiles} from '../../action/profile'
const Profiles=({GetProfiles,profiles})=> {

useEffect(()=>{
    GetProfiles()
},[])
console.log(11,profiles)
  return (
    <section className="container">
      <h1 className="large text-primary">Engineering</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        engineers
      </p>
      {profiles.map(item=>
        
      (<div className="profiles" key={item.id}>
        <div className="profile bg-light">
          <img
            class="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2>{item.user.name}</h2>
            <p>{item.status}</p>
            <p>{item.location}</p>
            <a href="profile.html" className="btn btn-primary">
              View Profile
            </a>
          </div>
{item.skills.filter((skil, index) => index < 3).map((skil,index)=>
          (<ul key={index}>
            <li className="text-primary">
              <i className="fas fa-check"></i> {skil}
            </li>
          </ul>))}
        </div>
      </div>))}
    </section>
  );
}
const mapToProps=state=>({
    profiles: state.CurrentProfile
    .profiles,
    user:state.auThentication.user
  })

export default connect(mapToProps,{GetProfiles})(Profiles) ;