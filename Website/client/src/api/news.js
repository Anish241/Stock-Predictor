import axios from "axios";

const url = 'http://127.0.0.1:8000/news'

const getNews = async (symbol) => {
    try {
        const { data } = await axios.post(url, { symbol });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        
    }
}

export {getNews}