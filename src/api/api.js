import axios from "axios"

const API = axios.create({
    baseURL: "https://ecommerce-recommendation-backend-xijg.onrender.com"
})

export default API