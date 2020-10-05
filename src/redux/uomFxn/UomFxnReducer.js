import * as uomFxnTypes from './UomFxnTypes';
import {produce} from "immer";
import * as appConstants from '../../constant/';

const initialState={
    showUomDialog: false,
    uomDialogType: appConstants.ADD_ITEM_CONSTANT,

    selectedUomItem: null,

    uomDataLoading: false,
    uomDataList: [],
    uomDataError: "",

    uomPutLoading: false,
    uomPutError:"",
};

export const UomFxnReducer=(state=initialState, action)=>{
    switch (action.type){
        case uomFxnTypes.SHOW_UOM_DIALOG:
            return produce(state, (draft)=>{
                draft.showUomDialog= action.payload.showUomDialog;
                draft.uomDialogType= action.payload.uomDialogType;
            });
        case uomFxnTypes.SET_SELECTED_UOM_ITEM:{
            return produce(state, (draft)=>{
                draft.uomDataLoading= true
                draft.uomDataList= [];
                draft.uomDataError= "";
            });
        }
        case uomFxnTypes.FETCH_UOM_REQUEST:
            return produce(state, (draft)=>{
                draft.uomDataLoading= true;
                draft.uomDataList= [];
                draft.uomDataError= "";
            });
        case uomFxnTypes.FETCH_UOM_SUCCESS:
            return produce(state, (draft)=>{
                draft.uomDataLoading= false;
                draft.uomDataList= action.payload.uomDataList;
            });
        case uomFxnTypes.FETCH_UOM_FAILURE:
            return produce(state, (draft)=>{
                draft.uomDataLoading=false;
                draft.uomDataError= action.payload.error;
            });

        case uomFxnTypes.PUT_UOM_REQUEST:
            return produce(state, (draft)=>{
                draft.uomPutLoading=true;
            });
        case uomFxnTypes.PUT_UOM_SUCCESS:
            return produce(state, (draft)=>{
                draft.uomPutLoading=false;
                draft.uomDataList.push(action.payload.uomData)
            });
        case uomFxnTypes.PUT_UOM_FAILURE:
            return produce(state, (draft)=>{
                draft.uomPutLoading=false;
                draft.uomPutError=action.payload.error
            });
        default: return state;
    }
};