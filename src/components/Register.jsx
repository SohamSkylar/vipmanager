import React from "react";
import { TiUser } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerUserValidate } from "../helper/validate";
import { useState } from "react";
import convertToBase64 from "../helper/convertToBase64.jsx";
import { registerUser } from "../helper/apiEndpoints";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState("");
  const [imgReady, setImgReady] = useState(false);
  const [errorToast, setErrorToast] = useState();
  const navigate = useNavigate();

  const successFunc = () => {
    navigate('/');
    return <b>Registered!</b>
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
    validate: registerUserValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profilePic: file || "" });
      let registerPromise = await registerUser(values);
      if (
        registerPromise
          .then((resolve) => {
            toast.promise(registerPromise, {
              loading: "registering...",
              success: successFunc,
              error: <b>Registration Failure Occured!</b>
            })
          }, (reject) => {
              if(reject === 409){
                toast.error("Username already Exists")
              }else if(reject === 410){
                toast.error("Email already Exists")
              }
            })
          .catch((status) => {
            if (status === 409) return true;
          })
      ) {
        setErrorToast(true);
      } else {
        setErrorToast(false);
      }

    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    setImgReady(true);
  };

  const setProfilePic = () => {
    if (imgReady) {
      return (
        <img
          src={file}
          alt="Profile Pic"
          className="max-w-[12rem] w-full h-[10rem] rounded-full shadow-sm bg-slate-100 hover: cursor-pointer"
        />
      );
    } else {
      return (
        <TiUser className="max-w-[12rem] w-full h-[10rem] rounded-full shadow-sm bg-slate-100 hover: cursor-pointer" />
      );
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center min-h-screen">
        <div className="block p-6 rounded-lg shadow-xl bg-white max-w-sm w-full">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-full text-center text-gray-500">
              Please provide the details below
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profilePic">{setProfilePic()}</label>
              <input
                onChange={onUpload}
                type="file"
                id="profilePic"
                name="profilePic"
              />
            </div>
            <div className="textbox flex flex-col items-center py-4">
              <div className="gap-5 textbox flex flex-col items-center py-4 w-full">
                <input
                  type="text"
                  {...formik.getFieldProps("name")}
                  placeholder="Full Name"
                  className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  placeholder="Email"
                  className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="text"
                  {...formik.getFieldProps("username")}
                  placeholder="Unique username"
                  className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-block px-7 py-2.5 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already a Member?
                <a href="/" className="text-red-500 pl-1">
                  Login
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
