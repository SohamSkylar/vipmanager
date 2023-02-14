import React, { useEffect, useState } from "react";
import { activeUser } from "../../helper/UserApi.jsx";
import Navbar from "./components/Navbar.js";
import ServerCard from "./components/ServerCard.jsx";
import Sidebar from "../../components/Sidebar.js";
import { showAllServers } from "../../helper/ServerApi.jsx";
const Dashboard = () => {
  const [AuthTypeVal, setAuthTypeVal] = useState(false);
  const [isAdmin, setIsAdminVal] = useState(false);
  const [renderVal, setRenderVal] = useState();
  const [renderVal2, setRenderVal2] = useState();

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

  // const showServersFunc = () => {
  //   const showServerPromise = showAllServers();
  //   // let serverData;
  //   showServerPromise
  //     .then((data) => {
  //       console.log(data)
  //       return <ServerCard name="{index.name}" price="79" duration="30" />
  //       // serverData = data;
  //       setRenderVal2(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // if(renderVal2) {
  //   //   // serverData.map((index) => {
  //   //   //   return <ServerCard name={index.name} price="79" duration="30" />
  //   //   // })
  //   //   console.log(serverData)
  //   // }
  //   Promise.all([showServerPromise]).then(() => {
  //     console.log("executed")
  //     ;
  //   }).then(() => {
  //     setRenderVal2(true)
  //   })
  // };

  const showServersFunc = () => {
    const newPromise = showAllServers()
    newPromise.then((data) => {
      return <ServerCard name="name" price="79" duration="30" />
    }).catch(err => console.log(err.message))
  }

  const randomPrint = () => {
    return <ServerCard name="name" price="79" duration="30" />;
  };

  //console.log(renderVal2 && showServersFunc())

  // const showServerCard = dataServer.map(index => (
  //       //<ServerCard name="{index.name}" price="79" duration="30" />
  //       console.log(index.name)
  //     ))

  useEffect(() => {
    activeUserFunc();
  });

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
              <div className="flex flex-wrap">
                {/* {renderVal2 && showServerCard} */}
                {/* {showServersFunc()} */}
                {/* {randomPrint()} */}
                {showServersFunc()}
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

export default Dashboard;
