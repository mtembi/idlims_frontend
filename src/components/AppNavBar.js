import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {sideBarToggled, fetchNotifications} from "../redux";
import {AppBar, Toolbar, IconButton, Typography, Badge} from "@material-ui/core";
import {Menu as MenuIcon, Notifications as NotifIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const setStyles=makeStyles((theme)=>({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const AppNavBar = ({showSideBar, fetchNotifications, notificationList}) => {
    const classes=setStyles();

    useEffect(()=>{
        fetchNotifications();
    }, []);

    return (
        <AppBar position={"static"}>
            <Toolbar component="div">
                <IconButton onClick={()=>{showSideBar()}} edge="start" className={classes.menuButton} aria-label="menu" color="inherit">
                    <MenuIcon component="svg"/>
                </IconButton>
                <Typography component="span" variant="h6" className={classes.title}>IDL-Inventory Management System</Typography>
                <IconButton aria-label="Notifications" color="inherit">
                    <Badge badgeContent={notificationList.length} color="secondary">
                        <NotifIcon/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};

const mapStateToProps = state => {
    return {
        notificationList: state.userFxnReducer.notificationsList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showSideBar: () => {dispatch(sideBarToggled())},
        fetchNotifications: () => { dispatch(fetchNotifications())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);