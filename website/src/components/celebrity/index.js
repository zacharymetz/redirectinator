import React, {Component} from 'react';
import { withParse } from '../parse';
import './celebrity.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
class CelebratyLandingPage extends React.Component{
  constructor(props) {
    super(props)
    this.setState({
      celebraties : []
    })
  }

  
  render(){
    return (
      <div>
        <div style={{
            padding:"4rem 0.5rem",
            backgroundColor : "#0f59d1",
            marginBottom:"2rem"
          }}>
          <div class="container">
            <h2>Search Carbon Footprints</h2>
          </div>
        </div>
        <div class="container">
          <CelebrityList />
        </div>
      </div>
    )
  }
}


class CelebrityListBase extends Component{
  constructor(props){
    super(props)
    this.state = {
      status : "loading",
      celebraties : []
    };
    this.updateData();
  }

  async updateData(){
    console.log("asdas")
    try{  
      const Celebrity = this.props.parse.parse.Object.extend("Celebrity");
      const query = new this.props.parse.parse.Query(Celebrity);
      var celebraties = []
      celebraties = await query.find();
      
      //  now we loop through the results and add them all to
      //  to the celebraties list 
      this.setState({
        status : "done",
        celebraties : celebraties
        });
    }catch(exception){
      //  do something here like say there was an error and to 
      //  refersh here 
      debugger
      this.setState({
        status : "error" ,
        celebraties : []
      })
    }
    
  }
  render(){
    
    var items = [];
    for(let i=0;i<this.state.celebraties.length;i++){
      items.push(
        < CelebratyListItem 
          firstName = {this.state.celebraties[i].attributes.firstName}
          lastName = {this.state.celebraties[i].attributes.lastName}
          pictures = {this.state.celebraties[i].attributes.picture._url}
          id = {this.state.celebraties[i].id}
          
        
         />
      )
    }
    var body;
    if(this.state.status == "loading"){
      body = (
        <div>
          <div class="celeb-list-loader"></div>
          <p>Loading...</p>
        </div>
      )
    }else if(this.state.status == "error"){
      
       body = "error"
    }else if(this.state.status == "done"){
      body = items;
    }


    return (
      <div class="card shadow" style={{
        padding:"1rem 0rem",
        color : "black"
      }}>
      < CelebratyListItem header={true} />
        {body}
      </div>
    )
  }
}






class CelebratyListItem extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }
  render(){

    //  get the feilds here 
    var { firstName, lastName, picture,id }  = this.props;
    if(this.props.header){
      firstName = "First Name"
       lastName = "Last Name"
       picture = "asd"
    }

    //


    
    return (
        <Link to={ROUTES.CELEBRITY_DETAILS+"/"+this.props.id} style={{
          display : "flex",
          flexDirection : "row",
          justifyContent : "flex-start",
          padding: "0 0.25rem",
          borderBottom: "1px solid rgb(0,0,0,0.25)"
        }}>
          <div
            style={{
              width: "5rem"
            }}
          >
            {picture}
          </div>

          <div
            style={{
              flexGrow : 1
            }}
          >
          {lastName}
          </div>

          <div
            style={{
              flexGrow : 1
            }}
          >
          {firstName}
          </div>

          
        </Link>
      )
  }
}



const CelebrityList = withParse(CelebrityListBase);
export default withParse(CelebratyLandingPage);