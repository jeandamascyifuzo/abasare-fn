import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const TOKEN = JSON.parse(localStorage.getItem('user'))?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export default axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type":"application/json", 
    "Accept": "application/json",
    token: `Bearer ${TOKEN}`
  },
});

export const refreshPage = () => {
  window.location.reload(false);
}