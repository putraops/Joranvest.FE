import axios from 'axios'

var user = JSON.parse(localStorage.getItem("joranvestUser"))

const instance = axios.create({
    baseURL: 'http://localhost:10000/api',
    headers: {'Authorization': user ? user.token : null}
});

export default instance