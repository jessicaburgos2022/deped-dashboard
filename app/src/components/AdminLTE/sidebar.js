import React from 'react';
import { menu } from "../Menu";
import { hasChildren } from "../utils";
import MenuGenerator from "./_menu";
import Swal from "sweetalert2";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../media/3E-logo.png';
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
            </div>
        </aside>
    )
}