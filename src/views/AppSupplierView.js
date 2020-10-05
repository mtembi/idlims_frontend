import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {indigo} from "@material-ui/core/colors";
import AppSupplierTable from "../components/AppSupplierTable";

const setStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: indigo[50],
        height: "80vh"
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

const AppSupplierView=()=>{
    const classes = setStyle();

    return (
        <Grid container className={classes.root} alignContent="flex-start" spacing={2}>
            <Grid item xs={12} className={classes.titleItem}>
                <Typography className={classes.title} variant="h5">Suppliers</Typography>
            </Grid>
            <Grid item xs={12}>
                <AppSupplierTable/>
            </Grid>
        </Grid>
    )
};

export default AppSupplierView;