import React, {useState, useEffect, createContext, useContext} from "react";
import {loadWeb3, loadBlockChainData, listenAccountChange, listenNetworkChange} from "../Components/Functions/web3"
import {useHistory} from "react-router-dom";
import AuthConext from "./authContext"

const UserContext = createContext();

function UserContextProvider(props) {

    const {loggedIn} = useContext(AuthConext);

    const history = useHistory();
    const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [tokenContract, setTokenContract] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Detect LogedIn User 
        if(loggedIn){
            setLoading(false);
            // console.log(user)
            //Detect MetaMask
            const metaMaskInstalled = typeof window.web3 !== 'undefined'
            setMetaMaskInstalled(metaMaskInstalled);
        
            if(metaMaskInstalled){
                loadWeb3(setMetaMaskInstalled);
                loadBlockChainData(setAccount,setNetworkId,setTokenContract);
                listenAccountChange(setAccount);
                listenNetworkChange(setNetworkId);
            }
        }
        else{
            history.push("/login", {from: "/home"});
        }
   
    },[]);

    return (
       <UserContext.Provider value={{
        metaMaskInstalled,
        account,
        networkId,
        tokenContract,
        loading,
        history

       }}>
           {props.children}
       </UserContext.Provider>
    )
}

export default UserContext;
export {UserContextProvider}

