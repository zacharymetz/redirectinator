import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../session';
import { withParse } from '../parse';
import { Line,Doughnut } from 'react-chartjs-2';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SettingsPage extends React.Component{
    constructor(props){
      super(props)
    }
   render() {
     const attributes = this.props.parse.parse.User.current().attributes;
     console.log(this.props.parse.parse.User.current().attributes.username);
     return(
    <div>
      <div style={{
          height:"10rem",
          padding:"1rem",
          backgroundColor : "#D9514EFF",
          marginBottom:"2rem",
          display :"flex",
          alignItems : "stretch"
        }}>
        <div class="container" style={{
          height:"100%"
        }}>
          <div style={{
          display:"flex",
          flexDirection : "row",
          alignItems : "flex-end",
          height: "100%"
        }}>
            <div style={{
              height:"5rem",
              width : "5rem",
              background : "white",
              borderRadius : "0.3rem",
              marginRight : "2rem"
            }}>
            </div>
  
            <div style={{
              color : "#2A2B2DFF",
              fontSize : "2.5rem",
              fontWeight : "500",
              marginRight : "1rem"
            }}>
              {attributes.username}
            </div>
            <div style={{
              color : "#2A2B2DFF",
              fontSize : "0.8rem",
              fontWeight : "400",
              paddingBottom : "2.5rem"
            }}>
              Standard Account
            </div>
            <div style={{
  
              flexGrow : 1,
              display: "flex",
              flexDirection : "row",
              justifyContent : "flex-end"
            }}>
            
            </div>
          
          </div>
        </div>
      </div>
      <div class="container">
         < ChangePasswordForm />
         < TimeZoneForm />
         < ChangeEmailForm />
         < CryptoDonationForm />
      </div>
    </div>
  )
  }
  }
  
  const condition = authUser => !!authUser;

  export default compose(
    withAuthorization(condition),
    withParse,
  )(SettingsPage);






  class ChangePasswordFormBase extends Component{
    onSubmit(){

    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    render(){
        //    so we need a place to change their password
        //    change their email 
        //    change their password 
        return(<Form style={{textAlign : "left", paddingBottom : "1rem",borderBottom : "1px solid white"}}>
            <h2>Change Password:</h2>
            <FormGroup>
                <Label for="emailInput">Old Password</Label>
                <Input 
                id="emailInput"
                name="email"
                value={''}
                onChange={this.onChange}
                type="password"
                placeholder="Email Address"
                />
                </FormGroup>

            <FormGroup>
                <Label for="emailInput">New Password</Label>
                <Input 
                id="emailInput"
                name="email"
                value={''}
                onChange={this.onChange}
                type="password"
                placeholder="Email Address"
                />
                </FormGroup>

            <FormGroup>
                <Label for="emailInput">Repeat New Password</Label>
                <Input 
                id="emailInput"
                name="email"
                value={''}
                onChange={this.onChange}
                type="password"
                placeholder="Email Address"
                />
                </FormGroup>
        </Form>)
    }
}
class TimeZoneFormBase extends Component{
    render(){
        return (<Form style={{textAlign : "left",padding : "1rem 0",borderBottom : "1px solid white"}}>
             <h2>Change TimeZone:</h2>
        </Form>)
    }
}
class ChangeEmailFormBase extends Component{
    render(){
        return (<Form style={{textAlign : "left", padding : "1rem 0",borderBottom : "1px solid white"}}>
                 <h2>Change Email:</h2>
        </Form>)
    }
}
class CryptoDonationFormBase extends Component{
    render(){
        return (<Form style={{textAlign : "left", padding : "1rem 0",borderBottom : "1px solid white"}}>
             <h2>Upgrade Account:</h2>
        </Form>)
    }
}

export const ChangePasswordForm = withParse(ChangePasswordFormBase);
export const TimeZoneForm = withParse(TimeZoneFormBase);
export const ChangeEmailForm = withParse(ChangeEmailFormBase);
export const CryptoDonationForm = withParse(CryptoDonationFormBase)