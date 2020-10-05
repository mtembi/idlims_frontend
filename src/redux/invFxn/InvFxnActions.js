import * as invFxnTypes from './InvFxnTypes';
import *as appContants from '../../constant';

export const showInventoryDialog=(show, type=appContants.ADD_ITEM_CONSTANT)=>{
    return {
        type: invFxnTypes.SHOW_INVENTORY_DIALOG,
        payload: {
            showInventoryDialog: show,
            inventoryDialogType: type
        }
    }
};

export const setSelectedInventoryItem=(item)=>{
    return {
        type: invFxnTypes.SET_SELECTED_INVENTORY_ITEM,
        payload:{
            selectedItem: item
        }
    }
};

export const fetchInventoryRequest=()=>{
    return {
        type: invFxnTypes.FETCH_INVENTORY_REQUEST
    }
};

export const fetchInventorySuccess=inventories=>{
    return {
        type: invFxnTypes.FETCH_INVENTORY_SUCCESS,
        payload: {
            inventoryDataList: inventories
        }
    }
};

export const fetchInventoryFailure=error=>{
    return {
        type: invFxnTypes.FETCH_INVENTORY_FAILURE,
        payload:{
            error: error
        }
    }
};

export const fetchInventoryData=()=>{
    return dispatch=>{
        dispatch(fetchInventoryRequest());
        let dummyData=[];
        for (var i = 0; i < 20; i++) {
            dummyData.push(
                {
                    id: i,
                    invRef: "Item" + i,
                    invName: 'Item Name' + i,
                    invDesc: "Some Long Text about the item",
                    invCurrQty: Math.round(Math.random() * 1000),
                    invMinQty: 10,
                    invMaxQty: 1000,
                    createDate: [2019, 10, 10],
                    activeStatus: true,
                    uom: {id: i, uomName: "Kilogram", uomShort: "Kg"}
                }
            )
        }
        dispatch(fetchInventorySuccess(dummyData));
    }
};

export const putInventoryRequest=()=>{
    return {
        type: invFxnTypes.PUT_INVENTORY_REQUEST,
    }
};

export const putInventorySuccess=data=>{
    return {
        type: invFxnTypes.PUT_INVENTORY_SUCCESS,
        payload: {
            inventoryData: data
        }
    }
};

export const putInventoryFailure=error=>{
    return {
        type: invFxnTypes.PUT_INVENTORY_FAILURE,
        payload:{
            error: error
        }
    }
};

export const putInventoryData=inventory=>{
    return dispatch=>{
        dispatch(putInventoryRequest());
        dispatch(putInventorySuccess(inventory));
    }
};



