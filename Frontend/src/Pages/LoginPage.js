import React, {useEffect, useState} from 'react';
import Form from "../Components/Forms/loginForm";
import {useHistory} from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
    const history = useHistory();
    const [userData, setUserData] = useState({
        email:"",
        password:"",
        isChecked: false
    });

    useEffect(() => {
        if(localStorage.checkbox && localStorage.email !== ""){
            setUserData({
                ...userData,
                email: localStorage.username,
                isChecked: true
            })
        }
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        });
    }

    const handleChangeCheckbox = (e) => {
        setUserData({
            ...userData,
            isChecked: e.target.checked
        })
    }

    const handleSubmit = async (e) => {
       try{
            e.preventDefault();
            if(userData.isChecked && userData.email !==""){
                localStorage.username = userData.email
                localStorage.checkbox = userData.isChecked
            }
            // call the signIn api
            const email = userData.email;
            const password = userData.password; 

            await axios.post("http://localhost:5000/auth/login", userData);

            history.push("/home", {from:"/login"});

       }catch(err){
           console.log(err)
       }
    }

    return (
        <div>
            <Form 
              userData={userData}
              handleChange={handleChange}
              handleChangeCheckbox={handleChangeCheckbox}
              handleSubmit={handleSubmit}  
            />
        </div>
    )
}
