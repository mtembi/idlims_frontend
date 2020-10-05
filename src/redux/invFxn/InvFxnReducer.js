import * as invFxnTypes from './InvFxnTypes';
import * as appContants from '../../constant';
import {produce} from "immer";

/**
 * @param inventoryDialogType choose between edit and add. if edit and is null show error
 * @type {{selectedInventory: null, inventoryDialogType: string, inventoryDataLoading: boolean, inventoryDataError: string, showInventoryDialog: boolean, inventoryDataList: Array}}
 */

const initialState={
    showInventoryDialog: false,
    inventoryDialogType: appContants.ADD_ITEM_CONSTANT,

    selectedInventoryItem: null,

    inventoryDataLoading: false,
    inventoryDataList: [],
    inventoryDataError: "",

    putInventoryLoading: false,
    putInventoryError:"",
};

export const InvFxnReducer=(state=initialState, action)=>{
    switch (action.type){
        case invFxnTypes.SHOW_INVENTORY_DIALOG:
            return produce(state, (draft)=>{
                draft.showInventoryDialog= action.payload.showInventoryDialog;
                draft.inventoryDialogType= action.payload.inventoryDialogType;
            });
        case invFxnTypes.SET_SELECTED_INVENTORY_ITEM:{
            return produce(state, (draft)=>{
                draft.selectedInventoryItem= action.payload.selectedItem
            });
        }
        case invFxnTypes.FETCH_INVENTORY_REQUEST:
            return produce(state, (draft)=>{
                draft.inventoryDataLoading= true;
                draft.inventoryDataList= [];
                draft.inventoryDataError= "";
            });
        case invFxnTypes.FETCH_INVENTORY_SUCCESS:
            return produce(state, (draft)=>{
                draft.inventoryDataLoading= false;
                draft.inventoryDataList= action.payload.inventoryDataList;
            });
        case invFxnTypes.FETCH_INVENTORY_FAILURE:
            return produce(state, (draft)=>{
                draft.inventoryDataLoading= false;
                draft.inventoryDataError= action.payload.error
            });

        case invFxnTypes.PUT_INVENTORY_REQUEST:
            return produce(state, (draft)=>{
                draft.putInventoryLoading= true;
                draft.putInventoryError= ""
            });
        case invFxnTypes.PUT_INVENTORY_SUCCESS:
            return produce(state, (draft)=>{
                draft.inventoryDataList.push(action.payload.inventoryData);
                draft.putInventoryLoading= false;
                draft.putInventoryError= "";
            });
        case invFxnTypes.PUT_INVENTORY_FAILURE:
            return produce(state, (draft)=>{
                draft.putInventoryLoading= false;
                draft.putInventoryData= null;
            });
        default: return state;
    }
};