import React from "react";
import {Segment} from "semantic-ui-react";
import CustDelOrderTable from "../components/custdelord/CustDelOrderTable";

const AppCustOrderView=()=>{
    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Customer Delivery Order</h3>
            </Segment>
            <Segment>
                <CustDelOrderTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppCustOrderView;