import axios from 'axios';

const BASE_URL = 'https://qover-test.apigee.net';
const API_KEY = 'vuRSkbbMpqujS0F2yhkuFnDVJ32znJIN';
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Qover-Api-Version': "1.0"  
    }
};

function login(email, password) {
    const url = `${BASE_URL}/authentication/authenticate?apikey=${API_KEY}`;
    return axios
    .post(url, {
        email: email,
        password: password
    })
    .then(
        (response) => {
            config.headers['Authorization'] = `Bearer ${response.data.data.token}`;
            return response.data.data.token;
        })
    .catch((e) => console.log(e));
}

function logout(token) {
    const url = `${BASE_URL}/authentication/logout?apikey=${API_KEY}`;
    return axios.post(url, {}, config)
    .catch((e) => console.log(e));
}

function sendDraft(draft) {
    const url = `${BASE_URL}/be/motor/gap/drafts?apikey=${API_KEY}`;
    return axios
    .post(url, draft, config)
    .then((response) => response.data.draftId)
    .then((draftId) => getPricePlans(draftId))
    .catch((e) => console.log(e));
}

function getPricePlans(draftId) {
    const url = `${BASE_URL}/be/motor/gap/drafts/${draftId}/price-requests?apikey=${API_KEY}`;
    return axios
    .post(url, {}, config)
    .then((response) => response.data.prices)
    .catch((e) => console.log(e));
}

export {login, logout, sendDraft}