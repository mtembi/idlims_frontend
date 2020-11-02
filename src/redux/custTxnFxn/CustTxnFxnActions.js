import * as custDelTypes from './CustTxnFxnTypes';
import * as appConsts from '../../constant';
import axios from 'axios';

export const showCustTxnDialog=(show, docType=appConsts.ADD_ITEM_CONSTANT)=>{
    return {
        type: custDelTypes.SHOW_CUST_TXN_DIALOG,
        payload: {
            show,
            docType
        }
    }
};

export const fetchCustDelRequest=()=>{
    return {
        type: custDelTypes.FETCH_CUST_DEL_REQUEST
    }
};

export const fetchCustDelSuccess=data=>{
    return {
        type: custDelTypes.FETCH_CUST_DEL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchCustDelFailure=error=>{
    return {
        type: custDelTypes.FETCH_CUST_DEL_FAILURE,
        payload: {
            error
        }
    }
};

export const fetchCustDeliveries=()=>{
    return async dispatch=>{
        dispatch(fetchCustDelRequest());
        await axios.get(
            appConsts.API_URL+"/api/custord/",
            appConsts.API_HEADERS,
        ).then(
            res=>dispatch(fetchCustDelSuccess(res.data)),
            error=>dispatch(fetchCustDelFailure(error))
        )
    }
};


export const fetchCustDelRqRequest=()=>{
    return {
        type: custDelTypes.FETCH_CUST_DEL_RQ_REQUEST
    }
};

export const fetchCustDelRqSuccess=data=>{
    return {
        type: custDelTypes.FETCH_CUST_DEL_RQ_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchCustDelRqFailure=error=>{
    return {
        type: custDelTypes.FETCH_CUST_DEL_RQ_FAILURE,
        payload: {
            error
        }
    }
};

export const fetchCustDeliveryRequest=()=>{
    return async dispatch=>{
        dispatch(fetchCustDelRqRequest());
        await axios.get(
            appConsts.API_URL+"/api/custordreq/",
            appConsts.API_HEADERS,
        ).then(
            res=>dispatch(fetchCustDelRqSuccess(res.data)),
            error=>dispatch(fetchCustDelRqFailure(error))
        )
    }
};


export const pushCustDelRequest=()=>{
    return {
        type: custDelTypes.PUSH_CUST_DEL_REQUEST
    }
};

export const pushCustDelSuccess=order=>{
    return {
        type: custDelTypes.PUSH_CUST_DEL_SUCCESS,
        payload: {
            order
        }
    }
};

export const pushCustDelFailure=err=>{
    return {
        type: custDelTypes.PUSH_CUST_DEL_FAILURE,
        payload: {
            error: err
        }
    }
};

export const pushCustDelivery=order=>{
    return async dispatch=>{
        dispatch(pushCustDelRequest());
        await axios.push(
            appConsts.API_URL+"/api/custord",
            order,
            appConsts.API_HEADERS
        ).then(
            res=>dispatch(pushCustDelSuccess(res.data)),
            err=>dispatch(pushCustDelFailure(err))
        )
    }
};


