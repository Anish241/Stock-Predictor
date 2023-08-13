import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
from 'mdb-react-ui-kit';
import './LR.css'
import { useState } from 'react';
import { loginn,register } from '../api/users';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Username, setUsername] = useState("")

    const onSubr = async (e)=>{
        e.preventDefault();
            if (Password !== ConfirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const res = await register(Name,Username,Email,Password);
            console.log(res)
            

        
    }
    const onSubl = async (e)=>{
        e.preventDefault();
        const res = await loginn(Username,Password);
        console.log(res)

            
    
    }

  return (
    <>
        <div className='main-container'>

            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-80'>
                    <MDBCol col='12'>
                    <MDBCard className='bg-dark text-white my-2 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                       <MDBCardBody className='p-3 d-flex flex-column align-items-center mx-auto w-100'>
                        <h2 className="fw-bold mb-2 text-uppercase">{isSignUp ? "Register" : "Login"}</h2>
                        <p className='text-white-50 mb-5'>{isSignUp ?"Fill in your details" : "Please Enter your Email Id and Password"}</p>
                        {isSignUp && <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Name' id='formControlLg' type='text' size="lg" onChange={(e)=>{setName(e.target.value)}} required/>}
                        {isSignUp && <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e)=>{setEmail(e.target.value)}} required/>}
                        <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size="lg" onChange={(e)=>{setUsername(e.target.value)}} required/>
                        <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>{setPassword(e.target.value)}} required/>
                        {isSignUp && <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Confirm Password' id='formControlLg' type='password' size="lg" onChange={(e)=>{setConfirmPassword(e.target.value)}} required/>}
                        {isSignUp && <button outline className='mx-2 px-5 lgn ' color='white' size='lg' onClick={onSubr}>Register</button>}
                        {!isSignUp && <button outline className='mx-2 px-5 lgn' color='white' size='lg' onClick={onSubl} > Login </button>}
                        <div className='d-flex flex-row mt-2 mb-2'>
                            <MDBBtn tag='a' color='none' className='m-2' style={{ color: 'white' }}>
                                <MDBIcon fab icon='google' size="lg"/>
                            </MDBBtn>
                        </div>
                        <div>
                            <p className="mb-0">{isSignUp ? "Already have an account?" : "Don't have an account?"} <a href="/" className="text-white-50 fw-bold" onClick={(e)=>{ e.preventDefault(); setIsSignUp(!isSignUp)}}>{isSignUp ? "Login" : "Sign Up"}</a></p>
                        </div>
                        </MDBCardBody>
                    </MDBCard>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </div>
    </>
  )
}

export default Auth