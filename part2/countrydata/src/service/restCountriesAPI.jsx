import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/';

const getNameArr = () => {
    return axios.get(`${baseURL}/api/all`)
        .then((res)=>res.data.map((el)=>el.name.common))
}

const getOneCountry = () => {}

export default {getNameArr, getOneCountry}