import React, {Component} from 'react';
import { withParse } from '../parse';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddCarbonTipPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>
            < CarbonTipFormBase/>
        </div>)
    }
}

const INITAL_STATE = {
    type : "house", // the type of the carbon tip 
    value : {}  //  contains all the data for it 
}

class CarbonTipFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {... INITAL_STATE}
    }

    selectTipType(type='house'){
        //  okay so here we are going to set the state so it shows the 
        //  
        this.setState({type : type});
    }


    saveTip(event,_this){

    }



    render(){
        var body ;
        if(this.state.type == "house"){
            //  we create the sub form and its method to submit the data 
            body = <HouseForm formdata={this.state.value} submit={(data)=>{}} />;
        }else if(this.state.type == "plane"){
            body = <PlaneForm  formdata={this.state.value} submit={(data)=>{}}/>;
        }
        //  we have a selector that chooses which one we are gonna add 
        return (<div>
            <div>

            </div>
            <div>
                {body}
            </div>
            
        </div>)
    }
}


//  here are componets for each specific forms 
class HouseForm extends Component{
    constructor(props){
        super(props)
    }
    render(){
        //  here we want to select which form we are interested in 
        return (<div class="container" style={{color :"black"}}>
            <FormGroup>
                <Label for="examplePassword">Square Footage</Label>
                <Input type="number" name="password" id="examplePassword" placeholder="password placeholder" />
            </FormGroup>
        </div>)
    }
}
//  this one is for the plan form 
class PlaneForm extends Component{
    constructor(props){
        super(props)
    }
    render(){
        //  here we want to select which form we are interested in 
        return (<div>

        </div>)
    }
}



export default AddCarbonTipPage;