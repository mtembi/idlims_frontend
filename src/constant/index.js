//export const API_URL="https://idlims-be.herokuapp.com";
export const API_URL="http://localhost:5000";
export const API_HEADERS={
    headers:{
        "Authorization": localStorage.getItem('user'),
        'Access-Control-Allow-Origin': '*',
    }
};

export const ADD_ITEM_CONSTANT="Add";
export const EDIT_ITEM_CONSTANT="Edit";

export const CUSTOMER_TYPE="CUSTOMER";
export const SUPPLER_TYPE="SUPPLIER";

export const DOC_GRN="Goods Receipt Note";
export const DOC_DEL_ORDER="Delivery Order";
export const DOC_PICK_LIST="Pick List";


export const DOC_STATUS_ACTIVE="ACTIVE";
export const DOC_STATUS_CLOSED="CLOSED";
export const DOC_STATUS_VOIDED="VOIDED";