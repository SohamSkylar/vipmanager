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
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error.message);
  }
}
