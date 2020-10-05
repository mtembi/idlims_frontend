import React, {useState} from 'react';
import {useHistory} from "react-router";
import {Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse} from "@material-ui/core";
import {Assessment as ReportIcon, Settings, TextRotateUpOutlined as TxnIcon,
    Home as DashIcon,
    FormatAlignJustify as ListIcon, NavigateBefore, ExpandLess, ExpandMore} from "@material-ui/icons";
import {sideBarToggled} from "../redux";
import {connect} from "react-redux";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme)=>({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const AppSideBar = ({showSideBar, toggleSideBar}) => {
    const history=useHistory();
    const classes=useStyles();
    const [txnListOpen, setTxnListOpen]=useState(false);
    const [listMenuOpen, setListMenuOpen]=useState(false);
    const [reportMenuOpen, setReportMenuOpen]=useState(false);
    return (
        <Drawer anchor="left" open={showSideBar} onClose={()=>{toggleSideBar()}}>
            <div
                role="presentation"
                className={clsx(classes.list)}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <NavigateBefore/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={()=>{history.push("/"); toggleSideBar();}}>
                        <ListItemIcon>
                            <DashIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"}/>
                    </ListItem>
                    <ListItem button onClick={()=>{setTxnListOpen(!txnListOpen)}}>
                        <ListItemIcon>
                            <TxnIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Transactions"}/>
                        {txnListOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={txnListOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}  onClick={()=>{history.push("/grn"); toggleSideBar();}}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Goods Receipt Note" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Delivery Note" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Pick Note" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={()=>{setListMenuOpen(!listMenuOpen)}}>
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Lists"}/>
                        {listMenuOpen? <ExpandLess/>: <ExpandMore/>}
                    </ListItem>
                    <Collapse in={listMenuOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={()=>{history.push("/customer"); toggleSideBar();}}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Customers" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={()=>{history.push("supplier"); toggleSideBar()}}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Suppliers" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={()=>{history.push("/inventory");toggleSideBar()}}>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary="Inventory" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <Settings component="svg"/>
                        </ListItemIcon>
                        <ListItemText primary={"Setup"}/>
                    </ListItem>
                    <ListItem button onClick={()=>setReportMenuOpen(!reportMenuOpen)}>
                        <ListItemIcon>
                            <ReportIcon component="svg"/>
                        </ListItemIcon>
                        <ListItemText primary={"Reports"}/>
                        {reportMenuOpen?<ExpandLess/>:<ExpandMore/>}
                    </ListItem>
                    <Collapse in={reportMenuOpen} timeout="auto" unmountOnExit>

                    </Collapse>
                </List>
            </div>
        </Drawer>
    )
};

const mapStateToProps=state=>{
    return {
        showSideBar: state.uxReducer.showSideBar
    }
};

const mapDispatchToProps=dispatch=>{
    return {
        toggleSideBar: ()=>{dispatch(sideBarToggled())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSideBar)