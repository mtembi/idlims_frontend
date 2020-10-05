import * as txnFxnTypes from './TxnFxnTypes';
import * as appContants from '../../constant';
import {produce} from "immer";



const initialState={
    showDialog: false,
    docType:appContants.DOC_GRN,
    dialogType: appContants.ADD_ITEM_CONSTANT,

    selectedItem: null,

    fetchDataLoading: false,
    fetchDataList: [],
    fetchDataError: "",

    putLoading: false,
    putError:"",
};

export const TxnFxnReducer=(state=initialState, action)=>{
    switch (action.type){
        case txnFxnTypes.SHOW_TXN_DOC_DIALOG:
            return produce(state, (draft)=>{
                draft.showDialog= action.payload.showDialog;
                draft.dialogType= action.payload.dialogType;
                draft.docType=action.payload.docType;
            });
        case txnFxnTypes.SET_SELECTED_TXN_DOC_ITEM:{
            return produce(state, (draft)=>{
                draft.selectedItem= action.payload.selectedItem
            });
        }
        case txnFxnTypes.FETCH_TXN_DOC_REQUEST:
            return produce(state, (draft)=>{
                draft.fetchDataLoading= true;
                draft.fetchDataList= [];
                draft.fetchDataError= "";
            });
        case txnFxnTypes.FETCH_TXN_DOC_SUCCESS:
            return produce(state, (draft)=>{
                draft.fetchDataLoading= false;
                draft.fetchDataList= action.payload.list;
            });
        case txnFxnTypes.FETCH_TXN_DOC_FAILURE:
            return produce(state, (draft)=>{
                draft.fetchDataLoading= false;
                draft.fetchDataError= action.payload.error
            });

        case txnFxnTypes.PUT_TXN_DOC_REQUEST:
            return produce(state, (draft)=>{
                draft.putLoading= true;
                draft.putError= ""
            });
        case txnFxnTypes.PUT_TXN_DOC_SUCCESS:
            return produce(state, (draft)=>{
                draft.fetchDataList.push(action.payload.data);
                draft.putLoading= false;
                draft.putError= "";
            });
        case txnFxnTypes.PUT_TXN_DOC_FAILURE:
            return produce(state, (draft)=>{
                draft.putLoading= false;
                draft.putData= null;
                draft.putError=action.payload.error;
            });
        default: return state;
    }
};