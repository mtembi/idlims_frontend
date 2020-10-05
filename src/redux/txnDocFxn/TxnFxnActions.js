import * as txnFxnTypes from './TxnFxnTypes';
import *as appContants from '../../constant';

export const showTxnDialog=(show, doc_type, type=appContants.ADD_ITEM_CONSTANT)=>{
    return {
        type: txnFxnTypes.SHOW_TXN_DOC_DIALOG,
        payload: {
            showDialog: show,
            dialogType: type,
            docType: doc_type
        }
    }
};

export const setSelectedDocumentItem=(item)=>{
    return {
        type: txnFxnTypes.SET_SELECTED_TXN_DOC_ITEM,
        payload:{
            selectedItem: item
        }
    }
};

export const fetchTxnDocRequest=()=>{
    return {
        type: txnFxnTypes.FETCH_TXN_DOC_REQUEST
    }
};

export const fetchTxnDocSuccess=docList=>{
    return {
        type: txnFxnTypes.FETCH_TXN_DOC_SUCCESS,
        payload: {
            list: docList
        }
    }
};

export const fetchTxnDocFailure=error=>{
    return {
        type: txnFxnTypes.FETCH_TXN_DOC_FAILURE,
        payload:{
            error: error
        }
    }
};

export const fetchTxnDocData=(doc_type)=>{
    return dispatch=>{
        dispatch(fetchTxnDocRequest());
        let dummyData=[];
        for (var i = 0; i < 40; i++) {
            let pt=i%4?1:2;
            dummyData.push(
                {
                    id: i,
                    doc_ref: doc_type+i,
                    partner:{

                    },
                    partner_address: "P.O. Box "+i+", NAIROBI",
                    doc_type: doc_type,
                    doc_status: "ACTIVE",
                    txn_date: new Date(),
                    create_date: new Date(),
                    partner_doc_ref: "doc ref",
                    docDetails: [

                    ]
                }
            )
        }

        dispatch(fetchTxnDocSuccess(dummyData.filter(part=>part.doc_type===doc_type)));
    }
};

export const putTxnDocRequest=()=>{
    return {
        type: txnFxnTypes.PUT_TXN_DOC_REQUEST,
    }
};

export const putTxnDocSuccess=data=>{
    return {
        type: txnFxnTypes.PUT_TXN_DOC_SUCCESS,
        payload: {
            data: data
        }
    }
};

export const putTxnDocFailure=error=>{
    return {
        type: txnFxnTypes.PUT_TXN_DOC_FAILURE,
        payload:{
            error: error
        }
    }
};

export const putTxnDocData=partner=>{
    return dispatch=>{
        dispatch(putTxnDocRequest());
        dispatch(putTxnDocSuccess(partner));
    }
};