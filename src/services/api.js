// src/services/api.js
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost/elaine_charm_backend"  // Caminho até minha pasta PHP no XAMPP
// });

const api = axios.create({
  baseURL: "https://elaines-charm.infinityfreeapp.com"
});

export default api;