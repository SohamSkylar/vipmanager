import axios from "axios";

const BASE_URL = "http://localhost:8001/api";

export async function registerUser(userdetails) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`${BASE_URL}/register`, userdetails);

    // let { username, email } = userdetails;
    console.log(msg);
    if (status === 409 || status === 410 || status === 411) {
      return Promise.reject(status);
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function registerAdmin(admindetails) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`${BASE_URL}/addadmin`, admindetails);

    // let { username, email } = userdetails;
    console.log(msg);
    if (status === 409 || status === 410 || status === 411) {
      return Promise.reject(status);
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function loginUser(userdetails) {
  try {
    const {
      data: { msg, token },
      status,
    } = await axios.post(`${BASE_URL}/login`, userdetails);
    if (status === 200) return Promise.resolve(token);
    else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function loginAdmin(admindetails) {
  try {
    const {
      data: { msg, token },
      status,
    } = await axios.post(`${BASE_URL}/adminlogger`, admindetails);
    if (status === 200) return Promise.resolve(token);
    else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put(`${BASE_URL}/update`, response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: " Couldn't Update User..." });
  }
}

export async function activeUser() {
  try {
    const userToken = await localStorage.getItem("token");
    const { data: {type}, status } = await axios.get(`${BASE_URL}/auth`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
      return Promise.resolve(type);
    
  } catch (err) {
    return Promise.reject({ error: "Auth Failed" });
  }
}

// export async function generateOTP(username){
//   try{
//     const {data: {code}, status} = await axios.get("http://localhost:8001/api/generateOTP", {params: username})
//     if(status === 201){
//       let {data:{email}} = await getUser({username});
//       let text = `Your Password Recovery OTP is ${code}. Verify and Recover Password`;
//       await axios.post('http://localhost:8001/api/registerMail', {username, userEmail: email, text, subject: "Password Recovery OTP" })
//     }
//     return Promise.resolve(code);
//   }catch(error){
//     return Promise.reject({error});
//   }
// }

// export async function getUser({ username }){
//   try{
//     const {data} = await axios.get(`http://localhost:8001/api/user${username}`)
//     return data;

//   }catch(error){
//     return {error:"Password Doesnt Match.."}
// }

// }
