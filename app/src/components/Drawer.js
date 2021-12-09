import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar-style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {AccountTreeOutlined} from '@material-ui/icons';

export default function PersistentDrawerLeft() {
  const user = localStorage.getItem("token");
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const userState = useSelector((state) => state.user);
  const handleLogout = () => {
    Swal.fire({
      title: "You are about to be logged out.",
      text: "Do you want to continue?",
      icon: "question",
      focusConfirm: true,
      buttons: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then(async (r) => {
      if (r.isConfirmed) {
        localStorage.setItem("token", "");
        localStorage.setItem("state", "");
        document.location = "/login";
      }
    });
  };
  const handleDrawerOpen = () => {
    setOpen(open ? false : true);
  };
  return (
    <>
      <div className={`sidebar ${open ? "active" : ""}`}>
        <div className="logo_content">
          <div className="logo">
            <AccountTreeOutlined />
            <div className="logo_name">Output Dashboard</div>
          </div>
          <i
            className="bx bx-menu pointer"
            id="btn"
            onClick={() => handleDrawerOpen()}
          ></i>
        </div>
        <ul className="nav_list">
          {/* <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li> */}
          <li>
            <a href="/dashboard" className={document.location.pathname==="/dashboard"?'active-link':''}>
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="/output"  className={document.location.pathname==="/output"?'active-link':''}>
              <i className="bx bx-network-chart"></i>
              <span className="links_name">Insert Output</span>
            </a>
            <span className="tooltip">Insert Output</span>
          </li>
          {/* <li>
            <a href="/bapi"  className={document.location.pathname==="/bapi"?'active-link':''}>
              <i className="bx bx-expand-alt"></i>
              <span className="links_name">BAPI</span>
            </a>
            <span className="tooltip">Search BAPI</span>
          </li>
          <li>
            <a href="/maintenance" className={document.location.pathname==="/maintenance"?'active-link':''} >
              <i className="bx bx-cog"></i>
              <span className="links_name">Maintenance</span>
            </a>
            <span className="tooltip">Maintenance</span>
          </li> */}
        </ul>

        <div className="profile_content">
          <div className="profile">
            {!user && location.pathname !== "/login" && (
              <div style={{ display: "flex", height: "100%" }}>
                <Link to="/login" style={{ color: "#fff", margin: "auto" }}>
                  Login
                </Link>
              </div>
            )}
            {user && location.pathname !== "/login" && (
              <div>
                <div className={`profile_details ${!open ? "invisible" : ""}`}>
                  <i className="bx bx-user bx-md"></i>
                  {userState &&
                    userState.userInfo &&
                    userState.userInfo.acc && (
                      <div className="name_job">
                        <div className="name">
                          {userState.userInfo.acc[0].FirstName[0].toUpperCase()}{userState.userInfo.acc[0].Surname}
                        </div>
                        <div className="job">
                          {userState.userInfo.role[0].RoleDescription}
                        </div>
                      </div>
                    )}
                </div>
                <i
                  className="bx bx-log-out pointer"
                  id="log_out"
                  onClick={() => handleLogout()}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
