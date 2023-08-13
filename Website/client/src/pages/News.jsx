import React from 'react'
import './ODF.css'
import Wrapper from '../components/Wrapper'
import { useState } from 'react'
import { getNews } from '../api/news'

const News = () => {
    const [Symbol, setSymbol] = useState("")
    const onSub = async (e)=>{
        e.preventDefault();
        const res = await getNews(Symbol);
        console.log(res.data)
    }
  return (
    <>

<div className='main-c'>
        <Wrapper/>
        <div className='Boxo'>
            <h2 className='tiii'>News Sentiment Analysis</h2>
            <input type="text" placeholder='Enter the Company Name' className='in' name="" id="" onChange={(e)=>{setSymbol(e.target.value)}} required/>
            <button className='btn' color='white' onClick={onSub} >Predict</button>
        </div>
</div>

    </>
  )
}

export default News