import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { showAllServers } from "../../../helper/ServerApi";
import { showAllSub } from "../../../helper/SubscriptionApi";
import { addNewCustomer } from "../../../helper/CustomerApi";
import { getUserID } from "../../../helper/UserApi";

const EditCustomer = () => {
//   const getServerDataFunc = () => {
//     const newPromise = showAllServers();
//     newPromise
//       .then((data) => {
//         setServerNames(data);
//       })
//       .catch((err) => console.log(err.message));
//   };

//   const getSubDataFunc = () => {
//     const newPromise = showAllSub();
//     newPromise
//       .then((data) => {
//         setSubNames(data);
//       })
//       .catch((err) => console.log(err.message));
//   };

  const formik = useFormik({
    initialValues: {
      customerdetail: "",
      subscription: "",
      duration: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //console.log(values);
      let toastBox = toast.loading("Loading...");

      if (values.customerdetail === "" || values.subscription === "" || values.duration === "") {
        toast.error(`Enter all details`, {
          id: toastBox,
        });
      } else {
        toast.success(`Subscription updated`, {
          id: toastBox,
        });
      }

      //   if (values.changeValue === "steamid") {
      //     //console.log("exec0");
      //     let checkSteamIDPromise = checkSteamID(values);
      //     checkSteamIDPromise
      //       .then(
      //         (steamObj) => {
      //           //console.log("exec1");
      //           return Promise.resolve(steamObj);
      //         },
      //         (rejectMsg) => {
      //           toast.error(`${rejectMsg}`, {
      //             id: toastBox,
      //           });
      //         }
      //       )
      //       .then((steamObj) => {
      //         //console.log("exec2");
      //         const updatePromise = updateNewUser({
      //           steamid: steamObj.steamid,
      //           changeValue: "steamid",
      //         });
      //         updatePromise
      //           .then(
      //             (res) => {
      //               //console.log("exec3");
      //               if (res === "success") {
      //                 toast.success("Update Successful", {
      //                   id: toastBox,
      //                 });
      //               }
      //             },
      //             (reject) => {
      //               if (reject === "AUTH_FAILED") {
      //                 toast.error("Please Login again", {
      //                   id: toastBox,
      //                 });
      //               } else {
      //                 console.log(reject);
      //                 toast.error(`${reject}`, {
      //                   id: toastBox,
      //                 });
      //               }
      //             }
      //           )
      //           .catch((error) => {
      //             console.log(error);
      //           });
      //       })
      //       .catch((err) => {
      //         toast.error(`${err.message}`, {
      //           id: toastBox,
      //         });
      //       });
      //   } else {
      //     const updatePromise = updateNewUser(values);
      //     updatePromise
      //       .then(
      //         (res) => {
      //           if (res === "success") {
      //             toast.success("Update Successful", {
      //               id: toastBox,
      //             });
      //           }
      //         },
      //         (reject) => {
      //           if (reject === "AUTH_FAILED") {
      //             toast.error("Please Login again", {
      //               id: toastBox,
      //             });
      //           } else {
      //             //console.log(reject);
      //             toast.error(`${reject}`, {
      //               id: toastBox,
      //             });
      //           }
      //         }
      //       )
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
    },
  });

//   useEffect(() => {
//     getServerDataFunc();
//     getSubDataFunc();
//   }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <p className="font-bold font-sans text-lg">Edit Customer Details:</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-4 mt-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter Customer Detail
            </label>
            <select
              id="tabs"
              //value={serverSelected}
              {...formik.getFieldProps("customerdetail")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select :</option>
              <option value="username">Enter Username</option>
              <option value="steamurl">Enter SteamURL</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Existing Subscription
            </label>
            <select
              id="tabs"
              //value={serverSelected}
              {...formik.getFieldProps("subscription")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select :</option>
              {/* {serverNames.map((data) => {
                return (
                  <option
                    key={data.id}
                    value={data.name}
                    defaultValue={data.name}
                  >
                    {data.name}
                  </option>
                );
              })} */}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter New Duration
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
        </div>
        <div className="w-full justify-center text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            UPDATE
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCustomer;
