import React from 'react';
import {Segment} from "semantic-ui-react";
import VendGrnTable from "../components/vendgrn/VendGrnTable";

/**
 * Warning, success, error, info
 * @returns {*}
 * @constructor
 */



const AppGrnView = () => {

    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Vendor Goods Receipts</h3>
            </Segment>
            <Segment>
                <VendGrnTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppGrnView;