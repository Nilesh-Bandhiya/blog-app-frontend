import axios from "axios";
import { APIS } from "../../constants/constants";
import { getLocalAccessToken } from "../getTokens";
import { getRefreshToken } from "../api/usersApi";

export const UserInstance = axios.create({
    baseURL: APIS.USERS_API,
});

UserInstance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

UserInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await getRefreshToken();
                    const { token } = rs.data;
                    localStorage.setItem("token", JSON.stringify(token));
                    UserInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                    return UserInstance(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export const BlogInstance = axios.create({
    baseURL: APIS.BLOGS_API,
});

BlogInstance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BlogInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await getRefreshToken();
                    const { token } = rs.data;
                    localStorage.setItem("token", JSON.stringify(token));
                    UserInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                    return UserInstance(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);
