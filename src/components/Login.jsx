import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiUser } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { userValidate } from "../helper/validate";
import { loginAdmin, loginUser } from "../helper/UserApi";

const Login = (props) => {
  
  const navigate = useNavigate();
  
  const successFunc = () => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
    return <b>Logged in Successfully!</b>
  };

  const formik = useFormik({
    initialValues  : {
      username : '',
      password : ''
    },
    validate : userValidate ,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      
      // console.log(values)
      if(props.type === 'adminlogin'){
        var loginPromise = loginAdmin(values)
      } else {
        var loginPromise = loginUser(values);
      }
      toast.promise(loginPromise, {
        loading: "logging in",
        success: successFunc,
        error:  "login unsuccessful"
      })
      loginPromise.then(res => {
        localStorage.setItem('token', res)
      })
    }
  })

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center min-h-screen">
        <div className="block p-6 rounded-lg shadow-xl bg-white max-w-sm w-full">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Login</h4>
            <span className="py-4 text-xl w-full text-center text-gray-500">
              login to use our website
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-2">
              <TiUser className="max-w-[12rem] w-full h-auto rounded-full shadow-sm bg-slate-100" />
            </div>
            <div className="textbox flex flex-col items-center py-4">
              <div className="gap-5 textbox flex flex-col items-center pt-4 w-full">
              <input
                type="text"
                {...formik.getFieldProps('username')}
                placeholder="Username/Email"
                className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <input
                type="password"
                {...formik.getFieldProps('password')}
                placeholder="Password"
                className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              </div>
              <div className="w-full pb-4 pt-1">
              <span className="text-gray-500 text-sm">
                Forgot Password?
                <Link to="/recovery" className="text-red-500 pl-1">
                  Recover now
                </Link>
              </span>
            </div>
              <button
                type="submit"
                className="inline-block px-7 py-2.5 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Let's Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member?
                <Link to="/register" className="text-red-500 pl-1">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
