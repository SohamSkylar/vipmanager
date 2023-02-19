import React from "react";
import { BsEmojiSunglassesFill } from "react-icons/bs";

const ServerDataGrid = ({ username, servername, duration, subtype }) => {
  return (
    <div className="w-full lg:w-2/4 2xl:w-1/3 px-4 py-2">
      <div className=" w-full bg-slate-900">
        {/* <div classNameName="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
                </div> */}
        <div className="bg-slate-900 flex flex-col justify-between leading-normal shadow-lg">
          <div className="flex flex-wrap bg-slate-900">
            <div className="flex flex-wrap w-full px-4 pt-4 pb-2">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1 text-sm text-amber-500">
                {username}'s subscription status in
                <h5 className="text-amber-500 uppercase font-semibold text-lg pt-1">
                  {servername} server
                </h5>
                <div className="text-amber-600 text-base">Role: {subtype} </div>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                  <BsEmojiSunglassesFill className="w-auto h-full" />
                </div>
              </div>
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
              Days Left: {duration}
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
