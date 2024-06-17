import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGithub } from "react-icons/fa";
import "./SideBar.scss";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImgAdmin from "../../assets/admin.png";
import { FaKey } from "react-icons/fa";
// import { logoutUser } from "../../services/APIService";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { doLogout } from "../../redux/action/userAction";
// import Swal from "sweetalert2";

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  // const user = useSelector((state) => state.userRedux.user);

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <img
                src={ImgAdmin}
                alt="admin"
                style={{
                  height: "25px",
                  width: "25px",
                  marginRight: "10px",
                }}
              />
            </div>
            <div
              style={{
                textTransform: "uppercase",
                fontWeight: "800",
                fontSize: 18,
                whiteSpace: "nowrap",
                color: "#1D79D4",
                marginTop: "2px",
              }}
            >
              Answer Management
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === "dashboard" ? "active" : ""
              }`}
              icon={
                <MdSpaceDashboard size={"20px"} color={"rgb(0, 152, 229)"} />
              }
              onClick={() => handleMenuItemClick("dashboard")}
            >
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu
              icon={<FaTools size={"20px"} color={"rgb(0, 152, 229)"} />}
              title="Features"
            >
              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === "manage-users" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("manage-users")}
              >
                Manage Users <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === "manage-quizzes" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("manage-quizzes")}
              >
                Manage Quizzes <Link to="/admins/manage-quizz" />
              </MenuItem>
              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === "manage-question" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("manage-question")}
              >
                Manage Questions <Link to="/admins/manage-question" />
              </MenuItem>
            </SubMenu>
          </Menu>

          <Menu iconShape="circle">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === "assign-quizz" ? "active" : ""
              }`}
              icon={<FaKey size={"20px"} color={"rgb(0, 152, 229)"} />}
              onClick={() => handleMenuItemClick("assign-quizz")}
            >
              Assign Quizz
              <Link to="/admins/manage-assign-quizz" />
            </MenuItem>
          </Menu>

          {/* <Menu iconShape="circle" className="bg-logout">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === "logout" ? "active" : ""
              }`}
              icon={<FaSignOutAlt size={"20px"} color={"rgb(255 116 116)"} />}
              onClick={() => handleLogout()}
            >
              Logout
            </MenuItem>
          </Menu> */}
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/HuynhMinhHoang"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Contact me
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
