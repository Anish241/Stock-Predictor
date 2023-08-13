import React from 'react'
import Wrapper from '../components/Wrapper'
import './ODF.css'
import { useState } from 'react'
import { onePred } from '../api/symbols'
const OneDayForm = () => {
    const [Symbol, setSymbol] = useState("")
    const onSub = async (e)=>{
        e.preventDefault();
        //remove spaces from symbol
        var sym = Symbol.replace(/\s/g, '');
        sym = sym.toUpperCase();
        // add .NS if not present
        if(!sym.includes('.NS')){
            sym = sym + '.NS'
        }
        
        const res = await onePred(sym);
        const data = res.data;
        localStorage.setItem('Next_Day_Close',data.Next_Day_Close)
        localStorage.setItem('Next_Day_Open',data.Next_Day_Open)
        localStorage.setItem('Next_Day_High',data.Next_Day_High)
        localStorage.setItem('Next_Day_Low',data.Next_Day_Low)
        localStorage.setItem('Symbol',sym)

        window.location.href = '/onedayresult'
        
    }
  return (
    <>
        <div className='main-c'>
        <Wrapper/>
        <div className='Boxo'>
            <h2 className='tii'>Next Day Prediction</h2>
            <input type="text" placeholder='Enter the stock symbol' className='in' name="" id="" onChange={(e)=>{setSymbol(e.target.value)}} required/>
            <button className='btn' color='white' onClick={onSub} >Predict</button>
        </div>
        </div>
    </>
  )
}

export default OneDayForm