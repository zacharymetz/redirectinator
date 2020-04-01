import React, {Component} from 'react';
import { withParse } from '../parse';
import './links.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table } from 'reactstrap';

class LinkDashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
        status : "loading",
        data : null,
        urlObject : null
        }


        this.loadLinkData();
    }


    async loadLinkData(){
        const RedirectUrl = this.props.parse.parse.Object.extend("Redirecturl");
        const query = new this.props.parse.parse.Query(RedirectUrl);
        query.equalTo("objectId", this.props.match.params.id);
        const results = await query.first();
        
        // Do something with the returned Parse.Object values
        
        var object = results.attributes;
        console.log(object)
        this.setState({
          status : "done",
          data : object,
          urlObject : results
        });

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
                <h2 style={{textAlign: "left"}}>Tracking And Logs</h2>
            </div>
            </div>
            <div class="container">
                <LinkInfo
                linkData={this.state.data}
                />
                <LinkLogs 
                linkID={this.props.match.params.id}
                linkobject={this.state.urlObject} />
            </div>
        </div>
        )
    }
}


class LinkInfo extends React.Component{
    constructor(props) {
        super(props)
        this.setState({
        urls : []
        })
    }


    


    render(){
        var list;
        if(this.props.linkData){
            list = (<div>
                <LinkDataItem
                title ="Original Url"
                data ={this.props.linkData.url}
                />
                <LinkDataItem
                title ="New Url"
                data ={this.props.linkData.redirecturl  }
                />
                <LinkDataItem
                title ="Enhanced Tracking"
                data ={this.props.linkData.enhancedTrack}
                />
                <LinkDataItem
                title ="Geo Tracking"
                data ={this.props.linkData.geoLog}
                />
            </div>)
        }
        
        return (
        <div  style={{
            padding:"2rem 0.5rem",
            color : "#D9514EFF",
            marginBottom:"2rem",
            textAlign : "left"
        }}>
            <div className="container">
            <h4>Link Info:</h4>
             {list}
             
            </div>
            
        </div>
        )
    }
}
const LinkDataItem = (props)=>{
    return(
        <div style={{display : "flex"}}>
            <div>
                {props.title} : 
            </div>
            <div>
            {props.data}
            </div>
        </div>
    )
}

class LinkLogsBase extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
        logs : [],
        modalOpen : false,
        modalContent : {}
        }
        this.loadLinkData();
    }


    async loadLinkData(){
        const RedirectLogs = this.props.parse.parse.Object.extend("Redirectlog");
        const query = new this.props.parse.parse.Query(RedirectLogs);
        debugger
        console.log(this.props)
        query.equalTo("linkobject",{
                __type: 'Pointer',
                className: 'Redirecturl',
                objectId: this.props.linkID
                } )
        const results = await query.find();


        let logs = []
        for(let i in results){
            logs.push(results[i].attributes)
        }
        this.setState({
            logs :logs
        });
    }
    toggleModal(){
        this.setState({modalOpen:!this.state.modalOpen});
    }
    openModal(content={}){
        this.setState({
            openModal : true,
            modalContent : content
        })
    }


    render(){
        var _this = this;
        var logs = [];
        for(let i in this.state.logs){
            logs.push(
                <LogTableItem
                created_at={' '}
                ip={' '}
                location={' '}  
                userAgent={' '}
                HostName={' '} 
                ISP={' '} 
                onClick={()=>{
                    _this.toggleModal()
                }}
                />
            )
        }
        return (
            
            <div style={{
                padding:"2rem 0.5rem",
                color : "#D9514EFF",
                marginBottom:"2rem",
                textAlign: "left"
            }}>
            <div class="container">
                <h4 style={{display : "flex"}}>Server Logs: 
                    <div style={{flex:"1",display : "flex",justifyContent : "flex-end"}}>
                    {logs.length} : Log Count
                    </div>
                </h4>
                <Table>
                    <LogTableHeader />
                    <tbody>
                        {logs}
                    </tbody>
                </Table>
                
            </div>
            < InfoModal 
            open={this.state.modalOpen}
            content={[1,2,3,4]}
            toggle={()=>{
                _this.toggleModal()
            }} />
             
        </div>
        )
    }
}
const LinkLogs = withParse(LinkLogsBase)
const LogTable = (props)=>{
    debugger
    return(<Table>
        {props.childern}
    </Table>)
}
const LogTableHeader = (props)=>{
    return(
        <thead>
        <tr>
          <th>Timestamp</th>
          <th>IP</th>
          <th>Location</th>
          <th>User Agent</th>
          <th>HostName</th>
          <th>ISP</th>
          <th></th>
        </tr>
      </thead>
    )
}
const LogTableItem = (props)=>{
    return (<tr onClick={props.onClick}>
        <td>{props.created_at}</td>
        <td>{props.ip}</td>
        <td>{props.location  }</td>
        <td>{props.userAgent}</td>
        <td>{props.HostName}</td>
        <td>{props.ISP}</td>
        <td>
            <a href="#">
                More Info
            </a>
        </td>
      </tr>)
}
const InfoModal =(props)=>{

    //  for the content 
    /**
     * {
     *  "title",
     *  "value"
     * }
     */
    var items = [];
    for(let i in props.content){
        items.push(<ModalTableItem 
            title="title"
            value="value"
        />)
    }
    return (<Modal style={{}} isOpen={props.open}    >
                <ModalHeader  style={{color:"white"}}>All Log Info</ModalHeader>
                <ModalBody>
                    <Table>
                        <tbody>
                            {items}
                        </tbody>
                        
                    </Table>
                    
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Export JSON</Button>{''}
                <Button color="secondary" onClick={props.toggle}>Close</Button>
                </ModalFooter>
            </Modal>)
}


const ModalTableItem = (props)=>{
    return(
        <tr onClick={props.onClick}>
         
            <th scope="row">{props.title}</th>
            <td>{props.value}</td>
        </tr>
    )
}
export default withParse(LinkDashboard);