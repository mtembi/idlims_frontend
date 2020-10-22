import {combineReducers} from "redux";
import {UxReducer} from './appux/UxReducer';
import {UserFxnReducer} from "./userFxn/UserFxnReducer";
import {InvFxnReducer} from "./invFxn/InvFxnReducer";
import {InvGrpReducer} from "./invGrpFxn/InvGrpFxnReducer";
import {UomFxnReducer} from "./uomFxn/UomFxnReducer";
import {PartnerFxnReducer} from "./partnerFxn/PartnerFxnReducer";
import {TxnFxnReducer} from "./txnDocFxn/TxnFxnReducer";
import {NotificationReducer} from "./appNotifs/NotifsFxnReducer";

export const rootReducer=combineReducers({
    uxReducer: UxReducer,
    userFxnReducer: UserFxnReducer,
    invFxnReducer: InvFxnReducer,
    invGrpFxnReducer: InvGrpReducer,
    uomFxnReducer: UomFxnReducer,
    partnerFxnReducer: PartnerFxnReducer,
    txnFxnReducer: TxnFxnReducer,
    notifReducer: NotificationReducer,
});

