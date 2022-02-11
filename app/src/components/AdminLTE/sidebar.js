import React from 'react';
import { menu } from "../Menu";
import { hasChildren } from "../utils";
import MenuGenerator from "./_menu";
import Swal from "sweetalert2";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../media/prime-logo.png';
import "./_css/sidebar.css";

export default () => {
    const user = localStorage.getItem("token");
    const location = useLocation();
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
    return (
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/dashboard" class="brand-link d-flex">
                <img src={Logo} alt="AdminLTE Logo" class="brand-image" />
            </a>
            <div class="sidebar">
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <MenuGenerator />
                    </ul>
                </nav>
                <div class="user-panel" style={{position:'absolute', bottom: 0, borderBottom: 'none', borderTop: '1px solid #4f5962', width: '90%', padding: 20}}>
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
                                <React.Fragment>
                                    <div className={`profile_details`}>
                                        <i className="bx bx-user bx-md"></i>
                                        {userState &&
                                            userState.userInfo &&
                                            userState.userInfo.acc &&
                                            userState.userInfo.role && (
                                                <div className="name_job">
                                                    <div className="name">
                                                        {userState.userInfo.acc[0].FirstName} {userState.userInfo.acc[0].Surname}
                                                    </div>
                                                    <div className="job">
                                                        [{userState.userInfo.acc[0].DepartmentName}]{userState.userInfo.role[0].RoleDescription}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                    <i
                                        className="right bx bx-log-out pointer"
                                        id="log_out"
                                        onClick={() => handleLogout()}
                                    ></i>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}