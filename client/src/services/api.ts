import axios from "axios";

import { API } from "../utils/constants";

const api = axios.create({

    baseURL: API.BASE_URL,

    headers: {

        "Content-Type": "application/json"

    }

});

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem(

            API.TOKEN_KEY

        );

        if (token) {

            config.headers.Authorization =

                `Bearer ${token}`;

        }

        return config;

    }

);

export default api;