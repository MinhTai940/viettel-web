import axios from "axios"

const API = axios.create({
    baseURL: "https://viettel-web.onrender.com/api"
})

export default API