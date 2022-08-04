import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://heyblogit.herokuapp.com/api"
})