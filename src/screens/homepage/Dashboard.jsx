import React, { useEffect, useState } from "react";
import { activeUser } from "../../helper/UserApi.jsx";
import Navbar from "./components/Navbar.js";
import ServerCard from "./components/ServerCard.jsx";
import Sidebar from "../../components/Sidebar.js";
import { showAllServerSub } from "../../helper/SubscriptionApi.jsx";
const Dashboard = () => {
  const [AuthTypeVal, setAuthTypeVal] = useState(false);
  const [isAdmin, setIsAdminVal] = useState(false);
  const [renderVal, setRenderVal] = useState();
  const [serverData, setServerData] = useState([]);

  const activeUserFunc = () => {
    const activeUserPromise = activeUser();
    activeUserPromise
      .then((type) => {
        if (type === "admin") {
          setAuthTypeVal(true);
          setIsAdminVal(true);
        } else if (type === "customer") {
          setAuthTypeVal(true);
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

  const getServerDataFunc = () => {
    const newPromise = showAllServerSub()
    newPromise
      .then((data) => {
        setServerData(data);
      })
      .catch((err) => console.log(err.message));
  };

  const displayServers = serverData.map((index) => {
    return (
      <ServerCard key={index.id} name={index.name} price={index.price} duration={index.duration} />
    );
  });

  useEffect(() => {
    activeUserFunc();
    getServerDataFunc();
  },[]);

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
              <div className="flex flex-wrap lg:overflow-hidden overflow-scroll serverCardui">{displayServers}</div>
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

export default Dashboard;
