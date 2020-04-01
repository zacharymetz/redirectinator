import React, {Component} from 'react';
import { withParse } from '../parse';

import { Progress } from 'reactstrap';

class CelebrityDetails extends Component{
  constructor(props){
    super(props)
    console.log(this.props)
    
  }


  
  render(){
    return (<div>
    <CelebbrityInfo 
    id={this.props.match.params.id} 
    />
    
    
    <CarbonFootprintOverview 
    celebrity_id={this.props.match.params.id}
    />
    </div>)
  }
}

class CelebrityInfoBase extends Component{
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      status : "loading",
      celebrity_data : null
    }
    this.getPageData()
  }


  async getPageData(){
    const Celebrity = this.props.parse.parse.Object.extend("Celebrity");
    const query = new this.props.parse.parse.Query(Celebrity);
    query.equalTo("objectId", this.props.id);
    const results = await query.find();
    
    // Do something with the returned Parse.Object values
    
    var object = results[0].attributes;
    console.log(object)
    this.setState({
      status : "done",
      celebrity_data : object
    });
    
  }
  
  render(){
    if(this.state.status == "loading"){
      return "Loading"
    }
    return (<div class="container" style={{
      display : "flex",
      flexDirection : "row",
      justifyContent: "center",
      alignItems : "center",
      color : "black",
      padding : "2rem 0",
      borderBottom : "2px solid rgb(0,0,0,0.35)"
    }}>
    <div style={{
      marginRight : "2rem",
      background : "black",
      padding : "0.5rem",
      borderRadius : "0.5rem"
    }}><img 
    src={this.state.celebrity_data.picture._url} style ={{
      height : "10rem"
      
    }}/></div>
    
    <div>
      <h1>{this.state.celebrity_data.lastName},</h1>
      <h2>{this.state.celebrity_data.firstName}</h2>
    </div>
    </div>)
  }
}
const CelebbrityInfo = withParse(CelebrityInfoBase);


class CarbonFootprintOverviewBase extends Component{
  constructor(props){
    super(props)
    console.log(this.props)
    
  }


  
  render(){
    return (<div
      style={{
        color : "black" ,
        padding:"2rem 0"   
      }}
    >
      <h1>Carbon Overview</h1>
      <div class="container" style={{
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent: "space-evenly"
      }}>
        <div class="carbon_item" >
          <div class="carbon_value">80,000 <span class="carbon_unit">T</span> </div>
          <div class="carbon_text"> CO2 Per Year</div>
        </div>
        <div class="carbon_item" >
          <div class="carbon_value" >675 <span class="carbon_unit">x</span></div>
          <div class="carbon_text">Normal Person</div>
        </div>
      </div>
      <div class="container" style={{
        padding : "2rem 0"
      }}>
        <h3>Breakdown</h3>
        <div class="container">
          <CarbonBreakDownItem icon={"car"} name={"Vehicles"} value={200}/>
          <CarbonBreakDownItem icon={"house"} name={"Properties"} value={200}/>
          <CarbonBreakDownItem icon={"plane"} name={"Air Travel"} value={200}/>
          <CarbonBreakDownItem icon={"boat"} name={"Marine Rentals"} value={200}/>
        </div>
      </div>
    </div>)
  }
}
const CarbonFootprintOverview = withParse(CarbonFootprintOverviewBase)

const CarbonBreakDownItem = (props) =>{
  return (
    <div>
      <div class="carbon_breakdown_item">
        <div class={"carbon_breakdown_icon  "+ props.icon + "_icon"}></div>
        <div class="carbon_breakdown_text">
          <h5>{props.name}</h5>
          <div>{props.value} T /Year</div>
        </div>
      </div>
      <div>
        <div class="text-left">
        Them
        </div>
        <Progress value="100" > {props.value} </Progress>
        <div class="text-left">
        Celebrity Average
        </div>
        <Progress color="danger" value="78" > {props.value - (props.value/5)} </Progress>
        <div class="text-left">
        Average Person
        </div>
        <Progress value="5" color="warning" >10 </Progress>
      </div>
    </div>
  )
}

export default CelebrityDetails