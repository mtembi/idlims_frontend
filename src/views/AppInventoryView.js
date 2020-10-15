import React, {useRef} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppInventoryTable from "../components/inventory/AppInventoryTable";
import {indigo} from "@material-ui/core/colors";
import AppStockCardTable from "../components/inventory/AppStockCardTable";
import {Segment} from "semantic-ui-react";

const setStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: indigo[50],
        height: "85vh"
    },
    titleItem: {
        backgroundColor: "#2196f3",
        borderRadius: 2,
        border: 0
    },
    title: {
        color: "#ffffff"
    }
}));

const AppInventoryView = () => {
    const tabsCompRef = useRef(null);
    const classes = setStyle();
    const headerText = [{text: 'Inventory List'}, {text: "Stock card"}];
    const invListTemplate = () => {
        return (
            <AppInventoryTable/>
        )
    };

    const stockCardTemplate = () => {
        return (
            <AppStockCardTable/>
        )
    };

    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Inventory</h3>
            </Segment>
            <Segment>
                <AppInventoryTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppInventoryView;