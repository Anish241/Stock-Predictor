import React from 'react'
import Wrapper from '../components/Wrapper'
import './ODF.css'
import { useState } from 'react'

const OneDayResult = () => {
   var Next_Day_Close = localStorage.getItem('Next_Day_Close')
    var Next_Day_Open = localStorage.getItem('Next_Day_Open')
    var Next_Day_High = localStorage.getItem('Next_Day_High')
    var Next_Day_Low = localStorage.getItem('Next_Day_Low')

    Next_Day_Close = parseFloat(Next_Day_Close).toFixed(2)
    Next_Day_Open = parseFloat(Next_Day_Open).toFixed(2)
    Next_Day_High = parseFloat(Next_Day_High).toFixed(2)
    Next_Day_Low = parseFloat(Next_Day_Low).toFixed(2)



    var sym = localStorage.getItem('Symbol')
    sym = sym.replace('.NS','')
    
  return (
    <>

    <div className='main-c'>
        <Wrapper/>
        <div className='re-ti' >{sym}</div>
        <div className='Boxr'>
            <div className='Box1'>
                <div>
                    <div className='parah'>Next Day Open</div>
                    
                </div>
                <div>
                    <div className='parah1' >₹{Next_Day_Open}</div>
                </div>
            </div>
            <div className='Box1'>
                <div>
                    <div className='parah'>Next Day High</div>
                </div>
                <div>
                    <div className='parah1' >₹{Next_Day_High}</div>
                </div>
            </div>
            <div className='Box1'>
                <div>
                    <div className='parah' >Next Day Low</div>
                </div>
                <div>
                    <div className='parah1' >₹{Next_Day_Low}</div>
                </div>
            </div>
            <div className='Box1'>
                <div>
                    <div className='parah'>Next Day Close</div>
                </div>
                <div>
                    <div className='parah1' >₹{Next_Day_Close}</div>
                </div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default OneDayResult