import React, { useState } from "react";
import AddCustomer from "./AddCustomer";

const ManageCustomers = () => {
  const [selected, setSelected] = useState("add");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="w-full lg:max-w-xs">
          <label className="sr-only">Options</label>
          <select
            id="tabs"
            value={selected}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="add">Add New Customer</option>
            <option value="edit">Edit Customer</option>
            <option value="delete">Remove Customer</option>
          </select>
        </div>
      </div>
      <div className="relative w-full InnerNavSectionui mx-auto justify-center">
        <div className="w-full xl:max-w-full manageServersui lg:overflow-hidden overflow-scroll px-6 py-4">
          {selected === "add" && <AddCustomer />}
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;
