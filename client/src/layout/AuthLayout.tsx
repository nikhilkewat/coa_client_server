import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePages, UserMaster } from "../components";
import Dashboard from "../components/Dashboard";
import AppHeaderTop from "./AppHeaderTop";
import AppSideBar from "./AppSideBar";

const AuthLayout = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="innerWrapper">
      <AppSideBar isToggled={toggled} />
      <div
        className={
          toggled
            ? "be-content container-fluid toggledIn"
            : "be-content container-fluid"
        }
      >
        <div className="main">
          <AppHeaderTop
            toggleClick={() => setToggled(!toggled)}
            isToggled={toggled}
          />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<UserMaster />} />
              <Route path="/product" element={<RoutePages />} />
              <Route path="/test" element={<RoutePages />} />
              <Route path="/template" element={<RoutePages />} />
              <Route path="/inittest" element={<RoutePages />} />
              <Route path="/report1" element={<RoutePages />} />
              <Route path="/report2" element={<RoutePages />} />
              <Route path="/report3" element={<RoutePages />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
