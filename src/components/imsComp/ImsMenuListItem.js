import React from "react";
import * as PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const setStyle=makeStyles(theme=>({
    root:{
        color: "#000000"
    },
    rootIcon: {
        color: "#FFFFFF"
    },
    rootText: {
        color: "#FFFFFF"
    }
}));

export const ImsMenuListItem=(props)=>{
    const classes=setStyle();

    return (
        <ListItem button
                  onClick={()=>props.onClick()}
                  className={props.className}
                  classes={{
            root: classes.root
        }}>
            <ListItemIcon classes={{
                root: classes.rootIcon
            }}>
                {props.icon}
            </ListItemIcon>
            {props.text && <ListItemText primary={props.text} classes={{
                root: classes.rootText
            }} />}
            {props.collapseIcon}
        </ListItem>
    )
};

ImsMenuListItem.propTypes={
    icon: PropTypes.any,
    text: PropTypes.string,
    onClick: PropTypes.func,
    collapseIcon: PropTypes.any,
    className: PropTypes.any,
    subMenu: PropTypes.bool
};