import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../../Contexts/userContext";

export default function Index() {

  const {metaMaskInstalled,account,networkId,tokenContract,loading,history} = useContext(UserContext)

  const logOut = async() => {
    try{
      await axios.get("http://localhost:5000/auth/logout");

      history.push("/login", {from:"/home"});

    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      {
        !metaMaskInstalled
        ? <div>
          <p>Please Install Ethereum wallet first</p>
        </div>
        : <div>
          <p>{account}</p>
          <p>{networkId}</p>
        </div>
      }
      <button onClick={logOut}>LogOut</button>
    </div>
  );
}
