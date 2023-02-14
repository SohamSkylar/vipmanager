import axios from "axios";

const BASE_URL = "http://localhost:8001/api/subs";

export async function addNewSub(subdetails) {
  try {
    const {
      data: { msg, detail },
    } = await axios.post(`${BASE_URL}/add`, subdetails);
    if(msg === "success") return Promise.resolve(msg);
    else return Promise.reject(detail)
  } catch (err) {
    return Promise.reject(err.message)
  }
}

export async function addNewServerSub(serverSubdetails) {
    try {
      const {
        data: { msg, detail },
      } = await axios.post(`${BASE_URL}/serversub/add`, serverSubdetails);
      if(msg === "success") return Promise.resolve(msg);
      else return Promise.reject(detail)
    } catch (err) {
      return Promise.reject(err.message)
    }
  }

export async function showAllServerSub() {
  try{
    const {data} = await axios.get(`${BASE_URL}/serversub`);
    //console.log(data)
    return Promise.resolve(data)
  }catch (err) {
    return Promise.reject(err.message)
  }
}

export async function showAllSub() {
    try{
      const {data} = await axios.get(`${BASE_URL}`);
      //console.log(data)
      return Promise.resolve(data)
    }catch (err) {
      return Promise.reject(err.message)
    }
  }
  
