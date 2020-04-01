import React from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../session';
import { withParse } from '../parse';
import { Line,Doughnut } from 'react-chartjs-2';
import { Table } from 'reactstrap';
import * as ROUTES from '../../constants/routes';
class HomePage extends React.Component{
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
          <button type="button" class="btn btn-outline-light" onClick={()=>{
            this.props.history.push(ROUTES.SETTINGS);
          }}>Prefernces </button>
          </div>
        
        </div>
      </div>
    </div>
    <div class="container">
      <OverallDashBoard />
      <h3 style={{textAlign:"left",marginBottom:"1.5rem"}}>
        Request History:
      </h3>
      <MostRecentRequests/>
    </div>
  </div>
)
}
}

const condition = authUser => !!authUser;

var testData = {
  labels: [
    'Enhanced ',
    'Regular '
],
datasets: [{
    data: [20,4 ],
    backgroundColor: [
    '#D9514EFF',
    '#2DA8D8FF'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB'
    ]
}]
}

const OverallDashBoard = (props)=>{
  return(
    <div style={{
      display : "flex",
      marginBottom : "4rem"
    }}>
      <div style={{
        flex : 1,
      }}>
        <Line  />
      </div>
      <div style={{
        flex : 1,
      }}>

        <Doughnut data ={testData}/>
      </div>
      <div style={{
        flex : 1,
      }}>
        Total Request Count
        <br></br>
        <h2>43</h2>
      </div>
    </div>
  )
}


const MostRecentRequests= (props)=>{
  return(
    <Table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>IP</th>
          <th>Redirect</th>
          <th>Location</th>
          <th>User Agent</th>
          
          <th>ISP</th>
          <th></th>
        </tr>
      </thead>
    </Table>
  )
}

export default compose(
  withAuthorization(condition),
  withParse,
)(HomePage);

