import React from "react";
import { BrowserRouter as Router,
    Route,
    Routes 
} from "react-router-dom";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

function AppRouter ({refreshUser, isLoggedIn, userObj}) {
    return <Router>
        {isLoggedIn && <Navigation  userObj={userObj}/>}
    <Routes>
        {isLoggedIn ? (
        <>
         <Route exact path="/" element={<Home userObj={userObj} />}  />
         <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}  />
        </>) : (
        <Route exact path="/" element={<Auth />} />
        
        )}

    </Routes>
</Router>

} 

export default AppRouter;
