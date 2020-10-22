import React from 'react';
import CustomerTable from "../components/partner/CustomerTable";
import {Segment} from "semantic-ui-react";
import PartnerDialog from "../components/partner/PartnerDialog";


const AppCustomerView = () => {


    return (
        <>
            <Segment.Group raised>
                <Segment inverted color="blue">
                    <h3>Customers</h3>
                </Segment>
                <Segment>
                    <CustomerTable/>
                </Segment>
            </Segment.Group>
            <PartnerDialog/>
        </>
    )
};

export default AppCustomerView;