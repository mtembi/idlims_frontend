import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppDashBoard from "../../views/AppDashBoard";
import AppLoginView from "../../views/AppLoginView";
import AppInventoryView from "../../views/AppInventoryView";

const ImsRouteContent = () => {

    return (
        <Router basename="/">
            <Switch>
                <Route exact path="/login"><AppLoginView/></Route>
                <ProtectedRoute exact path="/" component={<AppDashBoard/>}/>
                <ProtectedRoute exact path="/inventory" component={<AppInventoryView/>}/>
            </Switch>
        </Router>
    )
};

export default ImsRouteContent;