import axios from "axios";

const API_URL = "https://icanhazdadjoke.com/";

export const dadJokeInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});
