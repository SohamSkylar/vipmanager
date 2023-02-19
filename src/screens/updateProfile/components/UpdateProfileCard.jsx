import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { checkSteamID, updateNewUser } from "../../../helper/UserApi";

const UpdateProfileCard = () => {
  const formik = useFormik({
    initialValues: {
      changeValue: "",
      username: "",
      email: "",
      steamid: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //console.log(values);
      let toastBox = toast.loading("Loading...");

      if (values.changeValue === "steamid") {
        //console.log("exec0");
        let checkSteamIDPromise = checkSteamID(values);
        checkSteamIDPromise
          .then(
            (steamObj) => {
              //console.log("exec1");
              return Promise.resolve(steamObj);
            },
            (rejectMsg) => {
              toast.error(`${rejectMsg}`, {
                id: toastBox,
              });
            }
          )
          .then((steamObj) => {
            //console.log("exec2");
            const updatePromise = updateNewUser({
              steamid: steamObj.steamid,
              changeValue: "steamid",
            });
            updatePromise
              .then(
                (res) => {
                  //console.log("exec3");
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
                    console.log(reject);
                    toast.error(`${reject}`, {
                      id: toastBox,
                    });
                  }
                }
              )
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            toast.error(`${err.message}`, {
              id: toastBox,
            });
          });
      } else {
        const updatePromise = updateNewUser(values);
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
                //console.log(reject);
                toast.error(`${reject}`, {
                  id: toastBox,
                });
              }
            }
          )
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-4/5 sm:w-2/4 mx-auto justify-center">
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
              <option value="steamid">Change Steam Url</option>
            </select>
          </div>
          <div className="w-4/5 sm:w-2/4 mx-auto justify-center mt-4">
            <div className="w-full lg:w-2/4 mx-auto justify-center mb-4">
              {formik.values.changeValue === "username" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter New Username :
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
              {formik.values.changeValue === "email" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter New Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    id="email"
                    placeholder="example@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
              )}
              {formik.values.changeValue === "steamid" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter New Steam Url :
                  </label>
                  <input
                    type="text"
                    name="steamid"
                    {...formik.getFieldProps("steamid")}
                    id="steamid"
                    placeholder="https://steamcommunity.com/id/example"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
              )}
              <div className="flex items-start">
                <div className="flex items-start"></div>
              </div>
            </div>
            <div className="w-full mx-auto text-center">
            {formik.values.changeValue !== "" && (<button
              type="submit"
              className="w-full lg:w-2/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>)}
            </div>
            
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProfileCard;
