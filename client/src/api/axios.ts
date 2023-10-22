import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});
