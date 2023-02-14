import React from "react";
import { useState } from "react";
import ManageServerNav from "./ManageServerNav";

const TabNavigation = () => {

  return (
    <div>
      <div>
        <div className="lg:hidden">
          <label className="sr-only">Options</label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Manage Servers</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow lg:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-current="page"
            >
              Manage Servers
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Dashboard
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Settings
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Invoice
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-slate-400 relative w-full ManageServerTabui">
        <div className=" w-full px-6 pt-4">
          <ManageServerNav />
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
