import axios from "axios";

export default axios.create({
 // baseURL: "http://localhost:1337",
  baseURL: "https://salty-ravine-75314.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
