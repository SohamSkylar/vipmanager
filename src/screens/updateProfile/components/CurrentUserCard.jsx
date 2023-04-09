import React from 'react'
import { BsEmojiSunglassesFill } from "react-icons/bs";

const CurrentUserCard = ({username, email, steamid}) => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg  shadow sm:p-6 md:p-8 dark:bg-slate-900 dark:border-gray-700">
const CurrentUserCard = () => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg 2xl:w-1/3 shadow sm:p-6 md:p-8 dark:bg-slate-900 dark:border-gray-700">
      <div className=" w-full bg-slate-900">
        {/* <div classNameName="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
                </div> */}
        <div className="bg-slate-900 flex flex-col justify-between leading-normal shadow-lg">
          <div className="flex flex-wrap bg-slate-900">
            <div className="flex flex-wrap w-full px-4 pt-4 pb-2">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1 text-3xl text-amber-500">
                Currently Logged in as
                <h5 className="text-green-500 font-semibold text-2xl pt-1">
                  Username: {username}
                </h5>
                <div className="text-green-500 text-2xl font-semibold">E-mail: {email} </div>
                <div className="text-green-500 text-2xl font-semibold">SteamID: {steamid} </div>
                  Username: cust2
                </h5>
                <div className="text-green-500 text-2xl font-semibold">E-mail: test@mail.com </div>
                <div className="text-green-500 text-2xl font-semibold">SteamID: test </div>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                  <BsEmojiSunglassesFill className="w-auto h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentUserCard