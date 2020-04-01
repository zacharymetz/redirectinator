import React from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../session';
import { withParse } from '../parse';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as ROUTES from '../../constants/routes';

class NewCelebrityPage extends React.Component{
  constructor(props){
    super(props)
  }
  render(){



    return (
      <div>
        <div style={{
            height:"10rem",
            padding:"1rem",
            backgroundColor : "#0f59d1",
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
                color : "white",
                fontSize : "2.5rem",
                fontWeight : "500",
                marginRight : "1rem"
              }}>
                New Celebrity
              </div>
              
              
            
            </div>
          </div>
        </div>
        <div class="container">
          <div class="card shadow" style={{
            padding:"1rem 0.5rem",
            color : "black"
          }}>
          <NewCelebrityForm/>
          </div>
        </div>
      </div>
    );
  }
}



const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    picture : '',
    twitter : '',
    error: null,
};
  



class NewCelebrityFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //  this is the onsubmit event for the componet where it will
  //  ask parse to log itself in here so lets see 
  async onSubmit ( event,_this) {
    event.preventDefault();
    const { firstName, lastName, picture } = _this.state;
    //  for this event we will create a new 
    //  object for the celeb if they exits or not

    //  create a new subclass of object 
    
    var Celebrity = _this.props.parse.parse.Object.extend("Celebrity");
    var parseFile;
    var fileUploadControl = document.getElementById("celebpicture");
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = "photo.jpg";

      var parseFile = new _this.props.parse.parse.File(name, file);
    }
    
    
    //  create a new insatnce then save it in teh db 
    try{
      var newCelebrity = new Celebrity();
      var result = await newCelebrity.save({
        firstName : firstName,
        lastName : lastName,
        picture : parseFile
      });
      //  if it sucessufl then we are here and we should go to the
      //  celebraties page so we can add carbon stuff 
      this.props.history.push(ROUTES.CELEBRITY_ROOT);
    }catch(error){
      //  if not sucsucssfull 
      this.setState({ error });
    }
  }


  render(){
    //  the form params 
    const { firstName, lastName, dateOfBirth, gender, picture, twitter, error } = this.state;
    console.log(this.state)

    // set some conditions so we can set the create now button 
    // to disabled if it is met and valid when its not 
    const isInvalid = false;

    return (<Form onSubmit={(event)=>{this.onSubmit(event,this)}} style={{
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
      }}>
      <Label for="exampleFile">Name</Label>
      <FormGroup style={{
        display:"flex",
        width: "40rem",
        justifyContent : "space-around"
      }}>
          <Input 
          name="firstName"
          value={firstName}
          onChange={this.onChange}
          type="text"
          placeholder="First Name"
          style={{textAlign : "right"}}
          />

          <Input 
          name="lastName"
          value={lastName}
          onChange={this.onChange}
          type="text"
          placeholder="Last Name"
          />
        </FormGroup>
        

      <FormGroup>
        <Label for="exampleFile">Picture</Label>
        <Input 
        type="file" 
        name="picture" 
        id="celebpicture"
        value={picture}
        onChange={this.onChange}
        
        placeholder="Email Address"
        
         />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>

        <Button disabled={isInvalid} type="submit">
          Create Now
        </Button>

        {error && <p>{error.message}</p>}
      </FormGroup>

    </Form>);
  }
}

//  make sure this condition checks if they can 
//  add a celebraty or not but checks if 
//  you are loged in or not 
const condition = authUser => !!authUser;

const NewCelebrityForm = compose(
  withParse,
  withRouter,
)(NewCelebrityFormBase)

export default compose(
  withAuthorization(condition),
  withParse,
)(NewCelebrityPage);

