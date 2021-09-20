import axios from "axios";

const jwtToken = localStorage.getItem("JWT_REPORTS");
console.log(jwtToken);

export default axios.create({
  baseURL: "http://localhost:1337",
 // baseURL: "https://salty-ravine-75314.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
    authorization: `bearer ${jwtToken}`,
  },
});
