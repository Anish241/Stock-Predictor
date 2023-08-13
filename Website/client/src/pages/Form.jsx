import React from 'react'
import './Home.css'
import { useState } from 'react'
import axios from 'axios';



const Form = () => {
    // const user = localStorage.getItem("user");
    // const token = localStorage.getItem("token");

    // if (user == null || token == null) {
    //     window.location = '/'
    // }

    const [Symbol, setSymbol] = useState('')
    const gencsv = async (e) => {
        e.preventDefault()
        var sym = Symbol 
        sym = sym.replace(/\s/g, '');
        sym = sym.toUpperCase();
        
        await axios.post('http://localhost:3001/api/symbols', {symbol: sym})
        .then(res => {
            console.log(res.data)
            window.location = '/form'
        })
        
        


    }
  return (
    <>
        <div className='main-container'>

            <div className='input-container'>
                <input className='input-box' type='text' placeholder='Enter Stock Symbol'
                 onChange={
                    (e) => setSymbol(e.target.value)
                 }
                />
            </div>
            {/* Make submit button */}
            <div className='submit-container'>
                <button className='submit-button' onClick={gencsv}>Submit</button>
            </div>

        </div>


    </>
  )
}

export default Form