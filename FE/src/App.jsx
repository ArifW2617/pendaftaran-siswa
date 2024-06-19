import { Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation";
import React from "react";

const App = () => {
  return (
    <div className=" w-full h-screen">
      <Navigation />
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default App;
