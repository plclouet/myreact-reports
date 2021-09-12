import axios from "axios";

const jwtToken = localStorage.getItem("JWT_REPORTS");
console.log(jwtToken);
export const API_URL = "http://localhost:1337";
// const API_URL = "https://salty-ravine-75314.herokuapp.com";

export default axios.create({
  baseURL: API_URL,
 // baseURL: "https://salty-ravine-75314.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    authorization: `bearer ${jwtToken}`,
  },
});
