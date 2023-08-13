import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Form,Auth,Dashboard,OneDayForm,OneDayResult,News,FifDayForm} from './pages';
import Wrapper from './components/Wrapper';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth/>} />
        <Route path ="/" element ={<Dashboard/>}/>
        <Route path='/onedaypred' element={<OneDayForm/>} />
        <Route path='/onedayresult' element={<OneDayResult/>} />
        <Route path='/news' element={<News/>} />
        <Route path='/fifteenpred' element={<FifDayForm/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App