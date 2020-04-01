
import React from 'react'
import logo from './brand.svg'

const Footer = (props) =>{
    return (
        <footer class="container py-5">
            <div class="row">
                <div class="col-12 col-md">
                <img src={logo} style={{width:"2.5rem",marginBottom : "0.75rem"}} />
                <small class="d-block mb-3 text-muted">© 2020</small>
                </div>
                <div class="col-6 col-md">
                <h5 class="text-muted">Features</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="#">Celebrities Footprint</a></li>
                    <li><a class="text-muted" href="#">Compare Footprints</a></li>
                    <li><a class="text-muted" href="#">Add Carbon Tip</a></li>
                    <li><a class="text-muted" href="#">Graphs</a></li>
                    <li><a class="text-muted" href="#">Sharing And Embedding</a></li>
                </ul>
                </div>
                <div class="col-6 col-md">
                <h5 class="text-muted">Resources</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="#">Resource</a></li>
                    <li><a class="text-muted" href="#">Resource name</a></li>
                    <li><a class="text-muted" href="#">Another resource</a></li>
                    <li><a class="text-muted" href="#">Final resource</a></li>
                </ul>
                </div>
                
                <div class="col-6 col-md">
                <h5 class="text-muted">About</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="#">Methodology</a></li>
                    <li><a class="text-muted" href="#">Privacy</a></li>
                    <li><a class="text-muted" href="#">Terms</a></li>
                </ul>
                </div>
            </div>
        </footer>
    )
}


export default Footer;