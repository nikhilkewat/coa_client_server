/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

type AppHeaderProps = {
  toggleClick?: () => void;
  isToggled?: boolean;
};
const AppHeaderTop = (props: AppHeaderProps) => {
  const { toggleClick = () => {}, isToggled = false } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onClickDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleSubmit = () => {
    setDropdownOpen(false);
  };
  
  return (
    <nav
      className={
        isToggled
          ? "navbar-theme navbar-expand navbar navToggledIn"
          : "navbar-theme navbar-expand navbar"
      }
    >
      <div className="headerAcadDropdown">
        <span className="sidebar-toggle" onClick={() => toggleClick()}>
          <i className="hamburger" />
        </span>
      </div>
      <form className="d-none d-sm-inline-block">
        <div className="row">
          <div
            className="col-md-6 col-lg-6 col-sm-12 mb-2"
            style={{ paddingLeft: "30px" }}
          >
            <a
              className="nav-link acadeYearSettings"
              onClick={onClickDropdownOpen}
            >
              2022-2023
              <i className="fa fa-angle-down" aria-hidden="true" />
            </a>

            <div
              className={
                dropdownOpen
                  ? "dropdown-menu custom-dropdown dropShow"
                  : "dropdown-menu custom-dropdown"
              }
              
            >
              <ul>
                <li>
                  <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={handleSubmit}
                  >
                    Ok
                  </button>
                </li>
              </ul>
            </div>
          </div>
        
          <div className="col-md-3 col-lg-3 col-sm-12 mb-2">
            <input
              className="form-control form-control-lite lg-8"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </form>
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown active">
            <a
              className="nav-link dropdown-toggle position-relative"
              href="#"
              id="messagesDropdown"
              data-bs-toggle="dropdown"
            >
              <i className="align-middle fas fa-envelope-open"></i>
            </a>
          </li>
          <li className="nav-item dropdown ms-lg-2">
            <a
              className="nav-link dropdown-toggle position-relative"
              href="#"
              id="alertsDropdown"
              data-bs-toggle="dropdown"
            >
              <i className="align-middle fas fa-bell"></i>
              <span className="indicator"></span>
            </a>
          </li>
          <li className="nav-item dropdown ms-lg-2">
            <a
              className="nav-link dropdown-toggle position-relative"
              href="#"
              id="userDropdown"
              data-bs-toggle="dropdown"
            >
              <i className="align-middle fas fa-cog"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1 fas fa-fw fa-user"></i> View
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1 fas fa-fw fa-comments"></i>{" "}
                Contacts
              </a>
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1 fas fa-fw fa-chart-pie"></i>{" "}
                Analytics
              </a>
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1 fas fa-fw fa-cogs"></i> Settings
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1 fas fa-fw fa-arrow-alt-circle-right"></i>{" "}
                Sign out
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppHeaderTop;
