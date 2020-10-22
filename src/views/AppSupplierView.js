import React from 'react';
import AppSupplierTable from "../components/partner/AppSupplierTable";
import {Segment} from "semantic-ui-react";
import PartnerDialog from "../components/partner/PartnerDialog";

const AppSupplierView=()=>{
    return (
        <>
            <Segment.Group raised>
                <Segment inverted color="blue">
                    <h3>Vendors</h3>
                </Segment>
                <Segment>
                    <AppSupplierTable/>
                </Segment>
            </Segment.Group>
            <PartnerDialog/>
        </>
    )
};

export default AppSupplierView;