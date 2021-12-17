import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar-style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from './Header';
import DrawerV2 from './DrawerV2';

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
            <div className="logo_name">Prime NCR PID</div>
          </div>
          <i
            className="bx bx-menu pointer"
            id="btn"
            onClick={() => handleDrawerOpen()}
          ></i>
        </div>
        <DrawerV2 />
      </div>
      <Header handleDrawerOpen={handleDrawerOpen} />
    </>
  );
}
