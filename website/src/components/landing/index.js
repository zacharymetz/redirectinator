import React from 'react';


import { NewLinkForm } from '../Links/New';

class LandingPage extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <div style={{
            padding:"4rem 0.5rem",
            backgroundColor : "#2A2B2DFF",
            marginBottom:"2rem"
          }}>
          <h2 class="container">
            Create and Track URLS and Whatever Opens Them 
          </h2>
        </div>
        <div class="container">
        < NewLinkForm />
        </div>
      </div>
    )
  }
}

export default LandingPage;