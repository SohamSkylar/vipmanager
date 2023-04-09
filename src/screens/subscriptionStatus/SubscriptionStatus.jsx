import React, { useEffect, useState } from "react";
import { activeUser } from "../../helper/UserApi.jsx";
import Navbar from "./components/Navbar.js";
import Sidebar from "../../components/Sidebar.js";
import ServerDataGrid from "./components/ServerDataGrid.jsx";
import {
  activeCustomer,
  fetchCustomerData,
} from "../../helper/CustomerApi.jsx";

const SubscriptionStatus = () => {
  const [AuthTypeVal, setAuthTypeVal] = useState(false);
  const [isAdmin, setIsAdminVal] = useState(false);
  const [renderVal, setRenderVal] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [customerUsername, setCustomerUsername] = useState();
  const [statusRenderPermit, setStatusRenderPermit] = useState();

  const activeUserFunc = () => {
    const activeUserPromise = activeUser();
    activeUserPromise
      .then((data) => {
        // console.log(data)
        if (data.type === "admin") {
          setAuthTypeVal(true);
          setIsAdminVal(true);
        } else if (data.type === "customer") {
          setAuthTypeVal(true);
          setCustomerUsername(data.username)
        }
      })
      .then(() => {
        setRenderVal(true);
      })
      .catch((err) => {
        setRenderVal(true);
        console.log(err);
      });
  };

  

  const getCustomerDataFunc = (msg) => {
    const newPromise = fetchCustomerData(msg);
    newPromise
      .then((data) => {
        if(data.msg === "NO_DATA") setStatusRenderPermit(false)
        else{
          setCustomerData(data);
          // console.log(data.msg);
          setStatusRenderPermit(true)
        }
      })
      .catch((err) => console.log(err.message));
  };

  const displayStatus = customerData.map((index, id) => {
    return (
      <ServerDataGrid key={id} servername={index.servername} username={customerUsername} duration={index.duration} subtype={index.subtype} />
    );
  });

  useEffect(() => {
    activeUserFunc();
    const activeCustomerFunc = () => {
      const activeCustomerPromise = activeCustomer();
      activeCustomerPromise
        .then((msg) => {
          getCustomerDataFunc(msg)
        })
        .catch((err) => console.log(err.message));
    };
    activeCustomerFunc();
  }, []);

  return (
    <>
      {renderVal && <Sidebar AuthTypeVal={AuthTypeVal} UserTypeVal={isAdmin} />}
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        {/* Header */}
        <div className="relative md:pt-32 pb-32 pt-12 dashboardui">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap lg:overflow-hidden overflow-scroll serverCardui w-full">
              {statusRenderPermit && displayStatus}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {/* <div className="flex flex-wrap">
            <LineChart />
            <BarChart />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SubscriptionStatus;
