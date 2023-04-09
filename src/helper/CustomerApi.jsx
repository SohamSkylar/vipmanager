import axios from "axios";

const BASE_URL = "http://localhost:8001/api/subs/customer";

export async function createCustomerTable(values) {
  const tableName = { tableName: values.name };
  try {
    const {
      data: { msg },
      data,
    } = await axios.post(`${BASE_URL}/createTable`, tableName);
    //console.log(data)
    if (msg === "success") return Promise.resolve();
    else return Promise.reject(data.err);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function addNewCustomer(customerdetails) {
  try {
    const {
      data: { msg },
    } = await axios.post(`${BASE_URL}/add`, customerdetails);
    if (msg === "success") return Promise.resolve(msg);
    else if (msg === "NO_USER_AVAILABLE") return Promise.reject(msg);
    else if (msg === "DUPLICATE_ENTRY") return Promise.reject(msg);
    else return Promise.reject(msg);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function fetchCustomerData(customerdetails) {
  // console.log("details: "+customerdetails)
  try {
    const { data } = await axios.get(`${BASE_URL}/id/${customerdetails}`);
    //console.log(data)
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function activeCustomer() {
  try {
    const userToken = await localStorage.getItem("token");
    const {
      data: { msg, userid },
    } = await axios.get(`${BASE_URL}/auth`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (msg === "success") return Promise.resolve(userid)
    else return Promise.reject(msg);
  } catch (err) {
    return Promise.reject({ error: "Customer Auth Failed" });
  }
}
