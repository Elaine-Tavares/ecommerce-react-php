// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/elaines_charm_backend"  // Caminho até minha pasta PHP no XAMPP
});


export default api;