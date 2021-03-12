import React, { useContext } from 'react';
import Home from "../Components/Home";
import {UserContextProvider} from "../Contexts/userContext.js"

export default function HomePage() {

    return (
        <div>
            <UserContextProvider>
                <Home />
            </UserContextProvider>
        </div>
    )
}

