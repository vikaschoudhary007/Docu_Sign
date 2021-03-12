import React, { useContext } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import AuthContext from "./Contexts/authContext";

export default function Routes() {
    const {loggedIn} = useContext(AuthContext)
    return (
        <Router>
            <Switch>
                {/* {
                    loggedIn === false && <>
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/signup" component={RegisterPage}/>
                    </>
                }

                {
                    loggedIn === true && <>
                        <Route exact path="/home" component={HomePage}/>
                    </>
                } */}

                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={RegisterPage}/>
                <Route exact path="/home" component={HomePage}/>

            </Switch>
        </Router>
    )

}