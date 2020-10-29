import React from 'react';
import AppInventoryTable from "../components/inventory/AppInventoryTable";
import {Segment, Tab} from "semantic-ui-react";
import InventoryDialog from "../components/inventory/InventoryDialog";
import UomTable from "../components/inventory/UomTable";
import UomDialog from "../components/inventory/UomDialog";
import GroupsTable from "../components/inventory/GroupsTable";
import GroupsDialog from "../components/inventory/GroupsDialog";
import StockcardTable from "../components/inventory/StockcardTable";
import WarehouseTable from "../components/inventory/WarehouseTable";
import WarehouseDialog from "../components/inventory/WarehouseDialog";


const AppInventoryView = () => {

    const tabPanes = [
        {
            menuItem: "Items",
            render: () => <Tab.Pane attached="top" content={<AppInventoryTable/>}/>
        },
        {
            menuItem: "Stock Card",
            render: () => <Tab.Pane attached="top" content={<StockcardTable/>}/>
        },
        {
            menuItem: "Groups",
            render: () => <Tab.Pane attached="top" content={<GroupsTable/>}/>
        },
        {
            menuItem: "Unit of Measure",
            render: () => <Tab.Pane attached="top" content={<UomTable/>}/>
        },
        {
            menuItem: "Warehouses",
            render: () => <Tab.Pane attached="top" content={<WarehouseTable/>}/>
        }
    ];


    return (
        <>
            <Segment.Group raised>
                <Segment inverted color="blue">
                    <h3>Inventory</h3>
                </Segment>
                <Segment>
                    <Tab panes={tabPanes} menu={{color: 'teal', inverted: true, tabular: true}}/>
                </Segment>
            </Segment.Group>
            <InventoryDialog/>
            <GroupsDialog/>
            <WarehouseDialog/>
            <UomDialog/>
        </>
    )
};

export default AppInventoryView;