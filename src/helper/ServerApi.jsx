import axios from "axios";

const BASE_URL = "http://localhost:8001/api/server";

export async function addNewServer(serverdetails) {
  try {
    const {
      data: { msg, detail },
    } = await axios.post(`${BASE_URL}/add`, serverdetails);
    if(msg === "success") return Promise.resolve(msg);
    else return Promise.reject(detail)
  } catch (err) {
    return Promise.reject(err.message)
  }
}

export async function showAllServers() {
  try{
    const {data} = await axios.get(`${BASE_URL}`);
    //console.log(data)
    return Promise.resolve(data)
  }catch (err) {
    return Promise.reject(err.message)
  }
}
