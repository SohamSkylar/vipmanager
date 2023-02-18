import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { showAllServers } from "../../../helper/ServerApi";
import { showAllSub } from "../../../helper/SubscriptionApi";
import { addNewCustomer } from "../../../helper/CustomerApi";

const AddCustomer = () => {
  const [serverNames, setServerNames] = useState([]);
  const [SubNames, setSubNames] = useState([]);

  const getServerDataFunc = () => {
    const newPromise = showAllServers();
    newPromise
      .then((data) => {
        setServerNames(data);
      })
      .catch((err) => console.log(err.message));
  };

  const getSubDataFunc = () => {
    const newPromise = showAllSub();
    newPromise
      .then((data) => {
        setSubNames(data);
      })
      .catch((err) => console.log(err.message));
  };

  const formik = useFormik({
    initialValues: {
      servername: "",
      username: "",
      duration: "",
      subtype: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
      let toastBox = toast.loading("Loading...");
      const addNewCustomerPromise = addNewCustomer(values)
      addNewCustomerPromise
        .then(
          (resolve) => {
            toast.success("Server Subscription Added", {
              id: toastBox,
            });
          },
          (detail) => {
            if (detail === "EMPTY_SUB") {
              toast.error("Fill All Fields", {
                id: toastBox,
              });
            } else if(detail === "NO_USER_AVAILABLE"){
              toast.error("Invalid Username", {
                id: toastBox,
              });
            } else if(detail === "DUPLICATE_ENTRY"){
              toast.error("User already has this subscription", {
                id: toastBox,
              });
            }
             else {
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

  useEffect(() => {
    getServerDataFunc();
    getSubDataFunc();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <p className="font-bold font-sans text-lg">Add Subscription to User</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-4 mt-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              {...formik.getFieldProps("username")}
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Existing Username"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Server
            </label>
            <select
              id="tabs"
              //value={serverSelected}
              {...formik.getFieldProps("servername")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select :</option>
              {serverNames.map((data) => {
                return (
                  <option
                    key={data.id}
                    value={data.name}
                    defaultValue={data.name}
                  >
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Duration
            </label>
            <input
              type="number"
              {...formik.getFieldProps("duration")}
              id="port"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter duration (in days)"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Subcription
            </label>

            <select
              id="sub"
              //value={subSelected}
              {...formik.getFieldProps("subtype")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select :</option>
              {SubNames.map((data) => {
                return (
                  <option
                    key={data.id}
                    // value={data.subtype}
                    defaultValue={data.subtype}
                  >
                    {data.subtype}
                  </option>
                );
              })}
            </select>
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

export default AddCustomer;
