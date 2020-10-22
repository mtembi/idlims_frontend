import React, {useState} from 'react';
import {useHistory} from "react-router";
import {Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {
    Assessment as ReportIcon,
    ExpandLess,
    ExpandMore,
    FormatAlignJustify as ListIcon,
    Home as DashIcon,
    LocalShipping,
    NavigateBeforeOutlined,
    ReplyAllRounded,
    SaveAlt,
    Settings
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
                    <ImsMenuListItem icon={<SaveAlt/>} text="Vendor Transactions"
                                     onClick={() => {
                                         setVendTxnListOpen(!vendTxnListOpen)
                                     }}
                                     collapseIcon={vendTxnListOpen ? <ExpandLess color="white"/> : <ExpandMore/>}/>
                    <Collapse in={vendTxnListOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ImsMenuListItem text="Vendor Order" className={classes.nested}
                                             onClick={() => {
                                                 history.push("/grn");
                                                 dispatch(sideBarToggled());
                                             }} subMenu={true}/>
                            <ImsMenuListItem text="Goods Receipt Note" className={classes.nested}
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
                    <ImsMenuListItem text="Listing" onClick={()=>setListMenuOpen(!listMenuOpen)}/>
                    <Collapse in={listMenuOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ImsMenuListItem text="Inventory" className={classes.nested} onClick={()=>{
                                history.push("/inventory");
                                dispatch(sideBarToggled())
                            }} subMenu={true}/>
                            <ImsMenuListItem text="Customers" className={classes.nested} onClick={()=>{
                                history.push("/customer");
                                dispatch(sideBarToggled())
                            }} subMenu={true}/>
                            <ImsMenuListItem text="Vendors" className={classes.nested} onClick={()=>{
                                history.push("/vendor");
                                dispatch(sideBarToggled())
                            }} subMenu={true}/>
                        </List>
                    </Collapse>
                </List>
            </div>
        </Drawer>
    )
};


export default AppSideBar;