import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BsEmojiSunglassesFill } from "react-icons/bs";

const ServerDataGrid = ({name}) => {
  //let username

  // const [userData, setData] = useState();

  const getUserData = async () => {
    const userData = await axios.get("http://localhost:8001/api/user");
    console.log(userData.data[0].username);
  };

  useEffect(() => {
    getUserData();
  });

  //console.log()

  // const users = userData?.map(item=>{
  //     username = item.username
  //     console.log(username)
  // })
  //console.log(users)

  return (
    <div className="p-4">
      <div className=" w-full lg:w-6/12 xl:w-4/12 bg-slate-900">
        {/* <div classNameName="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
                </div> */}
        <div className="bg-slate-900 flex flex-col justify-between leading-normal shadow-lg">
          <div className="flex-wrap w-full p-1 flow-root mt-1 px-2">
            <p className="text-sm text-amber-600 flex items-center float-left mt-3 px-1">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Skylar's VIP status
            </p>

            <div className="text-sm flow-root mr-0 px-2">
              <div className="text-white p-3 text-center inline-flex float-right items-center justify-end w-12 h-12 shadow-lg rounded-full bg-red-500">
                <BsEmojiSunglassesFill className="w-auto h-full" />
              </div>
            </div>

            <div className="px-2">
              <div className="font-bold text-xl mb-2 text-amber-500">
                Server Name:{name}
              </div>
              <div className="text-amber-600 text-base">Role: VIP </div>
            </div>
          </div>

          <div className="flex-wrap bg-stone-300 justify-center flow-root px-2">
            <p className="text-base font-semibold text-blue-900 float-left py-2">
              {" "}
              Start Date: 12.7.12{" "}
            </p>
            <p className="ml-2 mr-2 text-xl"></p>
            <p className="text-base font-semibold text-red-700 float-right py-2">
              End Date: 15.8.12
            </p>
            <br />
            <p className="text-base font-semibold text-slate-900 py-4">
              Days Left: 42
            </p>
            <div className="float-right ml-auto mb-4">
              <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm text-green-500 font-medium">
                RENEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerDataGrid;
