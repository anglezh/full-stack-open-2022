import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const creat = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`, id)
    return request.then(response => response.status)
}
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
const exportObject = { getAll, creat, remove, update }
export default exportObject