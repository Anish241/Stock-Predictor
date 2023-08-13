import axios from 'axios';
const postSymbol = async (req, res) => {
    const { symbol } = req.body;

    try{
        const response = await axios.post('http://127.0.0.1:8000/', {symbol})
        const data = await response.data;
        res.status(200).json(data);
        return data;
        


        

    }catch(error){
        console.log(error);
    }
   
    

}

export{ postSymbol}