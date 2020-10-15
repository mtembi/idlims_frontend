import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SnackbarProvider} from "notistack";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import Notifier from "./components/ui/Notifier";
import AppNavBar from "./components/ui/AppNavBar";
import AppSideBar from "./components/ui/AppSideBar";
import AppLoginView from "./views/AppLoginView";
import AppDashBoard from "./views/AppDashBoard";
import AppInventoryView from "./views/AppInventoryView";
import AppCustomerView from "./views/AppCustomerView";
import AppSupplierView from "./views/AppSupplierView";
import AppGrnView from "./views/AppGrnView";
import InventoryDialog from "./components/inventory/InventoryDialog";
import UomDialog from "./components/inventory/UomDialog";
import PartnerDialog from "./components/partner/PartnerDialog";
import ProtectedRoute from "./components/ui/ProtectedRoute";


function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userFxnReducer);

    return (
        <SnackbarProvider preventDuplicate anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
            <Router baseName="/">
                <AppNavBar/>
                <AppSideBar/>
                <div id="appTarget" className="App" style={{padding: 10}}>
                    <Switch>
                        <Route exact path="/login"><AppLoginView/></Route>
                        <ProtectedRoute exact path="/" component={<AppDashBoard/>}></ProtectedRoute>
                        <ProtectedRoute exact path="/inventory" component={<AppInventoryView/>}></ProtectedRoute>
                        <ProtectedRoute exact path="/customer" component={<AppCustomerView/>}></ProtectedRoute>
                        <ProtectedRoute exact path="/supplier" component={<AppSupplierView/>}></ProtectedRoute>
                        <ProtectedRoute exact path="/grn" component={<AppGrnView/>}></ProtectedRoute>
                    </Switch>
                </div>
            </Router>
            <InventoryDialog/>
            <UomDialog/>
            <PartnerDialog/>
            <Notifier/>
        </SnackbarProvider>
    );
}

export default App;
