import axios from "axios";

// Axios Interceptor Instance
const baseURL = "http://localhost:8008/api/v1";

const AxiosInstance = axios.create({
  baseURL,
});


export default AxiosInstance;
