import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withParse } from '../parse';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
<div class="jumbotron">
    <div class="container">
      <div class="query-window">
        <h1>SignUp</h1>
        <SignUpForm />
      </div>
    </div>
</div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
  



class SignUpFormBase  extends Component {
  constructor(props) {
    super(props);


    this.state = { ...INITIAL_STATE };
  }

  async onSubmit ( event,_this) {
    event.preventDefault();
    const { username, email, passwordOne } = _this.state;
    /// okay here is where we make the user so we \
    //  send back the parse request here 
      var user = new _this.props.parse.parse.User();
      user.set("username", username);
      user.set("password", passwordOne);
      user.set("email", email);

      // other fields can be set just like with Parse.Object
      
      try {
        await user.signUp();
        var user = _this.props.parse.parse.User.current();
        user.setACL(new _this.props.parse.parse.ACL(user));
        _this.setState({ ...INITIAL_STATE });
        _this.props.parse.parse.triggerOnAuthChange(user);
        _this.props.history.push(ROUTES.HOME);
        console.log(user);
        
      }catch(error){
        //  if not sucsucssfull 
        _this.props.parse.parse.triggerOnAuthChange(null);
        _this.setState({ error });
      }

    
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
  
    return (
      <form onSubmit={(event)=>{this.onSubmit(event,this)} }>
        <FormGroup>
          <Label for="usernameinput">Email</Label>
          <Input 
          id="usernameinput"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name" />
        </FormGroup>

        <FormGroup>
          <Label for="emailinput">Email</Label>
          <Input 
          id="emailinput"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"/>
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput">Password</Label>
          <Input 
          id="passwordInput"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"/>
        </FormGroup>
        <FormGroup>
          <Label for="passwordRInput">Password</Label>
          <Input 
          id="passwordRInput"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"/>
        </FormGroup>
        
     
        
        
        <Button disabled={isInvalid} type="submit">
            Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
    withRouter,
    withParse,
  )(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };