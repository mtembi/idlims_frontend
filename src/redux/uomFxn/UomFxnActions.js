import * as uomFxnTypes from './UomFxnTypes';
import * as appConstants from '../../constant';
import axios from 'axios';

export const showUomDialog=(show, type="add")=>{
    return {
        type: uomFxnTypes.SHOW_UOM_DIALOG,
        payload: {
            showUomDialog: show,
            uomDialogType: type
        }
    }
};

export const setSelectedUomItem=(item)=>{
    return {
        type: uomFxnTypes.SET_SELECTED_UOM_ITEM,
        payload:{
            selectedItem: item
        }
    }
};

export const fetchUomRequest=()=>{
    return {
        type: uomFxnTypes.FETCH_UOM_REQUEST
    }
};

export const fetchUomSuccess=uomList=>{
    return {
        type: uomFxnTypes.FETCH_UOM_SUCCESS,
        payload: {
            uomDataList: uomList
        }
    }
};

export const fetchUomFailure=error=>{
    return {
        type: uomFxnTypes.FETCH_UOM_FAILURE,
        payload:{
            error: error
        }
    }
};

export const fetchUomData=()=>{
    return dispatch=>{
        dispatch(fetchUomRequest());
        axios.get(
            appConstants.API_URL+"/api/uom/",
            {
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res=>{
                console.log("Uom fetch", res);
                dispatch(fetchUomSuccess(res.data));
            },
            err=>{
                console.log("Uom fetch", err);
                dispatch(fetchUomFailure(err));
            }
        );

    }
};

export const putUomRequest=()=>{
    return {
        type: uomFxnTypes.PUT_UOM_REQUEST
    }
};

export const putUomSuccess=uom=>{
    return {
        type: uomFxnTypes.PUT_UOM_SUCCESS,
        payload: {
            uomData: uom
        }
    }
};

export const putUomFailure=error=>{
    return {
        type: uomFxnTypes.PUT_UOM_FAILURE,
        payload:{
            error
        }
    }
};

export const putUomData=(uom)=>{
    return dispatch=>{
        dispatch(putUomRequest());
        axios.post(
            appConstants.API_URL+"/api/uom/",
            uom,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res=>{dispatch(putUomSuccess(res.data)); dispatch(fetchUomData())},
            err=>dispatch(putUomFailure(err))
        );
    }
};



