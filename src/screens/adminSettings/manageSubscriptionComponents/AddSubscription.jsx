import { useFormik } from "formik";
import React from "react";
import  toast, { Toaster } from "react-hot-toast";
import { addNewSub } from "../../../helper/SubscriptionApi";
const AddSubscription = () => {

  const formik = useFormik({
    initialValues: {
      subtype: "",
      flags: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values)
      let toastBox = toast.loading("Loading...");
      const addSubPromise = addNewSub(values)
      addSubPromise
        .then(
          (resolve) => {
            toast.success('Subscription Added', {
              id: toastBox
            })
          },
          (detail) => {
            if (detail === "DUPLICATE_SUB") {
              toast.error("Subscription already exists", {
                id: toastBox,
              });
            } else {
              toast.error("Some error occured", {
                id: toastBox,
              });
            }
          }
        )
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <p className="font-bold font-sans text-lg">Add New Subscription</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2 mt-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Subscription Name
            </label>
            <input
              type="text"
              {...formik.getFieldProps("subtype")}
              id="servername"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg: casual"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Flags
            </label>
            <input
              type="password"
              {...formik.getFieldProps("flags")}
              id="rconpass"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg: xyerqwas"
              required
            />
          </div>
        </div>
        <div className="w-full justify-center text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ADD
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSubscription;
