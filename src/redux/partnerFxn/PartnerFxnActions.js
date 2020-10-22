import * as custFxnTypes from './PartnerFxnTypes';
import * as appContants from '../../constant';
import axios from 'axios';

export const showPartnerDialog = (show, partner_type = appContants.CUSTOMER_TYPE, type = appContants.ADD_ITEM_CONSTANT) => {
    return {
        type: custFxnTypes.SHOW_PARTNER_DIALOG,
        payload: {
            showDialog: show,
            dialogType: type,
            partnerType: partner_type
        }
    }
};

export const setSelectedPartnerItem = (item) => {
    return {
        type: custFxnTypes.SET_SELECTED_PARTNER_ITEM,
        payload: {
            selectedItem: item
        }
    }
};

export const fetchPartnerRequest = () => {
    return {
        type: custFxnTypes.FETCH_PARTNER_REQUEST
    }
};

export const fetchPartnerSuccess = partnerList => {
    return {
        type: custFxnTypes.FETCH_PARTNER_SUCCESS,
        payload: {
            list: partnerList
        }
    }
};

export const fetchPartnerFailure = error => {
    return {
        type: custFxnTypes.FETCH_PARTNER_FAILURE,
        payload: {
            error: error
        }
    }
};

export const fetchPartnerData = (type) => {
    let api=appContants.API_URL;
    console.log("Requested partner type",type);
    if(type===appContants.CUSTOMER_TYPE){
        api=api+"/api/customer/";
    }else if(type===appContants.SUPPLER_TYPE) {
        api=api+"/api/supplier/";
    }
    console.log("Api target:", api);

    const request=axios.get(
        api,
        {
            headers: {
                "Authorization": localStorage.getItem('user'),
                "Access-Control-Allow-Origin":"*"
            }
        }
    );

    return (dispatch)=>{
        dispatch(fetchPartnerRequest());
        request.then(
            success=>dispatch(fetchPartnerSuccess(success.data)),
            error=>dispatch(fetchPartnerFailure(error))
        )
    }
};

export const putPartnerRequest = () => {
    return {
        type: custFxnTypes.PUT_PARTNER_REQUEST,
    }
};

export const putPartnerSuccess = data => {
    return {
        type: custFxnTypes.PUT_PARTNER_SUCCESS,
        payload: {
            data: data
        }
    }
};

export const putPartnerFailure = error => {
    return {
        type: custFxnTypes.PUT_PARTNER_FAILURE,
        payload: {
            error: error
        }
    }
};

export const putPartnerData = (partner, partnerType) => {
    let api=appContants.API_URL+(partnerType===appContants.CUSTOMER_TYPE?"/api/customer/":"/api/supplier/");
    return dispatch => {
        dispatch(putPartnerRequest());
        axios
            .post(
                api,
                partner,
                {
                    headers: {
                        "Authorization": localStorage.getItem('user').replace(/"/g, ''),
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            .then(response => {
                    console.log(response);
                    dispatch(putPartnerSuccess(response.data));
                },
                error => {
                    console.log(error);
                    dispatch(putPartnerFailure(error));
                });



    }
};

export const checkPartnerRefExistRequest=()=>{
    return {
        type: custFxnTypes.CHECK_PARTNER_REF_EXIST_REQUEST
    }
};
export const checkPartnerRefExistSuccess=isExist=>{
    return {
        type: custFxnTypes.CHECK_PARTNER_REF_EXIST_SUCCESS,
        payload: {
            isExist: isExist
        }
    }
};
export const checkPartnerRefExistError=error=>{
    return {
        type: custFxnTypes.CHECK_PARTNER_REF_EXIST_SUCCESS,
        payload: {
            error
        }
    }
};

export const checkPartnerNotExist=(partnerRef, partnerType)=>{
    const api=appContants.API_URL+(
        partnerType===appContants.CUSTOMER_TYPE ? "/api/customer/checkRefExist/" : "/api/supplier/checkRefExist");
    return dispatch=>{
        dispatch(checkPartnerRefExistRequest());
        axios.post(
            api,
            {
                partnerRef: partnerRef,
                partnerType: partnerType
            },
            {
                headers: {
                    "Authorization": localStorage.getItem('user'),
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).then(
            response=>dispatch(checkPartnerRefExistSuccess(response.data)),
            error=>{dispatch(checkPartnerRefExistError(error))}
        )
    }
};
