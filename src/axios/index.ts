import axios from "axios";

// axios.defaults.baseURL = "https://icanhazdadjoke.com/";
axios.defaults.baseURL = "https://randomuser.me/api/";
// axios.defaults.headers["Accept"] = "application/json";
// common 사용해도 됨
axios.defaults.headers.common["Accept"] = "application/json";
console.log(axios.defaults);
