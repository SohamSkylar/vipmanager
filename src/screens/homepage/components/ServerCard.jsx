import React from "react";
import {BsEmojiSunglassesFill} from 'react-icons/bs'

const ServerCard = ({ name, price, duration }) => {
  return (
    <div className="w-full lg:w-6/12 xl:w-4/12 px-4 py-2">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto">
          <div className="flex flex-wrap bg-slate-900">
            <div className="flex flex-wrap w-full p-4">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1 text-sm text-amber-500">
                Buy VIP on INDINET GAMING's
                <h5 className="text-amber-500 uppercase font-semibold text-xl">
                  {name}
                </h5>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                  <BsEmojiSunglassesFill className="w-auto h-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pt-4 flex flex-wrap bg-stone-300">
            <span className="font-medium text-2xl text-red-700">{price} INR</span>
            <p className="ml-2 text-xl">|</p>
            <p className="text-base font-medium text-slate-900 mt-2 ml-2">
            For
              <span className="text-slate-900 mr-1">
                <i className="fas fa-arrow-up"></i> {duration}
              </span>
              <span className="whitespace-nowrap">days</span>
            </p>
            <div className="justify-end ml-auto mb-4">
            <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm text-green-500 font-medium">ADD </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
