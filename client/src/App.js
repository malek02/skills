import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Navbar from './components/Navbar';
import Loading from './components/Loding';
import './App.css';
import  Register  from './components/Register';
import  Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div>

   <Navbar />
  <Route exact path='/' component={Loading} />
  <section className='container'>
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
