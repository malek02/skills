import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Navbar from './components/Navbar';
import Loading from './components/Loding';
import './App.css';
import  Register  from './components/Register';
import Dashboard from './components/dashboard/dashboard'
import  Login from './components/Login';
import Alert from './components/Alert';
import {loadUser} from './action/auth';
import setAuthtoken from './reducers/utils/setAuthToken';
import CreatProfile from './components/Creat-Profile/CreatProfile';
import EditProfile from './components/Creat-Profile/EditProfile'
import PrivateRouter from './components/router/PrivateRouter';
import AddExperience from './components/Creat-Profile/AddExperience';
import AddEducation from './components/Creat-Profile/AddEducation';
import Profiles from './components/dashProfiels/Profiles';
import ProfileById from './components/dashProfiels/ProfileById';
import Posts from './components/creat-Posts/Posts';
import CostComment from './components/creat-Posts/post';
import Notfound from './components/router/Notfound'

const  App=(props)=> {
if(localStorage.token){
  setAuthtoken(localStorage.token)
}



useEffect(()=>{
  store.dispatch(loadUser())
},[]);

  return (
    
    <Provider store={store}>
    <Router>
    <div>

   <Navbar />
  <Route exact path='/' component={Loading} />
  <section className='container'>
  <Alert/>
<Switch>
<Route exact path='/register' component={Register}/>
<Route exact path='/login' component={Login}/>
<Route exact path='/profiles' component={Profiles}/>
<Route exact path='/profile/:_id' component={ProfileById}/>

<PrivateRouter   exact path='/api/:_id' component={CostComment}/>
<PrivateRouter  exact path='/posts' component={Posts} />
<PrivateRouter exact path='/createprofile' component={CreatProfile} />
<PrivateRouter exact path='/editprofile' component={EditProfile} />
<PrivateRouter exact path='/addexperience' component={AddExperience} />
<PrivateRouter exact path='/addeducation' component={AddEducation} />
<PrivateRouter  exact path='/Dashboard' component={Dashboard} />
<Route  component={Notfound}/>
</Switch>
  </section>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
