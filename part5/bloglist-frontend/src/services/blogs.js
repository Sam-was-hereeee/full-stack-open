import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (data) => {
  const config = {
    headers: {Authorization: 'Bearer ' + data.token}
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export default { getAll, create }