import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateNewUser } from "../../../helper/UserApi";

const UpdateProfileCard = () => {
  const formik = useFormik({
    initialValues: {
      changeValue: "",
      username: "",
      email: ""
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      let toastBox = toast.loading("Loading...");

      var updatePromise = updateNewUser(values);

      updatePromise
        .then(
          (res) => {
            if (res === "success") {
              toast.success("Update Successful", {
                id: toastBox,
              });
            }
          },
          (reject) => {
            if (reject === "AUTH_FAILED") {
              toast.error("Please Login again", {
                id: toastBox,
              });
            } else {
              toast.error(reject, {
                id: toastBox,
              });
            }
          }
        )
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Update Option
            </label>
            <select
              id="updateOption"
              {...formik.getFieldProps("changeValue")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="username">Change Username</option>
              <option value="email">Change Email</option>
            </select>
          </div>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Update Your Account
          </h5>
          {formik.values.changeValue === "username" && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Change Username To:
              </label>
              <input
                type="text"
                name="username"
                {...formik.getFieldProps("username")}
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Username"
                required
              />
            </div>
          )}
          {/* {selected === "email" && (
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                {...formik.getFieldProps("")}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          )} */}
          <div className="flex items-start">
            <div className="flex items-start"></div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfileCard;
