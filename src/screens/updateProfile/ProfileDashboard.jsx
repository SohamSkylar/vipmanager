import React, { useEffect, useState } from "react";
import { activeUser } from "../../helper/UserApi.jsx";
import Navbar from "./components/Navbar.js";
import Sidebar from "../../components/Sidebar.js";
import UpdateProfileCard from "./components/UpdateProfileCard.jsx";
import { toast } from "react-hot-toast";
import CurrentUserCard from "./components/CurrentUserCard.jsx";
const ProfileDashboard = () => {
  const [AuthTypeVal, setAuthTypeVal] = useState(false);
  const [isAdmin, setIsAdminVal] = useState(false);
  const [renderVal, setRenderVal] = useState();

  const activeUserFunc = () => {
    const activeUserPromise = activeUser();
    activeUserPromise
      .then((data) => {
        if (data.type === "admin") {
          setAuthTypeVal(true);
          setIsAdminVal(true);
        } else if (data.type === "customer") {
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

  useEffect(() => {
    activeUserFunc();
    toast.remove();
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
              <div className=" mx-auto w-full">
                <CurrentUserCard/><br/><br/>
                <UpdateProfileCard />
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

export default ProfileDashboard;
