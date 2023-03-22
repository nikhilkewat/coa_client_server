import axios from "axios";
import { keys } from "../../config/dev";
// import CryptoJS from "crypto-js";

const instance = axios.create({
    baseURL: keys.ServicePath,
    // transformRequest: [
    //     (data, headers) => {
    //         // Do whatever you want to transform the data
    //         const ciphertext = CryptoJS.AES.encrypt(
    //             JSON.stringify(data),
    //             "DAAMAgency"
    //         ).toString();
    //         headers["token"] = sessionStorage.getItem("aceessToken");
    //         return { data: ciphertext };
    //     },
    //     ...axios.defaults.transformRequest,
    // ],
    // transformResponse: [
    //     (data, headers) => {
    //         // Do whatever you want to transform the data
    //         const bytes = CryptoJS.AES.decrypt(data, "DAAMAgency");
    //         const originalBody = bytes.toString(CryptoJS.enc.Utf8);
    //         return JSON.parse(originalBody);
    //     },
    //     ...axios.defaults.transformResponse,
    // ],
});

export const setAuthorizationToken = (token: any) => {
    if (token) {

        instance.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["token"] = token;
    } else {
        delete instance.defaults.headers.common["token"];
        delete axios.defaults.headers.common["token"];
    }
};

export default instance;
