import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:10000/api'
});

export default instance