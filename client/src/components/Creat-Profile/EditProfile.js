import React,{useState,useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {creatProfile } from '../../action/profile'
import { getCurrentProfile } from "../../action/profile";
const EditProfile=({profile,history,creatProfile,getCurrentProfile })=>{
    const [ open, setOpen]=useState(false)
const [ form, setForm]=useState({
    company:'',
    
    website:'',
    location:'',
    bio:'',
    status:'',
    githubusername:'',
    skills:'',
    facebook:'',
    twitter:'',
    instagram:'',
    linkedin:''
})
const handelChange=(e)=>{
    const {value,name}=e.target;
    setForm({...form,[name]:value})
    
}
const openLinks=()=>{
    setOpen(!open)
}
const handelSubmit=(e)=>{
    e.preventDefault();
   creatProfile(form,history)
}
useEffect(
    ()=>{
        getCurrentProfile()
    setForm({
    company:profile.company? profile.company : '',
    
website:profile.website ? profile.website: '',
location:profile.location ? profile.location: '',
bio:profile.bio ? profile.bio: '',
status:profile.status ? profile.status: '',
githubusername:profile.githubusername ? profile.githubusername : '' ,
skills:profile.skills ? profile.skills.join(',') : '' ,

facebook:profile.social ? profile.social.facebook : '',
twitter:profile.social ? profile.social.twitter :'',
instagram:profile.social ?profile.social.instagram : '',
linkedin:profile.social ?profile.social.linkedin:''

})
    }, [])
    return (
        <section className="container">
        <h1 class="large text-primary">
          Create Your Profile
        </h1>
        <p class="lead">
          <i class="fas fa-user"></i> Let's get some information to make your
          profile stand out
        </p>
        <small>*= required field</small>
        <form class="form" onSubmit={(e)=>handelSubmit(e)} >
          <div class="form-group">
            <select onChange={e=>handelChange(e)} value={form.status} name="status">
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small class="form-text"
              >Give us an idea of where you are at in your career</small>
            
          </div>
          <div class="form-group">
            <input value={form.company} onChange={e=>handelChange(e)} type="text" placeholder="Company" name="company" />
            <small class="form-text"
              >Could be your own company or one you work for</small>
            
          </div>
          <div class="form-group">
            <input value={form.website}  onChange={e=>handelChange(e)} type="text" placeholder="Website" name="website" />
            <small class="form-text"
              >Could be your own or a company website</small>
            
          </div>
          <div class="form-group">
            <input value={form.location} onChange={e=>handelChange(e)} type="text" placeholder="Location" name="location" />
            <small class="form-text"
              >City & state suggested (eg. Boston, MA)</small>
          </div>
          <div class="form-group">
            <input value={form.skills} onChange={e=>handelChange(e)} type="text" placeholder="* Skills" name="skills" />
            <small class="form-text"
              >Please use comma separated values (eg.
              HTML,CSS,JavaScript,PHP)</small>
            
          </div>
          <div class="form-group">
            <input
            value={form.githubusername} 
            onChange={e=>handelChange(e)}
              type="text"
              placeholder="Github Username"
              name="githubusername"
            />
            <small class="form-text"
              >If you want your latest repos and a Github link, include your
              username</small>
            
          </div>
          <div class="form-group">
            <textarea value={form.bio} 
            onChange={e=>handelChange(e)} placeholder="A short bio of yourself" name="bio"></textarea>
            <small class="form-text">Tell us a little about yourself</small>
          </div>
  
          <div class="my-2">
            <button onClick={e=>openLinks(e)} type="button" class="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
  
          {open ? <>
          <div class="form-group social-input">
            <i class="fab fa-twitter fa-2x"></i>
            <input value={form.twitter} onChange={e=>handelChange(e)} type="text" placeholder="Twitter URL" name="twitter" />
          </div>
  
          <div class="form-group social-input">
            <i class="fab fa-facebook fa-2x"></i>
            <input value={form.facebook}  onChange={e=>handelChange(e)} type="text" placeholder="Facebook URL" name="facebook" />
          </div>
  
         
  
          <div class="form-group social-input">
            <i class="fab fa-linkedin fa-2x"></i>
            <input value={form.linkedin}  onChange={e=>handelChange(e)} type="text" placeholder="Linkedin URL" name="linkedin" />
          </div>
  
          <div class="form-group social-input">
            <i class="fab fa-instagram fa-2x"></i>
            <input value={form.instagram} onChange={e=>handelChange(e)}  type="text" placeholder="Instagram URL" name="instagram" />
          </div></> : ''}
          <input type="submit" class="btn btn-primary my-1" />
          <Link className="btn btn-light my-1"  to='/Dashboard' >Go Back</Link>
        </form>
      </section>
    )
}
const mapToProps=state=>({
   profile: state.CurrentProfile.profile
  })


export default connect(mapToProps,{creatProfile,getCurrentProfile})(withRouter(EditProfile));