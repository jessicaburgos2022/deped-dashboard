import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import {AddCircleOutlineOutlined} from "@material-ui/icons";
import React from "react";

export const menu = [
    {
        icon: <HomeOutlinedIcon />,
        title: "Dashboard - PPA",
        to: '/dashboard'
    },
    {
        icon: <HomeOutlinedIcon />,
        title: "Dashboard - OO",
        to: '/contributorydashboard'
    },
    {
        icon: <AddCircleOutlineOutlined />,
        title: "Insert Output",
        items: [
            {
                title: "Major",
                to: "/output/major"
            },
            {
                title: "Minor",
                to: "/output/minor"
            },
            {
                title: "Contributory",
                to: "/output/oo"
            },
        ]
    },
    {
        icon: <AddCircleOutlineOutlined />,
        title: "Output Management",
        items: [
            {
                title: "Major",
                to: "/outputmanagement/major"
            },
            {
                title: "Minor",
                to: "/outputmanagement/minor"
            },
            {
                title: "Contributory",
                to: "/outputmanagement/oo"
            },
        ]
    },
    {
        icon: <AddCircleOutlineOutlined />,
        title: "Maintenance",
        items: [
            {
                title: "KRA",
                to: "/maintenance/kra"
            },
            {
                title: "Project",
                to: "/maintenance/project"
            },
            {
                title: "Indicator",
                to: "/maintenance/indicator"
            },
        ]
    }
];
