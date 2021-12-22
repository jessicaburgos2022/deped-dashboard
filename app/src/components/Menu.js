import {AddCircleOutlineOutlined} from "@material-ui/icons";
import { BubbleChartOutlined, InsightsOutlined, SettingsOutlined, DashboardOutlined} from '@mui/icons-material';
import React from "react";

export const menu = [
    {
        icon: <InsightsOutlined />,
        title: "Dashboard - PPA",
        to: '/dashboard'
    },
    {
        icon: <BubbleChartOutlined />,
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
        icon: <DashboardOutlined />,
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
        icon: <SettingsOutlined />,
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
