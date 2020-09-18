import React,{useEffect} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {GetProfiles} from '../../action/profile';
import Spinner from '../router/Spinner'
const Profiles=({GetProfiles,profiles,...rest})=> {

useEffect(()=>{
    GetProfiles()
},[])
console.log(11,rest)
  return (
    <>
    {  !profiles? <Spinner /> :
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
            src={item.user.avatar}
            alt="fafa"
          />
          <div>
            <h2>{item.user.name}</h2>
            <p>{item.status}</p>
            <p>{item.location}</p>
            <Link to={`/profile/${item.user._id}`} className="btn btn-primary">
              View Profile
            </Link>
          </div>
<ul >
  {item.skills.filter((skil, index) => index < 3).map((skil,index)=>
    (<li className="text-primary" key={index} >
              <i className="fas fa-check"></i> {skil}
            </li>))}
          </ul>
        </div>
      </div>))}
    </section>}
    </>
  );
}
const mapToProps=state=>({
    profiles: state.CurrentProfile
    .profiles,
    user:state.auThentication.user
  })

export default connect(mapToProps,{GetProfiles})(Profiles) ;