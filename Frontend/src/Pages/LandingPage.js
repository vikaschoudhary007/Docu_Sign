import React from 'react';
import {useHistory} from "react-router-dom";

export default function LandingPage() {

    const history = useHistory();
      
    return (
        <div>
            <h1>This is the Landing Page</h1>
            <button onClick={() => history.push("/signup", {from: "/"})}>Register</button>
            <button onClick={() => history.push("/login", {from: "/"})}>Login</button>
        </div>
    )
}
