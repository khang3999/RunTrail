import axios from "axios";

// Axios Interceptor Instance
const baseURL = process.env.BASE_URL
  ? process.env.BASE_URL
  : "http://localhost:8089/api/v1";


const AxiosInstance = axios.create({
  baseURL,
});


export default AxiosInstance;
