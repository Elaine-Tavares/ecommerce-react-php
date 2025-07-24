// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://elainetavaresweb.com"  
});

export default api;