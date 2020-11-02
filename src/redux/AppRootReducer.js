import {combineReducers} from "redux";
import {UxReducer} from './appux/UxReducer';
import {UserFxnReducer} from "./userFxn/UserFxnReducer";
import {InvFxnReducer} from "./invFxn/InvFxnReducer";
import {InvGrpReducer} from "./invGrpFxn/InvGrpFxnReducer";
import {UomFxnReducer} from "./uomFxn/UomFxnReducer";
import {PartnerFxnReducer} from "./partnerFxn/PartnerFxnReducer";
import {TxnFxnReducer} from "./txnDocFxn/TxnFxnReducer";
import {WhFxnReducer} from "./whFxn/WhFxnReducer";
import {VendOrdFxnReducer} from "./vendOrdFxn/VendOrdFxnReducer";
import {NotificationReducer} from "./appNotifs/NotifsFxnReducer";
import {} from './custTxnFxn/CustTxnFxnReducer';
import {CustDelFxnReducer} from "./custTxnFxn/CustTxnFxnReducer";

export const rootReducer=combineReducers({
    uxReducer: UxReducer,
    userFxnReducer: UserFxnReducer,
    invFxnReducer: InvFxnReducer,
    invGrpFxnReducer: InvGrpReducer,
    uomFxnReducer: UomFxnReducer,
    partnerFxnReducer: PartnerFxnReducer,
    txnFxnReducer: TxnFxnReducer,
    whFxnReducer: WhFxnReducer,
    vendOrdReducer: VendOrdFxnReducer,
    custTxnFxnReducer: CustDelFxnReducer,
    notifReducer: NotificationReducer,
});

