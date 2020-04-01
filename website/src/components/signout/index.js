import React from 'react';

import { withParse } from '../parse';
import { Link } from 'react-router-dom';
const SignOutButton = ({ parse }) => (
  <Link  class="nav-list-item" onClick={()=>{
    parse.parse.User.logOut().then(()=>{
      parse.parse.triggerOnAuthChange();
    });
  }}>
    Sign Out
  </Link>
);

export default withParse(SignOutButton);