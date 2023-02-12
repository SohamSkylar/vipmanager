import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import NotificationDropdown from "./NotificationDropdown.js";
import UserDropdown from "./UserDropdown.js";

export default function Sidebar({ AuthTypeVal }) {
  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const AuthTypeFunc = () => {
    if (AuthTypeVal) {
      return (
        <a
          className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
          href="/"
          onClick={deleteToken}
        >
          <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
          Logout
        </a>
      );
    } else {
      return (
        <a
          className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
          href="/login"
        >
          <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
          Login
        </a>
      );
    }
  };

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-slate-900 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <GiHamburgerMenu />
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-amber-500 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            INDINET GAMING
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Tailwind Starter Kit
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <ImCross />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            {/* <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form> */}
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className="text-amber-500 hover:text-amber-600 text-xs uppercase py-3 font-bold block"
                  to="/dashboard"
                >
                  <i className="fas fa-tv opacity-75 mr-2 text-sm"></i>{" "}
                  Dashboard
                </Link>
              </li>

              {AuthTypeVal ? (
                <li className="items-center">
                  <Link
                    className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    to="/"
                  >
                    <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                    VIP Status
                  </Link>
                </li>
              ) : null}

              {AuthTypeVal ? (
                <li className="items-center">
                  <Link
                    className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    to="/profile"
                  >
                    <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Edit Profile
                  </Link>
                </li>
              ) : null}

              <li className="items-center">{AuthTypeFunc()}</li>

              <li className="items-center">
                <a
                  className="text-white text-xs uppercase py-3 font-bold block"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-tools text-blueGray-300 mr-2 text-sm"></i>{" "}
                  Settings
                </a>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
          </div>
        </div>
      </nav>
    </>
  );
}
