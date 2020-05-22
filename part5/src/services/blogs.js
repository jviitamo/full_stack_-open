import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const edit = (id, newObject) => {
  console.log(`${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { 'Authorization': token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create, edit, remove }