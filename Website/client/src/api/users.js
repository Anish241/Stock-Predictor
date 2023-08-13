import React, { useState } from "react";
import axios from "axios";

const url1 = 'http://localhost:3001/api/users/login'
const url2 = 'http://localhost:3001/api/users/register'

const loginn = async (username,password) => {
    try {
        const { data } = await axios.post(url1, { username, password });
        console.log(data);
        if (data.message == "User logged in successfully")
        {
            console.log(data.user);
            localStorage.setItem("token", username);
            localStorage.setItem("username", username);
            localStorage.setItem("Name", data.user.Name);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("symbols", data.user.symbols);
            window.location.href = "/";
        }
        else{
            alert(data.message);
        }
    } catch (error) {
        alert(error.response.data.message);
        
    }
};

const register = async (Name,username,email,password) => {
    try {
        const { data } = await axios.post(url2, { Name,username,email,password });
        console.log(data);
        alert(data.message);

    } catch (error) {
        alert(error.response.data.message);
        
    }
};



export {loginn,register}

