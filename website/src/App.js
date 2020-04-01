import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as ROUTES from './constants/routes';

//  normal imports here 
import Navigation from './components/Navigation';
import Footer from './components/footer';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import HomePage from './components/home';
import LandingPage from './components/landing';

import LinksLandingPage from './components/Links'
import NewLinkPage from './components/Links/New'
import LinkDashboard from './components/Links/LinkDashboard';
//  the celebrity pages
import SettingsPage from './components/home/Settings'

//  the carbon pages 
import AddCarbonTipPage from './components/carbon/addtip';
import CarbonProfilePage from './components/carbon/profile';



import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


import {withAuthentication} from './components/session'
class App extends React.Component{
  constructor(){
    super();
    //  alright so here we wanna get the auth thing going for us so 
  }



  render(){
    return (
    <div className="App">
      <Router>
            
                <Navigation />

                

                <div className="content">
                  <Route exact  path={ROUTES.LANDING} component={LandingPage} />
                  <Route exact  path={ROUTES.SIGN_IN} component={LoginPage} />
                  <Route exact  path={ROUTES.SIGN_UP} component={SignupPage} />
                  <Route exact  path={ROUTES.HOME} component={HomePage} />
                  <Route exact  path={ROUTES.SETTINGS} component={SettingsPage} />




                  <Route exact  path={ROUTES.LINKS_NEW} component={NewLinkPage} />
                  <Route exact  path={ROUTES.LINKS_ROOT} component={LinksLandingPage} />
                  <Route exact path={ROUTES.LINKS_DASHBOARD + "/:id"} component={LinkDashboard} />



                  <Route exact path={ROUTES.CARBON_PROFILE + "/:id"} component={CarbonProfilePage} />

                  <Route exact path={ROUTES.CARBON_ROOT + "/:id" + ROUTES.ADD_CARBON_TIP} component={AddCarbonTipPage} />

                </div>
                <Footer />
                
        </Router>
    </div>
  );
  }
}


export default withAuthentication(App);
