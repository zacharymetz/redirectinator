import React, {Component} from 'react';
import { withParse } from '../parse';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './links.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button,Table  } from 'reactstrap';

class LinksLandingPage extends React.Component{
    constructor(props) {
      super(props)
      this.setState({
        urls : []
      })
    }
  
    
    render(){
      return (
        <div>
          <div style={{
              padding:"2rem 0.5rem",
              color : "#D9514EFF",
              marginBottom:"2rem"
            }}>
            <div class="container">
              <h2>My Redirect Links</h2>
            </div>
          </div>
          <div class="container">
            <LinksList />
            <NewLinkButton />
          </div>
        </div>
      )
    }
  }
  
  
  class LinksListListBase extends Component{
    constructor(props){
      super(props)
      this.state = {
        status : "loading",
        urls : []
      };
      this.updateData();
    }
  
    async updateData(){
      console.log("asdas")
      try{  
        const RedirectUrls = this.props.parse.parse.Object.extend("Redirecturl");
        const query = new this.props.parse.parse.Query(RedirectUrls);
        var urls = []
        urls = await query.find();
       
        
        //  now we loop through the results and add them all to
        //  to the celebraties list 
        this.setState({
          status : "done",
          urls : urls
          });
      }catch(exception){
        //  do something here like say there was an error and to 
        //  refersh here 
        debugger
        this.setState({
          status : "error" ,
          urls : []
        })
      }
      
    }
    render(){
      
      var items = [];
      for(let i=0;i<this.state.urls.length;i++){
          
        items.push(
          < LinksListItem redirecturl={this.state.urls[i].id}
          id={this.state.urls[i].id}
          index={i + 1} />
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
        <Table>
            <LinksListHeader />
            <tbody>
                {body}
            </tbody>
        </Table>
      )
    }
  }
  const LinksListHeader= (props)=>{
    
    return (<thead>
        <tr>
          <th>#</th>
          <th>Redirect Url</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>)
}
const LinksListItemBase = (props)=>{
    
    return (<tr onClick={()=>{
        //  on click go to the url for url details 
        props.history.push(ROUTES.LINKS_DASHBOARD+ "/" + props.id);
    }}>
        <th scope="row">{props.index}</th>
        <td>{props.redirecturl}</td>
        <td>{props.note ?? "no notes"}</td>
        <td>Archive</td>
      </tr>)
}
const  LinksListItem = compose(
    withRouter,
    withParse,
  )(LinksListItemBase)

export const NewLinkButton = (props) => {
    return <Button outline  tag={Link} to="/links/new"  color="success">New Tracking Link</Button>
}
const LinksList = withParse(LinksListListBase);
export default withParse(LinksLandingPage);