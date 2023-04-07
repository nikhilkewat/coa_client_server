import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductMaster, RoutePages, COATestMaster, UserMaster, COATemplate, COAReportMaster } from "../components";
import COAReportMasterList from "../components/COAGenerateTest/COATestList";
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
              <Route path="/product" element={<ProductMaster />} />
              <Route path="/test" element={<COATestMaster />} />
              <Route path="/template" element={<COATemplate />} />
              <Route path="/testlist" element={<COAReportMasterList />} />
              <Route path="/inittest" element={<COAReportMaster />} />
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
