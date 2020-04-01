import React from 'react';
import { Link } from 'react-router-dom';

//import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import './nav.css';
import SignOutButton from '../signout'

import { AuthUserContext } from '../session';


class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menu_class: '',
    }
    
  }
  closeSideNav = () =>{
    this.setState({
        menu_class: '',
      })
  }


  setToggleTopMenuClass = () => {
    
    if (this.state.menu_class === '') {
      this.setState({
        menu_class: 'toggled',
      })
    } else {
      this.setState({
        menu_class: '',
      })
    }
  }
  render(){
    var _this = this;
    return (

        <AuthUserContext.Consumer>
        
        {user =>
            user ? <NavigationAuth toggle={()=>this.setToggleTopMenuClass()} close={()=>this.closeSideNav()} menuClass={this.state.menu_class} /> : <NavigationNonAuth toggle={()=>this.setToggleTopMenuClass()} close={()=>this.closeSideNav()} menuClass={this.state.menu_class}  />
        }
        </AuthUserContext.Consumer>
    
      )
  }
}


  
const NavigationAuth = (props) => (

    
    <div class="nav-bar ">
    
      <div class="container ">
              
          
          <div class="nav-list">
            
            <div class="side-nav-toggle">
              <div onClick={props.toggle} class="side-nav-btn"></div>
              
            </div>
            <SignOutButton />
            <Link to={ROUTES.ACCOUNT} class="nav-list-item">Dashboard</Link>
            <Link to={ROUTES.LINKS_ROOT} class="nav-list-item">Links</Link>

            
            <Link to={ROUTES.LANDING} class="nav-list-brand">
               
              <div class="nav-brand-text">
              Redirectinator
              </div>
            </Link>
          </div>
      </div>





      <div className={"side-nav-base "+props.menuClass}>
        <div className={"side-nav-bar shadow-lg" }>
              <div style={{
                height:"75px",
                display:"flex",
                flexDirection : "row",
                justifyContent : "flex-end",
                alignItems : "center",
                padding : "0 2rem"
              }}>
                <div onClick={props.toggle} class="side-nav-back"></div>
              </div>
              <div class="side-nav-list">
                <SignOutButton onClick={props.close}  />
                <Link  onClick={props.close} to={ROUTES.LINKS_ROOT} class="nav-list-item">Links</Link>
                <Link onClick={props.close}  to={ROUTES.ACCOUNT} class="nav-list-item">Dashboard</Link>
                
              </div>
              

              
            
        </div>
      </div>
    </div>
);
  
const NavigationNonAuth = (props) => (

    

    <div class="nav-bar ">
    
      <div class="container ">
              
          
          <div class="nav-list">

            <div class="side-nav-toggle">
                <div onClick={props.toggle} class="side-nav-btn"></div>
                
              </div>
            
             <Link to={ROUTES.SIGN_UP} class="nav-list-item">Sign Up</Link>
              <Link to={ROUTES.SIGN_IN} class="nav-list-item">Login</Link>

              <Link to={ROUTES.LINKS_ROOT} class="nav-list-item">Links</Link>



              <Link to={ROUTES.LANDING} class="nav-list-brand">
               
              <div class="nav-brand-text">
              Redirectinator
              </div>
            </Link>
          
          </div>
      </div>
      <div className={"side-nav-base "+props.menuClass}>
      <div className={"side-nav-bar shadow-lg" }>
             <div style={{
               height:"75px",
               display:"flex",
               flexDirection : "row",
               justifyContent : "flex-end",
               alignItems : "center",
               padding : "0 2rem"
             }}>
             <div class="nav-brand"></div>
             <div style={{ flexGrow:1 }}></div>
              <div onClick={props.toggle} class="side-nav-back">
              </div>
             </div>
             <div class="side-nav-list">
              
            <Link to={ROUTES.SIGN_UP} onClick={props.close} class="nav-list-item">Sign Up</Link>
              <Link to={ROUTES.SIGN_IN} onClick={props.close} class="nav-list-item">Login</Link>

              <Link to={ROUTES.LINKS_ROOT} onClick={props.close} class="nav-list-item">Links</Link>

             </div>
             

            
          
      </div>
      </div>
      
    </div>
    
);

export default Navigation;