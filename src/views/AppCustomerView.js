import React from 'react';
import CustomerTable from "../components/CustomerTable";
import {Segment} from "semantic-ui-react";


const AppCustomerView = () => {


    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Customers</h3>
            </Segment>
            <Segment>
                <CustomerTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppCustomerView;