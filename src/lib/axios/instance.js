import axios from "axios";

const headers = {
 "Content-Type": "application/json",
 Accept: "application/json",
 "cache-control": "no-cache",
 Expires: 0,
};

const instance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_BASE_URL,
 headers: headers,
 withCredentials: true,
 timeout: 60 * 1000,
});

instance.interceptors.response.use(
 (config) => config,
 (error) => Promise.reject(error)
);

instance.interceptors.request.use(
 (response) => response,
 (error) => Promise.reject(error)
);

export default instance;
