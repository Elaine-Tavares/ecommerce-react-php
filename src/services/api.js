// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://elaines-charm.infinityfreeapp.com/"  // Caminho até minha pasta PHP no XAMPP
});


export default api;