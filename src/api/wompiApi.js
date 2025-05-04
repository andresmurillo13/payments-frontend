import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const wompiApi = axios.create({
    baseURL: VITE_API_URL
});


wompiApi.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
        }
        return config;
    }
);

export default wompiApi;