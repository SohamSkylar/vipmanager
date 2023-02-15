import React from "react";
import { useState } from "react";
import ManageCustomers from "../manageCustomerComponents/ManageCustomers";
import ManageServerNav from "../manageServerComponents/ManageServerNav";
import ManageSubscriptions from "../manageSubscriptionComponents/ManageSubscriptions";

const TabNavigation = () => {
  const [selected, setSelected] = useState("server");

  const handleEvent = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="lg:hidden">
          <label className="sr-only">Options</label>
          <select
            id="tabs"
            value={selected}
            onChange={handleEvent}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="server">Manage Servers</option>
            <option value="subscription">Manage Subscriptions</option>
            <option value="customer">Manage Customers</option>
            <option value="settings">Settings</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow lg:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <option
              value="server"
              onClick={handleEvent}
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-current="page"
            >
              Manage Servers
            </option>
          </li>
          <li className="w-full">
            <option
              value="subscription"
              onClick={handleEvent}
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Manage Subscriptions
            </option>
          </li>
          <li className="w-full">
            <option
              value="customer"
              onClick={handleEvent}
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Manage Customers
            </option>
          </li>
          <li className="w-full">
            <option
              value="settings"
              onClick={handleEvent}
              className="inline-block w-full p-4 bg-white hover:text-orange-400 hover:bg-gray-50 focus:text-orange-400 focus:bg-gray-700 focus:outline-none dark:hover:text-orange-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Settings
            </option>
          </li>
        </ul>
      </div>
      <div className="bg-slate-400 relative w-full ManageServerTabui">
        <div className=" w-full px-6 pt-4">
          {selected === "server" && <ManageServerNav />}
          {selected === "subscription" && <ManageSubscriptions />}
          {selected === "customer" && <ManageCustomers />}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
