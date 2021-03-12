import React from "react";
import axios from "axios";
import Routes from "./Routes";
import {AuthContextProvider} from "./Contexts/authContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}

export default App;
