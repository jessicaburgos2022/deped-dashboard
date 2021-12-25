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
        // <a href={item.to}>
        //     <ListItem button>
        //         <ListItemIcon style={{color:'#fff', textDecoration:'none'}}>{item.icon}</ListItemIcon>
        //         <ListItemText primary={item.title} style={{color:'#fff', textDecoration:'none'}}/>
        //     </ListItem></a>
    );
};

const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);

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
                    {/* <li className="nav-item">
                        <a href="./index.html" className="nav-link active">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Dashboard v1</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./index2.html" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Dashboard v2</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./index3.html" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Dashboard v3</p>
                        </a>
                    </li> */}
                </ul>
            </li>
            {/* <ListItem button onClick={handleClick}>
                <ListItemIcon style={{ color: '#fff', textDecoration: 'none' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} style={{ color: '#fff', textDecoration: 'none' }} />
                {open ? <ExpandLessIcon color="#fff" /> : <ExpandMoreIcon color="#fff" />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse> */}
        </React.Fragment>
    );
};
