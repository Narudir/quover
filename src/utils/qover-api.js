import axios from 'axios';

const BASE_URL = 'https://qover-test.apigee.net';
const API_KEY = 'vuRSkbbMpqujS0F2yhkuFnDVJ32znJIN';

function login(email, password) {
    const url = `${BASE_URL}/authentication/authenticate?apikey=${API_KEY}`;
    return axios
    .post(url, {
        email: email,
        password: password
    })
    .then(
        (response) => response.data.data.token)
    .catch((e) => console.log(e));
}

function logout(token) {
    const url = `${BASE_URL}/authentication/logout?apikey=${API_KEY}`;
    var config = {
        headers: {
            'Content-Type': 'application/json',
            'Qover-Api-Version': 1.0,
            'Authorization': `Bearer ${token}`       
        }
    };
    return axios.post(url, {}, config)
    .then((response) => response.data.data.status)
    .catch((e) => console.log(e));
}

export {login, logout}