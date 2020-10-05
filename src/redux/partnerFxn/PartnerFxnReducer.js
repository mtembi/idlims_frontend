import * as partnerFxnTypes from './PartnerFxnTypes';
import * as appContants from '../../constant';
import {produce} from "immer";



const initialState={
    showDialog: false,
    partnerType: appContants.CUSTOMER_TYPE,
    dialogType: appContants.ADD_ITEM_CONSTANT,

    selectedItem: null,

    fetchDataLoading: false,
    fetchDataList: [],
    fetchDataError: "",

    putLoading: false,
    putError:"",
};

export const PartnerFxnReducer=(state=initialState, action)=>{
    switch (action.type){
        case partnerFxnTypes.SHOW_PARTNER_DIALOG:
            return produce(state, (draft)=>{
                draft.showDialog= action.payload.showDialog;
                draft.dialogType= action.payload.dialogType;
                draft.partnerType=action.payload.partnerType;
            });
        case partnerFxnTypes.SET_SELECTED_PARTNER_ITEM:{
            return produce(state, (draft)=>{
                draft.selectedItem= action.payload.selectedItem
            });
        }
        case partnerFxnTypes.FETCH_PARTNER_REQUEST:
            return produce(state, (draft)=>{
                draft.fetchDataLoading= true;
                draft.fetchDataList= [];
                draft.fetchDataError= "";
            });
        case partnerFxnTypes.FETCH_PARTNER_SUCCESS:
            return produce(state, (draft)=>{
                draft.fetchDataLoading= false;
                draft.fetchDataList= action.payload.list;
            });
        case partnerFxnTypes.FETCH_PARTNER_FAILURE:
            return produce(state, (draft)=>{
                draft.fetchDataLoading= false;
                draft.fetchDataError= action.payload.error
            });

        case partnerFxnTypes.PUT_PARTNER_REQUEST:
            return produce(state, (draft)=>{
                draft.putLoading= true;
                draft.putError= ""
            });
        case partnerFxnTypes.PUT_PARTNER_SUCCESS:
            return produce(state, (draft)=>{
                draft.fetchDataList.push(action.payload.data);
                draft.putLoading= false;
                draft.putError= "";
            });
        case partnerFxnTypes.PUT_PARTNER_FAILURE:
            return produce(state, (draft)=>{
                draft.putLoading= false;
                draft.putData= null;
                draft.putError=action.payload.error;
            });
        default: return state;
    }
};