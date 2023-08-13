import React from 'react'
import Wrapper from '../components/Wrapper'
import './ODF.css'
import { useState } from 'react'
import { getFp } from '../api/fp'

const FifDayForm = () => {
    const [Symbol, setSymbol] = useState("")
    const[isLoaded,setIsLoaded] = useState(true)
    const onSub = async (e)=>{
        e.preventDefault();
        //remove spaces from symbol
        var sym = Symbol.replace(/\s/g, '');
        sym = sym.toUpperCase();
        // add .NS if not present
        if(!sym.includes('.NS')){
            sym = sym + '.NS'
        }

        setIsLoaded(false)
        
        const res = await getFp(sym);

        setIsLoaded(true)

        

    }
  return (
    <>
       {isLoaded &&
        <div className='main-c'>
        <Wrapper/>
        <div className='Boxo'>
            <h2 className='tiii'>Next 15 Days Prediction</h2>
            <input type="text" placeholder='Enter the stock symbol' className='in' name="" id="" onChange={(e)=>{setSymbol(e.target.value)}} required/>
            <button className='btn' color='white' onClick={onSub}  >Predict</button>
        </div>
        </div>}
        {!isLoaded &&
        <div className='main-c'>
        <Wrapper/>
        <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      </div>
        </div>
        }
    </>
  )
}

export default FifDayForm