import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../redux";
import {Segment} from "semantic-ui-react";
import GrnTable from "../components/inboundDel/GrnTable";

/**
 * Warning, success, error, info
 * @returns {*}
 * @constructor
 */



const AppGrnView = () => {
    const showDialog = useSelector(state => state.txnFxnReducer.showDialog);

    const dispatch = useDispatch();

    const handleToastMessage = () => {
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