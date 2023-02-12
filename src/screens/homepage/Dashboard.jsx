import React, { useEffect, useState } from "react";
import { activeUser } from "../../helper/UserApi.jsx";
import Navbar from "./components/Navbar.js";
import ServerCard from "./components/ServerCard.jsx";
import ServerDataGrid from "./components/ServerDataGrid.jsx";
import Sidebar from "./components/Sidebar.js";
const Dashboard = () => {

  const [AuthTypeVal, setAuthTypeVal] = useState(false);
  const [renderVal, setRenderVal] = useState();
  useEffect(() => {
    const activeUserPromise = activeUser();
    activeUserPromise
      .then((status) => {
        if (status === 201) {
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
  });


  return (
    <>
      {renderVal && <Sidebar AuthTypeVal={AuthTypeVal}/>}
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        {/* Header */}
        <div className="relative md:pt-32 pb-32 pt-12 dashboardui">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <ServerCard name="Public Casual" price='79' duration='30' />
              </div>
            </div>
            <div>
              {/* Card stats */}
              <div >
                <ServerDataGrid/>
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
}

export default Dashboard;
