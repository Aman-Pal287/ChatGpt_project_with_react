import axios from "axios";

const instance = axios.create({
  baseURL: "https://chatgpt-clone-p4mh.onrender.com",
});

export default instance;
