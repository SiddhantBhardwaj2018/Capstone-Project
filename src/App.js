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
import Header from './Pages/Components/Header';
import Footer from './Pages/Components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { AuthProvider } from './Auth';
import  PrivateRoute  from './PrivateRoute'

function App() {

  return (
    <AuthProvider>
    <Router>
        <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path={"/Information"} component = {Information} />
          <PrivateRoute exact path = "/Leaderboard" component = {Leaderboard}/>
          <Route exact path="/Market" component={Market} />
          <Route exact path="/News" component={News} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/ForgotPassword" component={ForgetPassword} />
          <PrivateRoute exact path = "/Wallet" component = {Wallet} />
        </Switch>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
