import axios from 'axios';

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
        .then(res => res.data);

}

const add = (newPerson) => {
    return axios.post('http://localhost:3001/persons', newPerson)
        .then(res => res.data);
}

const delAndReturnAll = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
        .then(()=> getAll());
}

const update = (id, updatedPerson) => {
    return axios.put(`http://localhost:3001/persons/${id}`, updatedPerson)
        .then(res => res.data);
}

export default {getAll, add, delAndReturnAll, update}