// src/services/api.js
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost/elaine_charm_backend"  // Caminho até minha pasta PHP no XAMPP
// });

// const api = axios.create({
//   baseURL: "https://elaines-charm.infinityfreeapp.com"
// });

// Em src/services/api.js
const api = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://elaines-charm.infinityfreeapp.com",
  // headers: {
  //   "Content-Type": "application/json"
  // }
});

export default api;