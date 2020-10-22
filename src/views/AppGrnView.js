import React from 'react';
import {Segment} from "semantic-ui-react";
import GrnTable from "../components/inboundDel/GrnTable";

/**
 * Warning, success, error, info
 * @returns {*}
 * @constructor
 */



const AppGrnView = () => {

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