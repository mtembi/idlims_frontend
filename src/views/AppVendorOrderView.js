import React from "react";
import {Segment} from "semantic-ui-react";
import VendOrderTable from "../components/vendorder/VendOrderTable";

const AppVendorOrderView=()=>{


    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Vendor Orders</h3>
            </Segment>
            <Segment>
                <VendOrderTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppVendorOrderView;