import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import Information from './Pages/Information';
import Leaderboard from './Pages/Leaderboard';
import Market from './Pages/Market';
import News from './Pages/News';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgetPassword from './Pages/ForgetPassword';
import Wallet from './Pages/Wallet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className = "App">
        <Switch>
          <Route exact path = "/">
            <Home/>
          </Route> 
          <Route exact path = "/Information">
            <Information />
          </Route>
          <Route exact path = "/Leaderboard">
            <Leaderboard />
          </Route>
          <Route exact path = "/Market">
            <Market />
          </Route>
          <Route exact path = "/News">
            <News />
          </Route>
          <Route exact path = "/SignIn">
            <SignIn />
          </Route>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
          <Route exact path="/ForgetPassword">
            <ForgetPassword />
          </Route>
          <Route exact path = "/Wallet">
            <Wallet />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
