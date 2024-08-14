import axios from 'axios';

const getAll = () => {
    return axios.get('http://localhost:3001/persons').then(res => res.data);

}

const add = (newPerson) => {
    return axios.post('http://localhost:3001/persons', newPerson).then(res => res.data);
}

const delAndReturnAll = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
        .then(()=> getAll());
}

export default {getAll, add, delAndReturnAll}