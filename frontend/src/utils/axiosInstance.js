import axios from "axios";

// Axios Interceptor Instance
const baseURL = "https://d1cbfvoaqkpuni.cloudfront.net/api/v1";

const AxiosInstance = axios.create({
  baseURL,
});


export default AxiosInstance;
