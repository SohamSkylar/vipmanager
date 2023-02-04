import axios from "axios";

export async function registerUser(userdetails) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("http://localhost:8001/api/register", userdetails);

    // let { username, email } = userdetails;
    console.log(msg);
    if (status === 409) {
      return Promise.reject(status);
    }
    else if (status === 410) {
      return Promise.reject(status);
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updateUser(response){
  try{
    const token = await localStorage.getItem('token');
    const data = await axios.put("http://localhost:8001/api/update", response, {headers: {"Authorization": `Bearer ${token}`}})
    return Promise.resolve({data})
  }catch(error){
    return Promise.reject({error:" Couldn't Update User..."})
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

