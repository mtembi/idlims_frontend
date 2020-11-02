import * as vndTypes from './VendOrdFxnTypes';
import * as appConsts from '../../constant';
import {produce} from "immer";

const vendOrdState = {
    dialogShown: false,
    docType: appConsts.ADD_ITEM_CONSTANT,
    fetchDataLoading: false,
    fetchDataList: [],
    fetchDataError: null,

    fetchGrnDataLoading: false,
    fetchGrnDataList: [],
    fetchGrnDataError: null,

    pushDataLoading: false,
    pushDataList: [],
    pushDataError: null,
    updateDataLoading: false,
    updateDataList: [],
    updateDataError: null,
};

export const VendOrdFxnReducer = (state = vendOrdState, action) => {
    switch (action.type) {
        case vndTypes.SHOW_VEND_ORDER_DIALOG:
            return produce(state, (draft) => {
                draft.dialogShown = action.payload.show;
                draft.docType = action.payload.docType;
            });
        case vndTypes.FETCH_VEND_ORDER_REQUEST:
            return produce(state, (draft) => {
                draft.fetchDataLoading = true;
                draft.fetchDataList = [];
                draft.fetchDataError = null;
            });
        case vndTypes.FETCH_VEND_ORDER_SUCCESS:
            return produce(state, (draft) => {
                draft.fetchDataLoading = false;
                draft.fetchDataList = action.payload.data;
            });
        case vndTypes.FETCH_VEND_ORDER_FAILURE:
            return produce(state, (draft) => {
                draft.fetchDataLoading = false;
                draft.fetchDataError = action.payload.error;
            });

        case vndTypes.FETCH_GRN_ORDER_REQUEST:
            return produce(state, (draft) => {
                draft.fetchGrnDataLoading = true;
                draft.fetchGrnDataList = [];
                draft.fetchGrnDataError = null;
            });
        case vndTypes.FETCH_GRN_ORDER_SUCCESS:
            return produce(state, (draft) => {
                draft.fetchGrnDataLoading = false;
                draft.fetchGrnDataList = action.payload.data;
            });
        case vndTypes.FETCH_GRN_ORDER_FAILURE:
            return produce(state, (draft) => {
                draft.fetchGrnDataLoading = false;
                draft.fetchGrnDataError = action.payload.error;
            });

        case vndTypes.PUSH_VEND_ORDER_REQUEST:
            return produce(state, (draft) => {
                draft.pushDataLoading = true;
                draft.pushDataList = [];
                draft.pushDataError = null;
            });
        case vndTypes.PUSH_VEND_ORDER_SUCCESS:
            return produce(state, (draft) => {
                draft.pushDataLoading = true;
                draft.pushDataList = action.payload.data;
            });
        case vndTypes.PUSH_VEND_ORDER_FAILURE:
            return produce(state, (draft) => {
                draft.pushDataLoading = true;
                draft.pushDataError = action.state.error;
            });

        case vndTypes.UPDATE_VEND_ORDER_REQUEST:
            return produce(state, (draft) => {
                draft.updateDataLoading = true;
                draft.updateDataList = [];
                draft.updateDataError = null;
            });
        case vndTypes.UPDATE_VEND_ORDER_SUCCESS:
            return produce(state, (draft) => {
                draft.updateDataLoading = true;
                draft.updateDataList = action.payload.data;
            });
        case vndTypes.UPDATE_VEND_ORDER_FAILURE:
            return produce(state, (draft) => {
                draft.updateDataLoading = true;
                draft.updateDataError = action.state.error;
            });
        default:
            return state;
    }
};