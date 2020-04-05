
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-backend-36ea8.firebaseio.com/'
})

export default instance;