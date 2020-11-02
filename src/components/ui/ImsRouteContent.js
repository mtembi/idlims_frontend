import React from "react";
import {Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppDashBoard from "../../views/AppDashBoard";
import AppLoginView from "../../views/AppLoginView";
import AppInventoryView from "../../views/AppInventoryView";
import AppCustomerView from "../../views/AppCustomerView";
import AppSupplierView from "../../views/AppSupplierView";
import AppGrnView from "../../views/AppGrnView";
import AppVendorOrderView from "../../views/AppVendorOrderView";
import AppCustOrderView from "../../views/AppCustOrderView";
import AppCustDelReqView from "../../views/AppCustDelReqView";

const ImsRouteContent = () => {

    return (
        <Switch>
            <Route exact path="/login"><AppLoginView/></Route>
            <ProtectedRoute exact path="/" component={<AppDashBoard/>}/>
            <ProtectedRoute exact path="/inventory" component={<AppInventoryView/>}/>
            <ProtectedRoute exact path="/customer" component={<AppCustomerView/>}></ProtectedRoute>
            <ProtectedRoute exact path="/vendor" component={<AppSupplierView/>}></ProtectedRoute>
            <ProtectedRoute exact path="/vendorder" component={<AppVendorOrderView/>}></ProtectedRoute>
            <ProtectedRoute exact path="/grn" component={<AppGrnView/>}></ProtectedRoute>
            <ProtectedRoute exact path="/deliveryorder" component={<AppCustOrderView/>}></ProtectedRoute>
            <ProtectedRoute exact path="/deliveryrequest" component={<AppCustDelReqView/>}></ProtectedRoute>
        </Switch>
    )
};

export default ImsRouteContent;