import axios from 'axios'
const weatherKey = import.meta.env.VITE_WEATHER_KEY


const baseURL = 'https://studies.cs.helsinki.fi/restcountries/';

const getNameArr = () => {
    return axios.get(`${baseURL}/api/all`)
        .then((res)=>res.data.map((el)=>el.name.common));
};

const getOneCountry = (name) => {
    return axios.get(`${baseURL}/api/name/${name}`).then(res=>res.data);
};

const getWeather = (lat, lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
        .then((res)=>res.data);
}

export default {getNameArr, getOneCountry, getWeather};