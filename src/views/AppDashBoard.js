import React from 'react';
import {Grid, Typography, Card, CardContent, CardHeader} from "@material-ui/core";


const AppDashBoard=()=>{
    return (
        <Grid container style={{backgroundColor: "#cccccc", height: "89vh"}} alignContent="flex-start" spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">DashBoard</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={2}>
                    <CardHeader>
                        <Typography variant="h6">Sample Chart</Typography>
                    </CardHeader>
                    <CardContent>
                        <Typography>This is a sample chart content</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default AppDashBoard;