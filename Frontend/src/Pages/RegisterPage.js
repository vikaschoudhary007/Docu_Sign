import React, { useState} from 'react';
import Form from "../Components/Forms/registerForm";
import {useHistory} from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const history = useHistory();
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        password:""
    });


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {
        try{

            e.preventDefault();
        // call the signIn api
            

        await axios.post("http://localhost:5000/auth/signup", userData);

        history.push("/home", {from:"/signup"});

        }catch(err){
            console.log(err)
        }
       
    }

    return (
        <div>
            <Form 
              userData={userData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}  
            />
        </div>
    )
}

