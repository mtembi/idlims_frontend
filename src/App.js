import React from 'react';
import {SnackbarProvider} from "notistack";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import Notifier from "./components/ui/Notifier";
import AppNavBar from "./components/ui/AppNavBar";
import AppSideBar from "./components/ui/AppSideBar";
import ImsRouteContent from "./components/ui/ImsRouteContent";
import AdmRoutes from "./admin/adminui/AdmRoutes";


function App() {


    return (
        <SnackbarProvider preventDuplicate anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
            <Router baseName="/">
                <div id="appTarget" className="App" style={{padding: 10}}>
                    <AppNavBar/>
                    <AppSideBar/>
                    <Switch>
                        <ImsRouteContent/>
                    </Switch>
                </div>
            </Router>

            <Notifier/>
        </SnackbarProvider>
    );
}

export default App;
