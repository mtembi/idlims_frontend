import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchNotifications, sideBarToggled} from "../../redux";
import {AppBar, Badge, IconButton, Toolbar, Typography, Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList} from "@material-ui/core";
import {Menu as MenuIcon, Notifications as NotifIcon, AccountCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";

const setStyles = makeStyles((theme) => ({
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

const AppNavBar = () => {
    const dispatch = useDispatch();
    const history=useHistory();
    const notificationList = useSelector(state => state.userFxnReducer.notificationsList);
    const sideBarShown = useSelector(state => state.uxReducer.showSideBar);
    const isLoggedIn = useSelector(state => state.userFxnReducer.isLoggedIn);
    const acctButtonRef=useRef(null);

    const [acctMenuOpen, setAcctMenuOpen]=useState(false);

    const classes = setStyles();

    useEffect(() => {
        dispatch(fetchNotifications());
    }, []);

    return (
        isLoggedIn ?
            <AppBar position={"static"}>
                <Toolbar component="div">
                    <IconButton onClick={() => {
                        dispatch(sideBarToggled(!sideBarShown))
                    }} edge="start" className={classes.menuButton} aria-label="menu" color="inherit">
                        <MenuIcon component="svg"/>
                    </IconButton>
                    <Typography component="span" variant="h6" className={classes.title}>IDL-Inventory Management
                        System</Typography>
                    <IconButton aria-label="Notifications" color="inherit">
                        <Badge badgeContent={notificationList.length} color="secondary">
                            <NotifIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="Profile"
                                aria-controls={acctMenuOpen?'menu-list-grow':undefined}
                                aria-hasPopup="true"
                                color="inherit"
                                onClick={()=>setAcctMenuOpen(true)}
                                ref={acctButtonRef}>
                        <AccountCircle/>
                    </IconButton>
                    <Popper open={acctMenuOpen}
                            style={{zIndex: 1000}}
                            anchorEl={acctButtonRef.current}
                            role={undefined} transition disablePortal>
                        {({TransitionProps, placement})=>(
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                <Paper>
                                    <ClickAwayListener onClickAway={()=>setAcctMenuOpen(false)}>
                                        <MenuList autoFocusItem={acctMenuOpen} id="menu-list-grow" >
                                            <MenuItem onClick={()=>setAcctMenuOpen(false)}>Profile</MenuItem>
                                            <MenuItem onClick={()=>setAcctMenuOpen(false)}>My account</MenuItem>
                                            <MenuItem onClick={()=>{localStorage.removeItem("user"); history.push("/login")}}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
            : ''
    )
};


export default AppNavBar;