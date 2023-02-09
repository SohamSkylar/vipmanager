import React, { useEffect, useState } from "react";
import { activeUser } from "../../helper/UserApi";
import NavBar from "./components/NavBar";
import WelcomeScreen from "./components/WelcomeScreen";
import "./homepage.css";

const Homepage = () => {
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
    <div className="w-screen h-screen absolute bg-slate-400">
      <div className="container mx-auto homepageCss w-10/12">
        {renderVal && <NavBar AuthTypeVal={AuthTypeVal} />}
        <WelcomeScreen />
      </div>
    </div>
  );
};

export default Homepage;
