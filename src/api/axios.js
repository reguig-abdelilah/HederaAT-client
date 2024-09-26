import axios from "axios"
// const BASE_URL = 'http://45.79.221.196' // remote 1
// const BASE_URL = 'http://skillfolio.xyz' // remote 2
const BASE_URL = `${window.location.protocol}//skillfolio.xyz` // remote 3
// const BASE_URL = 'http://localhost:3000'  // local

export default axios.create({
    baseURL: BASE_URL
})


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});