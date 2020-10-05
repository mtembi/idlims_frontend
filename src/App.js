import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {appStore} from "./redux/AppStore";
import {SnackbarProvider} from "notistack";
import AppNavBar from "./components/AppNavBar";
import AppSideBar from "./components/AppSideBar";
import AppDashBoard from "./views/AppDashBoard";
import AppInventoryView from "./views/AppInventoryView";
import "./App.css";
import AppCustomerView from "./views/AppCustomerView";
import AppSupplierView from "./views/AppSupplierView";
import InventoryDialog from "./components/InventoryDialog";
import 'semantic-ui-css/semantic.min.css'
import UomDialog from "./components/UomDialog";
import PartnerDialog from "./components/PartnerDialog";
import AppGrnView from "./views/AppGrnView";
import Notifier from "./components/Notifier";


function App() {
    return (
        <Provider store={appStore}>
            <SnackbarProvider preventDuplicate anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Router baseName="/">
                    <AppNavBar/>
                    <AppSideBar/>
                    <div id="appTarget" className="App" style={{padding: 10}}>
                        <Switch>
                            <Route exact path="/"><AppDashBoard/></Route>
                            <Route exact path="/inventory"><AppInventoryView/></Route>
                            <Route exact path="/customer"><AppCustomerView/></Route>
                            <Route exact path="/supplier"><AppSupplierView/></Route>
                            <Route exact path="/grn"><AppGrnView/></Route>
                        </Switch>
                    </div>
                </Router>
                <InventoryDialog/>
                <UomDialog/>
                <PartnerDialog/>
                <Notifier/>
            </SnackbarProvider>
        </Provider>
    );
}

export default App;
