import React, {useState} from 'react';
import {useHistory} from "react-router";
import {Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";
import {
    Assessment as ReportIcon,
    ExpandLess,
    ExpandMore,
    FormatAlignJustify as ListIcon,
    Home as DashIcon,
    NavigateBeforeOutlined,
    Settings,
    TextRotateUpOutlined as TxnIcon,
    LocalShipping,
    SaveAlt,
    ReplyAllRounded,
    SystemUpdate
} from "@material-ui/icons";
import {sideBarToggled} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import {ImsMenuListItem} from "../imsComp/ImsMenuListItem";


const useStyles = makeStyles((theme) => ({
    root: {},
    drawerPaper: {
        backgroundColor: "#000000"
    },
    list: {
        width: 270,
    },
    listRoot: {
        backgroundColor: "#000000"
    },
    fullList: {
        width: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const AppSideBar = () => {
    const dispatch = useDispatch();
    const showSideBar = useSelector(state => state.uxReducer.showSideBar);
    const history = useHistory();
    const classes = useStyles();
    const [vendTxnListOpen, setVendTxnListOpen] = useState(false);
    const [custTxnListOpen, setCustTxnListOpen] = useState(false);
    const [listMenuOpen, setListMenuOpen] = useState(false);
    const [reportMenuOpen, setReportMenuOpen] = useState(false);


    return (
        <Drawer anchor="left"
                open={showSideBar}
                onClose={() => dispatch(sideBarToggled())}
                classes={{
                    root: classes.root,
                    paper: classes.drawerPaper
                }}>
            <div
                role="presentation"
                className={clsx(classes.list)}>
                <List classes={{
                    root: classes.listRoot
                }}>
                    <ImsMenuListItem icon={<NavigateBeforeOutlined/>} onClick={()=>dispatch(sideBarToggled())}/>
                    <ImsMenuListItem icon={<DashIcon/>} text="Dashboard" onClick={() => {
                        history.push("/");
                        dispatch(sideBarToggled());
                    }}/>
                    <Divider color="#00000"/>
                    <ImsMenuListItem icon={<SaveAlt/>} text="Vendor Transactions"
                                     onClick={() => {
                                         setVendTxnListOpen(!vendTxnListOpen)
                                     }}
                                     collapseIcon={vendTxnListOpen ? <ExpandLess/> : <ExpandMore/>}/>
                    <Collapse in={vendTxnListOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ImsMenuListItem text="Goods Receipt Note" className={classes.nested}
                                             onClick={() => {
                                                 history.push("/grn");
                                                 dispatch(sideBarToggled());
                                             }} subMenu={true}/>
                            <ImsMenuListItem text="Vendor Order" className={classes.nested}
                                             onClick={() => {
                                                 history.push("/grn");
                                                 dispatch(sideBarToggled());
                                             }} subMenu={true}/>
                        </List>
                    </Collapse>
                    <ImsMenuListItem icon={<ReplyAllRounded/>} text="Customer Transactions" onClick={() => {
                        setCustTxnListOpen(!custTxnListOpen)
                    }} collapseIcon={custTxnListOpen ? <ExpandLess/> : <ExpandMore/>}/>
                    <Collapse in={custTxnListOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ImsMenuListItem text="Customer Order" className={classes.nested} onClick={() => {
                                history.push("/grn");
                                dispatch(sideBarToggled());
                            }} subMenu={true}/>
                            <ImsMenuListItem text="Delivery Note" icon={<LocalShipping/>} className={classes.nested} onClick={() => {
                                history.push("/grn");
                                dispatch(sideBarToggled());
                            }} subMenu={true}/>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => {
                        setListMenuOpen(!listMenuOpen)
                    }}>
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Lists"}/>
                        {listMenuOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={listMenuOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => {
                                history.push("/customer");
                                dispatch(sideBarToggled());
                            }}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Customers"/>
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => {
                                history.push("supplier");
                                dispatch(sideBarToggled())
                            }}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Suppliers"/>
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => {
                                history.push("/inventory");
                                dispatch(sideBarToggled())
                            }}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Inventory"/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <Settings component="svg"/>
                        </ListItemIcon>
                        <ListItemText primary={"Setup"}/>
                    </ListItem>
                    <ListItem button onClick={() => setReportMenuOpen(!reportMenuOpen)}>
                        <ListItemIcon>
                            <ReportIcon component="svg"/>
                        </ListItemIcon>
                        <ListItemText primary={"Reports"}/>
                        {reportMenuOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={reportMenuOpen} timeout="auto" unmountOnExit>

                    </Collapse>
                </List>
            </div>
        </Drawer>
    )
};


export default AppSideBar;