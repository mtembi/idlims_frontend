import * as whFxnTypes from './WhFxnTypes';
import * as appConstants from '../../constant/';
import axios from 'axios';

export const showWhDialog = (show, type = appConstants.ADD_ITEM_CONSTANT) => {
    return {
        type: whFxnTypes.SHOW_WH_DIALOG,
        payload: {
            showDialog: show,
            dialogType: type
        }
    }
};

export const fetchWhDataRequest = () => {
    return {
        type: whFxnTypes.FETCH_WHS_REQUEST
    }
};

export const fetchWhDataSuccess = whdata => {
    return {
        type: whFxnTypes.FETCH_WHS_SUCCESS,
        payload: {
            whData: whdata,
        }
    }
};

export const fetchWhDataFailure = (err) => {
    return {
        type: whFxnTypes.FETCH_WHS_FAILURE,
        payload: {
            err
        }
    }
};

export const fetchWhData = () => {
    return async dispatch => {
        dispatch(fetchWhDataRequest());
        await axios.get(
            appConstants.API_URL + "/api/warehouse/",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res => dispatch(fetchWhDataSuccess(res.data)),
            error => dispatch(fetchWhDataFailure(error))
        );
    }
};

export const pushWhDataRequest = wh => {
    return {
        type: whFxnTypes.PUT_WHS_REQUEST,
        payload: {
            wh
        }
    }
};

export const pushWhDataSuccess = () => {
    return {
        type: whFxnTypes.FETCH_WHS_SUCCESS,
    }
};

export const pushWhDataFailure = error => {
    return {
        type: whFxnTypes.PUT_WHS_FAILURE,
        payload: {
            error
        }
    }
};
/**
 * Receives JSON data representing wh object
 * @param wh
 * @returns {Function}
 */
export const pushWhData = (wh) => {
    return async dispatch => {
        dispatch(pushWhDataRequest());
        await axios.post(
            appConstants.API_URL + "/api/warehouse/",
            wh,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res => dispatch(pushWhDataSuccess(res.data)),
            err => dispatch(pushWhDataFailure(err))
        )
    }
};

export const checkWhExistsRequest = () => {
    return {
        type: whFxnTypes.CHECK_WH_EXIST_REQUEST
    }
};
export const checkWhExistsSuccess = (exists) => {
    return {
        type: whFxnTypes.CHECK_WH_EXIST_SUCCESS,
        payload: {
            exists
        }
    }
};
export const checkWhExistsError = (error) => {
    return {
        type: whFxnTypes.CHECK_WH_EXIST_FAILURE,
        payload: {
            error
        }
    }
};
export const checkWhExists = whName => {
    return dispatch => {
        dispatch(checkWhExistsRequest());
        axios.post(
            appConstants.API_URL + "/api/warehouse/checkexist/",
            {whName: whName},
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res => dispatch(checkWhExistsSuccess(res.data)),
            error => dispatch(checkWhExistsError(error))
        )
    }
};





