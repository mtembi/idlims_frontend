import React from 'react';
import AppInventoryTable from "../components/inventory/AppInventoryTable";
import {Segment} from "semantic-ui-react";
import InventoryDialog from "../components/inventory/InventoryDialog";


const AppInventoryView = () => {
    return (
        <>
            <Segment.Group raised>
                <Segment inverted color="blue">
                    <h3>Inventory</h3>
                </Segment>
                <Segment>
                    <AppInventoryTable/>
                </Segment>
            </Segment.Group>
            <InventoryDialog/>
        </>
    )
};

export default AppInventoryView;