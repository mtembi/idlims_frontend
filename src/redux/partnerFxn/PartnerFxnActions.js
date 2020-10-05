import * as custFxnTypes from './PartnerFxnTypes';
import *as appContants from '../../constant';

export const showPartnerDialog=(show, partner_type=appContants.CUSTOMER_TYPE, type=appContants.ADD_ITEM_CONSTANT)=>{
    return {
        type: custFxnTypes.SHOW_PARTNER_DIALOG,
        payload: {
            showDialog: show,
            dialogType: type,
            partnerType: partner_type
        }
    }
};

export const setSelectedPartnerItem=(item)=>{
    return {
        type: custFxnTypes.SET_SELECTED_PARTNER_ITEM,
        payload:{
            selectedItem: item
        }
    }
};

export const fetchPartnerRequest=()=>{
    return {
        type: custFxnTypes.FETCH_PARTNER_REQUEST
    }
};

export const fetchPartnerSuccess=partnerList=>{
    return {
        type: custFxnTypes.FETCH_PARTNER_SUCCESS,
        payload: {
            list: partnerList
        }
    }
};

export const fetchPartnerFailure=error=>{
    return {
        type: custFxnTypes.FETCH_PARTNER_FAILURE,
        payload:{
            error: error
        }
    }
};

export const fetchPartnerData=(type)=>{
    return dispatch=>{
        dispatch(fetchPartnerRequest());
        let dummyData=[];
        for (var i = 0; i < 40; i++) {
            let pt=i%4?1:2;
            dummyData.push(
                {
                    id: i,
                    partner_address: "P.O. Box "+Math.round(Math.random()*100)+" Nairobi",
                    partner_name: (pt===1?"Customer":"Supplier")+i,
                    partner_ref: (pt===1?"CS":"SP")+i,
                    partner_email: (pt===1?"cust":"supp")+"email"+i+"@"+(pt===1?"cust":"supp")+"server"+i+".com",
                    partner_tel: Math.round(Math.random()*1000000),
                    partner_type: (pt===1?appContants.CUSTOMER_TYPE:appContants.SUPPLER_TYPE),
                    create_date: [2019, 10, 10],
                    active_status: true,

                }
            )
        }

        dispatch(fetchPartnerSuccess(dummyData.filter(part=>part.partner_type===type)));
    }
};

export const putPartnerRequest=()=>{
    return {
        type: custFxnTypes.PUT_PARTNER_REQUEST,
    }
};

export const putPartnerSuccess=data=>{
    return {
        type: custFxnTypes.PUT_PARTNER_SUCCESS,
        payload: {
            data: data
        }
    }
};

export const putPartnerFailure=error=>{
    return {
        type: custFxnTypes.PUT_PARTNER_FAILURE,
        payload:{
            error: error
        }
    }
};

export const putPartnerData=partner=>{
    return dispatch=>{
        dispatch(putPartnerRequest());
        dispatch(putPartnerSuccess(partner));
    }
};