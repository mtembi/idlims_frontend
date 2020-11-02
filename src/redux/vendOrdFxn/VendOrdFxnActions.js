import * as vndTypes from './VendOrdFxnTypes';
import * as appConsts from '../../constant';
import axios from 'axios';

export const showVendOrdDialog=(show, docType=appConsts.ADD_ITEM_CONSTANT)=>{
    return {
        type: vndTypes.SHOW_VEND_ORDER_DIALOG,
        payload: {
            show,
            docType
        }
    }
};

export const fetchVendOrdRequest=()=>{
    return {
        type: vndTypes.FETCH_VEND_ORDER_REQUEST
    }
};

export const fetchVendOrdSuccess=data=>{
    return {
        type: vndTypes.FETCH_VEND_ORDER_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchVendOrdFailure=error=>{
    return {
        type: vndTypes.FETCH_VEND_ORDER_FAILURE,
        payload: {
            error
        }
    }
};

export const fetchVendOrders=()=>{
    return async dispatch=>{
        dispatch(fetchVendOrdRequest)
        await axios.get(
            appConsts.API_URL+"/api/vendord/",
            appConsts.API_HEADERS,
        ).then(
            res=>dispatch(fetchVendOrdSuccess(res.data)),
            error=>dispatch(fetchVendOrdFailure(error))
        )
    }
};

export const fetchVendGrnRequest=()=>{
    return {
        type: vndTypes.FETCH_GRN_ORDER_REQUEST
    }
};

export const fetchVendGrnSuccess=data=>{
    return {
        type: vndTypes.FETCH_GRN_ORDER_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchVendGrnFailure=error=>{
    return {
        type: vndTypes.FETCH_GRN_ORDER_FAILURE,
        payload: {
            error
        }
    }
};

export const fetchVendGrn=()=>{
    return async dispatch=>{
        dispatch(fetchVendGrnRequest)
        await axios.get(
            appConsts.API_URL+"/api/vendgrn/",
            appConsts.API_HEADERS,
        ).then(
            res=>dispatch(fetchVendGrnSuccess(res.data)),
            error=>dispatch(fetchVendGrnFailure(error))
        )
    }
};

export const pushVendOrdRequest=()=>{
    return {
        type: vndTypes.PUSH_VEND_ORDER_REQUEST
    }
};

export const pushVendOrdSuccess=order=>{
    return {
        type: vndTypes.PUSH_VEND_ORDER_SUCCESS,
        payload: {
            order
        }
    }
};

export const pushVendOrdFailure=err=>{
    return {
        type: vndTypes.PUSH_VEND_ORDER_FAILURE,
        payload: {
            error: err
        }
    }
};

export const pushVendOrder=order=>{
    return async dispatch=>{
        dispatch(pushVendOrdRequest());
        await axios.push(
            appConsts.API_URL,
            order,
            appConsts.API_HEADERS
        ).then(
            res=>dispatch(pushVendOrdSuccess(res.data)),
            err=>dispatch(pushVendOrdFailure(err))
        )
    }
};


export const updateVendOrdRequest=()=>{
    return {
        type: vndTypes.UPDATE_VEND_ORDER_REQUEST
    }
};

export const updateVendOrdSucess=order=>{
    return {
        type: vndTypes.UPDATE_VEND_ORDER_SUCCESS,
        payload: {
            order
        }
    }
};

export const updateVendOrdFailure=error=>{
    return {
        type: vndTypes.UPDATE_VEND_ORDER_FAILURE,
        payload: {
            error
        }
    }
};

export const updateVendOrder=order=>{
    return async dispatch=>{
        dispatch(updateVendOrdRequest());
        await axios.put(
            appConsts.API_URL,
            order,
            appConsts.API_HEADERS
        ).then(
            res=>dispatch(updateVendOrdSucess(res.data)),
            err=>dispatch(updateVendOrdFailure(err))
        )
    }
};
