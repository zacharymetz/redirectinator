import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withParse } from '../parse';
import * as ROUTES from '../../constants/routes';



class LoginPage extends Component{
  render(){
    return(
      <div>
        <SignInForm />
      </div>
    )
  }
}
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  //  this is the onsubmit event for the componet where it will
  //  ask parse to log itself in here so lets see 
  async onSubmit ( event,_this) {
    event.preventDefault();
    const { email, password } = _this.state;
   
    
      //  if successfull 
    
    try{
      const user = await _this.props.parse.parse.User.logIn(email, password);
      this.setState({ ...INITIAL_STATE });
      this.props.parse.parse.triggerOnAuthChange(user);
      this.props.history.push(ROUTES.HOME);
      console.log(user);
      debugger
    }catch(error){
      //  if not sucsucssfull 
      this.props.parse.parse.triggerOnAuthChange(null);
      this.setState({ error });
    }
    
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={(event)=>{this.onSubmit(event,this)}} style={{
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
      }}>
        <FormGroup>
          <Label for="emailInput">Email</Label>
          <Input 
          id="emailInput"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput">Password</Label>
          <Input 
          id="passwordInput"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          />
        </FormGroup>
        
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withParse,
)(SignInFormBase);

export {  SignInForm }
export default LoginPage;