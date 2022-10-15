import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { TopicOutlined, InsightsOutlined, SettingsOutlined, DashboardOutlined, AssessmentOutlined, SupervisedUserCircleOutlined, StackedBarChartOutlined, FeedOutlined } from '@mui/icons-material';
import React from "react";

export const menu = [
    {
        icon: <InsightsOutlined />,
        title: "PPA",
        to: '/dashboard'
    },
    {
        icon: <StackedBarChartOutlined />,
        title: "CASPRO",
        to: '/contributorydashboard'
    },
    {
        icon: <TopicOutlined />,
        title: "Output Management",
        items: [
            {
                title: "Major",
                to: "/outputmajor"
            },
            // {
            //     title: "Minor",
            //     to: "/outputminor"
            // },
            {
                title: "CASPRO",
                to: "/outputtokra"
            },
        ]
    },
    {
        icon: <FeedOutlined />,
        title: "OPEX",
        to: "/opex"
       
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
                title: "CASPRO",
                to: "/maintenance-outcome"
            },
            {
                title: "Change Password",
                to: "/maintenance-changepassword"
            },
            {
                icon: <SupervisedUserCircleOutlined />,
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
