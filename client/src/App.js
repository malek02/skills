import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Navbar from './components/Navbar';
import Loading from './components/Loding';
import './App.css';
import  Register  from './components/Register';
import  Login from './components/Login';
import Alert from './components/Alert';
import {loadUser} from './action/auth';
import setAuthtoken from './reducers/utils/setAuthToken';

const  App=()=> {
if(localStorage.token){
  setAuthtoken(localStorage.token)
}


useEffect(()=>{
  store.dispatch(loadUser())
},[])


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
</Switch>
  </section>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
