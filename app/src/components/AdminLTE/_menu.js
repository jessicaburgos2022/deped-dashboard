import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { menu } from "../Menu";
import { hasChildren } from "../utils";
import { useLocation } from "react-router-dom";

export default function App() {
    return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
    return (
        <li className="nav-item">
            <a href={item.to} className="nav-link">
                <ListItemIcon style={{ color: '#fff', textDecoration: 'none' }}>{item.icon}</ListItemIcon>
                <p>
                    {item.title}
                </p>
            </a>
        </li>
    );
};

const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    const location = useLocation();
    if (location.pathname === item.to) {
        setOpen(true);
    }
    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <React.Fragment>
            <li className={`nav-item ${open ? 'menu-open' : ''}`}>
                <a href="#" className={`nav-link ${open ? 'active' : ''}`}>
                    <ListItemIcon style={{ color: '#fff', textDecoration: 'none' }}>{item.icon}</ListItemIcon>
                    <p>
                        {item.title}
                        <i className="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul className="nav nav-treeview" onClick={handleClick}>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </ul>
            </li>
        </React.Fragment>
    );
};
