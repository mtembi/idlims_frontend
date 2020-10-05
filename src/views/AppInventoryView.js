import React, {useRef} from 'react';
import {Grid, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TabComponent, TabItemDirective, TabItemsDirective} from "@syncfusion/ej2-react-navigations";
import AppInventoryTable from "../components/AppInventoryTable";
import {indigo} from "@material-ui/core/colors";
import AppStockCardTable from "../components/AppStockCardTable";

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
        <>
            <Grid container className={classes.root} alignContent="flex-start" spacing={2}>
                <Grid item xs={12} className={classes.titleItem}>
                    <Typography className={classes.title} variant="h5">Inventory</Typography>
                </Grid>
                <Grid item xs={12}>
                    <AppInventoryTable/>
                </Grid>
            </Grid>

        </>
    )
};

export default AppInventoryView;