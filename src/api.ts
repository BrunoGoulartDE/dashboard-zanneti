import axios from "axios";
import appsettings from "../appsettings.json";

const api = axios.create({
  baseURL: appsettings.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
