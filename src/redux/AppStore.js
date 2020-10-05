import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./AppRootReducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";


export const appStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));