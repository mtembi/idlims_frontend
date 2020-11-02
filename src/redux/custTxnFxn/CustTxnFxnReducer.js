import * as custTxnTypes from './CustTxnFxnTypes';
import * as appConsts from '../../constant';
import {produce} from "immer";

const initialState = {
    dialogShown: false,
    docType: appConsts.ADD_ITEM_CONSTANT,

    fetchDataLoading: false,
    fetchDataList: [],
    fetchDataError: null,

    fetchCustDelLoading: false,
    fetchCustDelList: [],
    fetchCustDelError: null,

    fetchCustDelRqLoading: false,
    fetchCustDelRqList: [],
    fetchCustDelRqError: null,

    pushDataLoading: false,
    pushDataList: [],
    pushDataError: null,

};

export const CustDelFxnReducer = (state = initialState, action) => {
    switch (action.type) {
        case custTxnTypes.SHOW_CUST_TXN_DIALOG:
            return produce(state, (draft) => {
                draft.dialogShown = action.payload.show;
                draft.docType = action.payload.docType;
            });

        case custTxnTypes.FETCH_CUST_DEL_REQUEST:
            return produce(state, (draft) => {
                draft.fetchCustDelLoading = true;
                draft.fetchCustDelList = [];
                draft.fetchCustDelError = null;
            });
        case custTxnTypes.FETCH_CUST_DEL_SUCCESS:
            return produce(state, (draft) => {
                draft.fetchCustDelLoading = false;
                draft.fetchCustDelList = action.payload.data;
            });
        case custTxnTypes.FETCH_CUST_DEL_FAILURE:
            return produce(state, (draft) => {
                draft.fetchCustDelLoading = false;
                draft.fetchCustDelError = action.payload.error;
            });

        case custTxnTypes.FETCH_CUST_DEL_RQ_REQUEST:
            return produce(state, (draft) => {
                draft.fetchCustDelRqLoading = true;
                draft.fetchCustDelList = [];
                draft.fetchCustDelError = null;
            });
        case custTxnTypes.FETCH_CUST_DEL_RQ_SUCCESS:
            return produce(state, (draft) => {
                draft.fetchCustDelRqLoading = false;
                draft.fetchCustDelRqList = action.payload.data;
            });
        case custTxnTypes.FETCH_CUST_DEL_RQ_FAILURE:
            return produce(state, (draft) => {
                draft.fetchCustDelRqLoading = false;
                draft.fetchCustDelRqError = action.payload.error;
            });

        default:
            return state;
    }
};