import axios from "axios";

export const api = axios.create({
    baseURL: "https://academia-nho8.onrender.com/"  // produccion
});