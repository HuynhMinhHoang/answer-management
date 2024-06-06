import React from "react";
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
import {
  FaTachometerAlt,
  FaGem,
  FaGithub,
  FaRegLaughWink,
} from "react-icons/fa";
import "./SideBar.scss";
import { FaReact } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImgAdmin from "../../assets/admin.png";

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
  return (
    <>
      <ProSidebar
        // image={sidebarBg}
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
              // alignItems: "center",
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
                  // marginTop: "5px",
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
                // display: "flex",
                // alignItems: "baseline",
              }}
            >
              Answer Management
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* menu1 */}
          <Menu iconShape="circle">
            <MenuItem
              icon={
                <MdSpaceDashboard size={"20px"} color={"rgb(0, 152, 229)"} />
              }
            >
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>

          {/* menu2 */}
          <Menu iconShape="circle">
            <SubMenu
              icon={<FaTools size={"20px"} color={"rgb(0, 152, 229)"} />}
              title="Features"
            >
              <MenuItem>
                Manage Users <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>Manage Quizzes</MenuItem>
              <MenuItem>Manage Questions</MenuItem>
            </SubMenu>
          </Menu>

          {/* menu3 */}
          <Menu iconShape="circle">
            <MenuItem
              icon={
                <MdSpaceDashboard size={"20px"} color={"rgb(0, 152, 229)"} />
              }
            >
              Dashboard
            </MenuItem>
          </Menu>
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
