import React from "react";
import {Switch} from "react-router";
import AppInventoryView from "../../views/AppInventoryView";
import ProtectedRoute from "../../components/ui/ProtectedRoute";

const AdmRoutes=()=>{

    return (
        <Switch>
            <ProtectedRoute exact="/inventory" component={<AppInventoryView/>}/>
        </Switch>
    )
};

export default AdmRoutes;