import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { BubbleChartOutlined, InsightsOutlined, SettingsOutlined, DashboardOutlined } from '@mui/icons-material';
import React from "react";

export const menu = [
    {
        icon: <InsightsOutlined />,
        title: "Dashboard",
        items: [
            {
                title: "PPA",
                to: '/dashboard'
            },
            {
                title: "KRAs",
                to: '/contributorydashboard'
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
                title: "KRAs",
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
                title: "Outcome",
                to: "/maintenance/outcome"
            },
            {
                title: "User Management",
                to: "/maintenance/user"
            }
        ]
    }
];
