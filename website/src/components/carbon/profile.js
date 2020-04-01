import React, {Component} from 'react';
import { withParse } from '../parse';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as NUMERICAL from '../../constants/numerical';
import { Container,ListGroup, ListGroupItem ,Button,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import  './carbon.css'
class CarbonProfilePage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={{ color: "black"}}>
                <HouseProfile />
            </div>
        )
    }
}



class HouseProfileBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            residences : [],
            addSection : "",
            status : "loading"
        }
        this.loadData();
    }

    toggleShowAdd = () => {
        console.log("asdasd")
    
        if (this.state.addSection === '') {
          this.setState({
            addSection: 'toggled',
          })
        } else {
          this.setState({
            addSection : "",
          })
        }
    }
    

    //  loads the data from parse 
    async loadData(){
        const CarbonItem = this.props.parse.parse.Object.extend("CarbonItem");
        const query = new this.props.parse.parse.Query(CarbonItem);
        query.equalTo("CelebrityId", this.props.celebrityId);
        query.equalTo("type", "residence");
        const results = await query.find();
        
        // Do something with the returned Parse.Object values
    
        this.setState({
            status : "done",
            
            //residences : results
            residences : [
                {
                    location : "Monty Carlo",
                    sizeInSqft : 12500

                },
                {
                    location : "Malibu",
                    sizeInSqft : 12500

                },
                {
                    location : "Calgary",
                    sizeInSqft : 12500

                }
            ]
        });
    }

    render(){
        var _this = this;
        //  render the list of the items here 
        var residenceList = [];
        var sqftTotal = 0;
        for(let i=0;i<this.state.residences.length;i++){
            var {location, sizeInSqft} = this.state.residences[i];
            sqftTotal = sqftTotal + sizeInSqft;
            residenceList.push(
                <ListGroupItem style={{
                    display : "flex",
                }}>
                    {location}
                    <div style={{
                        flexGrow: 1,
                        textAlign :"right"
                    }}>
                        {sizeInSqft} sqft {' '}<Button size="sm"  color="warning">Edit</Button>
                    </div>
                </ListGroupItem>
            )
        }


        return (
            <Container style={{
                textAlign :"left",
                padding:"2rem"
            }}>
                <div>
                    <h3>Residences  <span style={{
                        marginLeft:"3rem",
                        fontSize : "1.25rem",
                        fontWeight : 400
                    }}>Est { Math.ceil(sqftTotal *NUMERICAL.AVERAGE_CO2_TONS_PER_SQFT_RES) } T of Co2 / Year</span></h3>
                    <div style={{
                        display : "flex",
                        flexDirection : "row",
                        marginBottom : "1.5rem"
                    }}>
                        <div className="text-muted" style={{
                            marginRight : "1rem"
                        }}>
                            Number of Properties : {this.state.residences.length}
                        </div>
                        <div className="text-muted">
                            Total Sqft : {sqftTotal}
                        </div>
                    </div>
                    <ListGroup>
                        {residenceList}
                        <ListGroupItem style={{display : "none"}} className={this.state.addSection}>
                            <ResidenceForm new />
                        </ListGroupItem>
                    </ListGroup>
                    <div style={{
                        marginTop : "1rem",
                        textAlign : "right"
                    }}>
                        
                        <Button onClick={()=>{_this.toggleShowAdd()}} color="secondary">Add New</Button>{' '}
                    </div>
                </div> 
            </Container>
        )
    }
}
const HouseProfile = withParse(HouseProfileBase);


class ResidenceFormBase extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div style={{
                display : "flex"
            }}>
                <Input type="text" />{' '}
                <div style={{ flexGrow : 1 }}></div>
                <Input type="number"/>{' '}
                <Button color="success">Add</Button>

            </div>
        )
    }
}
const ResidenceForm = withParse(ResidenceFormBase);

export default CarbonProfilePage;