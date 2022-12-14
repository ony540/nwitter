import React from "react";
import {Link} from "react-router-dom"

function Navigation({userObj}) {
  return(
    <nav>
        <ul>
          <li><Link to="/"> Home</Link> </li>
          <li><Link to="/profile">
            {userObj.displayName.length ? `${userObj.displayName}'s Profile` : "Profile"}</Link> 
           </li>
        </ul>
        </nav>
  )
};

export default Navigation;
