import axios from "axios";

const url1 = 'http://localhost:3001/api/symbols/onePred'

const onePred = async (symbol) => {
    try {
        const { data } = await axios.post(url1, { symbol });
        console.log(data);
        return data;
    } catch (error) {
        alert(error.response.data.message);
        
    }
}

export {onePred}