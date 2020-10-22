import * as invFxnTypes from './InvFxnTypes';
import * as appContants from '../../constant';
import axios from 'axios';

export const showInventoryDialog = (show, type = appContants.ADD_ITEM_CONSTANT) => {
    return {
        type: invFxnTypes.SHOW_INVENTORY_DIALOG,
        payload: {
            showInventoryDialog: show,
            inventoryDialogType: type
        }
    }
};

export const showStockCardDialog=(show)=>{
    return {
        type: invFxnTypes.SHOW_STOCKCARD_DIALOG,
        payload: {
            show
        }
    }
};

export const checkRefExistRequest=()=>{
    return {
        type: invFxnTypes.CHECK_HAS_REF_ERROR_REQUEST
    }
};

export const checkRefExistSuccess=data=>{
    return {
        type: invFxnTypes.CHECK_HAS_REF_ERROR_SUCCESS,
        payload: {
            data
        }
    }
};

export const checkRefExistFailure=error=>{
    return {
        type: invFxnTypes.CHECK_HAS_REF_ERROR_FAILURE,
        payload:{
            error
        }
    }
}

export const checkHasRefError=ref=>{
    return dispatch=>{
        dispatch(checkRefExistRequest());
        axios.post(
            appContants.API_URL + "/api/inventory/checkref/",
            {
                invRef: ref
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res => dispatch(checkRefExistSuccess(res.data)),
            err => dispatch(checkRefExistFailure(err))
        )
    }
};

export const setSelectedInventoryItem = (item) => {
    return {
        type: invFxnTypes.SET_SELECTED_INVENTORY_ITEM,
        payload: {
            selectedItem: item
        }
    }
};

export const fetchInventoryRequest = () => {
    return {
        type: invFxnTypes.FETCH_INVENTORY_REQUEST
    }
};

export const fetchInventorySuccess = inventories => {
    return {
        type: invFxnTypes.FETCH_INVENTORY_SUCCESS,
        payload: {
            inventoryDataList: inventories
        }
    }
};

export const fetchInventoryFailure = error => {
    return {
        type: invFxnTypes.FETCH_INVENTORY_FAILURE,
        payload: {
            error: error
        }
    }
};

export const fetchInventoryData = () => {
    return dispatch => {
        dispatch(fetchInventoryRequest());
        axios.get(
            appContants.API_URL + "/api/inventory/",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            })
            .then(
                res => dispatch(fetchInventorySuccess(res.data)),
                err => dispatch(fetchInventoryFailure(err))
            );
    }
};

export const fetchStockCardRequest = () => {
    return {
        type: invFxnTypes.FETCH_STOCKCARD_REQUEST
    }
};

export const fetchStockCardSuccess = data => {
    return {
        type: invFxnTypes.FETCH_STOCKCARD_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchStockCardFailure = error => {
    return {
        type: invFxnTypes.FETCH_STOCKCARD_FAILURE,
        payload: {
            error
        }
    }
}

export const fetchStockcard = item => {
    return dispatch => {
        dispatch(fetchStockCardRequest());
        axios.post(
            appContants.API_URL+"/api/stockcard/search/",
            {
                inventory:{id : item.id}
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res=>dispatch(fetchStockCardSuccess(res.data)),
            err=>dispatch(fetchStockCardFailure(err))
        )
    }
};

export const putInventoryRequest = () => {
    return {
        type: invFxnTypes.PUT_INVENTORY_REQUEST,
    }
};

export const putInventorySuccess = data => {
    return {
        type: invFxnTypes.PUT_INVENTORY_SUCCESS,
        payload: {
            inventoryData: data
        }
    }
};

export const putInventoryFailure = error => {
    return {
        type: invFxnTypes.PUT_INVENTORY_FAILURE,
        payload: {
            error: error
        }
    }
};

export const putInventoryData = (inventory) => {
    console.log(inventory);
    return dispatch => {
        dispatch(putInventoryRequest());
        axios
            .post(
                appContants.API_URL + "/api/inventory/newitem/",
                inventory,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Authorization": localStorage.getItem("user")
                    }
                }
            ).then(
            res => {
                console.log(res);
                dispatch(fetchInventoryData());
                dispatch(putInventorySuccess(res.data));
            },
            err => {
                console.log(err);
                dispatch(putInventoryFailure(err));
            }
        );
    }
};



