import axios from 'axios'

const apiRequest = axios.create({
    baseURL: 'https://ecommerce-5f81f-default-rtdb.firebaseio.com'
})

export default apiRequest