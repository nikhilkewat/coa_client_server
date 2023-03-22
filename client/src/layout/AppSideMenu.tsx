import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { Link } from "react-router-dom";

const AppSideMenu = () => {
  const renderMenu = () => {
    return (
      <Collapse accordion={true} key={Math.random()}>
        <Panel
          header={
            <div>
              <i className="fa-solid fa-house-chimney pe-3"></i>
              {`Masters`}
            </div>
          }
          className="themesub-item"
        >
          <ul className="sidebar-dropdown list-unstyled collapse show">
            <li className="sidebar-item">
              <Link
                to="/app/user"
                className="text-decoration-none sidebar-link"
                state={'USER'}
              >
                {`User`}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link
                to="/app/product"
                className="text-decoration-none sidebar-link"
                state={'PRODUCT'}
              >
                {`Product`}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link
                to="/app/test"
                className="text-decoration-none sidebar-link"
                state={'TEST MASTER'}
              >
                {`Product Test`}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link
                to="/app/template"
                className="text-decoration-none sidebar-link"
                state={'TEMPLATE'}
              >
                {`Template`}
              </Link>
            </li>
          </ul>
        </Panel>

        <Panel
          header={
            <div>
              <i className="fa-solid fa-file-invoice pe-3"></i>
              {` Transaction`}
            </div>
          }
          className="themesub-item"
        >
          <ul className="sidebar-dropdown list-unstyled collapse show">
            <li className="sidebar-item active">
              <li className="sidebar-item">
                <Link
                  to="/app/inittest"
                  className="text-decoration-none sidebar-link"
                  state={'START TEST'}
                >
                  {`Initiate Test`}
                </Link>
              </li>
            </li>
          </ul>
        </Panel>
        <Panel
          header={
            <div>
              <i className="fa-solid fa-square-poll-vertical pe-3"></i>
              {`Reports`}
            </div>
          }
          className="themesub-item"
        >
          <ul className="sidebar-dropdown list-unstyled collapse show">
            <li className="sidebar-item active">
              <Link
                to="/app/report1"
                className="text-decoration-none sidebar-link"
                state={'REPORT 1'}
              >
                {`Report 1`}
              </Link>

              <Link
                to="/app/report2"
                className="text-decoration-none sidebar-link"
                state={'REPORT 2'}
              >
                {`Report 2`}
              </Link>

              <Link
                to="/app/report3"
                className="text-decoration-none sidebar-link"
                state={'REPORT 3'}
              >
                {`Report 3`}
              </Link>
            </li>
          </ul>
        </Panel>
        <Panel
          header={
            <div>
              <i className="fa-solid fa-gear pe-3"></i>
              {`Configurations`}
            </div>
          }
          className="themesub-item"
        >
          <ul className="sidebar-dropdown list-unstyled collapse show">
            <li className="sidebar-item active">
              <Link
                to="/app/settings"
                className="text-decoration-none sidebar-link"
              >
                Settings
              </Link>
            </li>
          </ul>
        </Panel>
      </Collapse>
    );
  };

  return (
    <ul className="sidebarmenu-nav">
      <Collapse accordion={true}>{renderMenu()}</Collapse>
    </ul>
  );
};
export default AppSideMenu;
