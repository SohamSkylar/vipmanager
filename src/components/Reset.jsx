import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPassValidate } from "../helper/validate";

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPassValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center min-h-screen">
        <div className="block p-6 rounded-lg shadow-xl bg-white max-w-sm w-full">
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Reset Password</h4>
            <span className="pt-8 text-xl w-full text-center text-gray-500">
              Enter new password
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center py-4">
              <div className="gap-5 textbox flex flex-col items-center py-4 w-full">
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="password"
                  {...formik.getFieldProps("confirm_pwd")}
                  placeholder="Confirm Password"
                  className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-block px-7 py-2.5 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                CONFIRM
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Go back?
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

export default Reset;
