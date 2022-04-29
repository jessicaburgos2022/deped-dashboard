import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { BubbleChartOutlined, InsightsOutlined, SettingsOutlined, DashboardOutlined, AssessmentOutlined } from '@mui/icons-material';
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
                title: "TO-KRAs",
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
                to: "/outputmajor"
            },
            {
                title: "Minor",
                to: "/outputminor"
            },
            {
                title: "TO-KRAs",
                to: "/outputtokra"
            },
        ]
    },
    {
        icon: <AssessmentOutlined />,
        title: "PREXC",
        to: "/prexc"
    },
    {
        icon: <SettingsOutlined />,
        title: "Maintenance",
        items: [
            {
                title: "KRA",
                to: "/maintenance-kra"
            },
            {
                title: "Project",
                to: "/maintenance-project"
            },
            {
                title: "Outcome",
                to: "/maintenance-outcome"
            },
            {
                title: "Change Password",
                to: "/maintenance-changepassword"
            },
            {
                icon: <AssessmentOutlined />,
                title: "Account",
                items: [
                    {
                        title: "Role",
                        to: "/maintenance-role"
                    },
                    {
                        title: "User",
                        to: "/maintenance-user"
                    }
                ]

            }
        ]
    }
];
