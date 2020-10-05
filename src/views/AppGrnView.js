import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../redux";
import {Grid, Segment} from "semantic-ui-react";
import {makeStyles} from "@material-ui/core/styles";
import {indigo} from "@material-ui/core/colors";
import GrnTable from "../components/GrnTable";

/**
 * Warning, success, error, info
 * @returns {*}
 * @constructor
 */

const setStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: indigo[50],
    },
    titleItem: {
        backgroundColor: "#2196f3",
        borderRadius: 2,
        border: 0
    },
    title: {
        color: "#ffffff"
    }
}));

const AppGrnView=()=>{
    const classes=setStyle();
    const showDialog=useSelector(state=>state.txnFxnReducer.showDialog);

    const dispatch=useDispatch();

    const handleToastMessage=()=>{
        dispatch(showNotification("Testing ", "error"));
    };

    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Goods Receipts</h3>
            </Segment>
            <Segment>
                <GrnTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppGrnView;