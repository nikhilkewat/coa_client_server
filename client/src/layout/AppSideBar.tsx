import { Link, Route, Routes } from "react-router-dom";
//import avtar from "../Assets/images/avatar4.png";
//import avtar from "../Assets/images/cropped-vkpatel-192x192.png";
import AppSideMenu from "./AppSideMenu";

type AppSideBarProps = {
  isToggled?: boolean;
};
const AppSideBar = (props: AppSideBarProps) => {
  const { isToggled = false } = props;
  return (
    <nav className={isToggled ? "themesidebar toggled" : "themesidebar"}>
      <div className="themesidebar-content">
        <Link to="/app/" className="themesidebar-brand">
          <i className="fa-solid fa-square-poll-vertical pe-3"></i>
          {` COA`}
        </Link>
        <div className="sidebar-user">
          {/* <img
            src={avtar}
            className="img-fluid rounded-circle mb-2"
            alt="Admin"
          /> */}
            <i className="fa-solid fa-square-poll-vertical fa-6x"></i>
          <div className="fw-bold">Dhairya</div>
          <small>Admin</small>
        </div>

        <div className="divScrollMenu">
          <Routes>
            <Route path="/*" element={<AppSideMenu />} />
          </Routes>
        </div>
      </div>
    </nav>
  );
};

export default AppSideBar;
