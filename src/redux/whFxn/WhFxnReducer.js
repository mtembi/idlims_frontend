import * as whFxnTypes from './WhFxnTypes';
import * as appConstants from "../../constant";
import {produce} from "immer";

const initialState = {
    showWhDialog: false,
    dialogType: appConstants.ADD_ITEM_CONSTANT,

    fetchDataLoading: false,
    fetchDataList: [],
    fetchDataError: '',

    pushWhLoading: false,
    pushWhData: null,
    pushWhError: null,

    checkExistLoading: false,
    checkExistResult: false,
    checkExistError: {}
};

export const WhFxnReducer = (state = initialState, action) => {
    switch (action.type) {
        case whFxnTypes.SHOW_WH_DIALOG:
            return produce(state, (draft) => {
                draft.showWhDialog = action.payload.showDialog;
            });

        case whFxnTypes.FETCH_WHS_REQUEST:
            return produce(state, (draft) => {
                draft.fetchDataLoading = true;
                draft.fetchDataList = [];
                draft.fetchDataError = null;
            });
        case whFxnTypes.FETCH_WHS_SUCCESS: {
            console.log("wh Success", action);
            console.log("Payload error", action.payload);
            return produce(state, (draft) => {
                draft.fetchDataLoading = false;
                draft.fetchDataList = action.payload.whData;
            });
        }
        case whFxnTypes.FETCH_WHS_FAILURE:
            return produce(state, (draft) => {
                draft.fetchDataLoading = false;
                draft.fetchDataError = action.payload.err;
            });

        case whFxnTypes.PUT_WHS_REQUEST:
            return produce(state, (draft) => {
                draft.pushWhLoading = true;
                draft.pushWhData = null;
                draft.pushWhError = '';
            });
        case whFxnTypes.PUT_WHS_SUCCESS:
            return produce(state, (draft) => {
                draft.pushWhLoading = false;
                draft.pushWhData = action.payload.wh;
                draft.fetchDataList.push(action.payload.wh);
                draft.pushWhError = '';
            });
        case whFxnTypes.PUT_WHS_FAILURE:
            return produce(state, (draft) => {
                draft.pushWhLoading = false;
                draft.pushWhError = action.payload.error;
            });

        case whFxnTypes.CHECK_WH_EXIST_REQUEST:
            return produce(state, (draft) => {
                draft.checkExistLoading = true;
                draft.checkExistResult = false;
                draft.checkExistError = {}
            });
        case whFxnTypes.CHECK_WH_EXIST_SUCCESS:
            return produce(state, (draft) => {
                draft.checkExistLoading = false;
                draft.checkExistResult = action.payload.exists;
            });
        case whFxnTypes.CHECK_WH_EXIST_FAILURE:
            return produce(state, (draft) => {
                draft.checkExistLoading = true;
                draft.checkExistError = action.payload.error;
            });

        default:
            return state;
    }
};