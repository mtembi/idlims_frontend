import * as invGrpActions from './InvGrpFxnTypes';
import axios from 'axios';
import * as appConstants from '../../constant';


export const showInvGroupDialog=isShown=>{
    return {
        type: invGrpActions.SHOW_INV_GROUP_DIALOG,
        payload: {
            isShown
        }
    }
};

export const fetchInvGroupRequest=()=>{
    return {
        type: invGrpActions.FETCH_INV_GROUP_REQUEST
    }
};

export const fetchInvGroupSuccess=data=>{
    return {
        type: invGrpActions.FETCH_INV_GROUP_SUCCESS,
        payload:{
            data
        }
    }
};

export const fetchInvGroupError=error=>{
    return {
        type: invGrpActions.FETCH_INV_GROUP_FAILURE,
        payload: {
            error
        }
    }
};

export const fetchInvGroup=()=>{
    return dispatch=>{
        dispatch(fetchInvGroupRequest());
        axios.get(
            appConstants.API_URL+"/api/invgroup/",
            {
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res=>{
                console.log(res);
                dispatch(fetchInvGroupSuccess(res.data));
            },
            err=>dispatch(fetchInvGroupError(err))
        )
    }
};

export const pushInvGroupRequest=()=>{
    return {
        type: invGrpActions.PUSH_INV_GROUP_REQUEST
    }
};

export const pushInvGroupSuccess=(data)=>{
    return {
        type: invGrpActions.PUSH_INV_GROUP_SUCCESS,
        payload: {
            data
        }
    }
};

export const pushInvGroupError=error=>{
    return {
        type: invGrpActions.PUSH_INV_GROUP_FAILURE,
        payload: {
            error
        }
    }
};

export const pushInvGroup=invGroup=>{
    return dispatch=>{
        dispatch(pushInvGroupRequest());
        axios.put(
            appConstants.API_URL+"/api/invgroup/",
            invGroup,
            {
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": localStorage.getItem("user")
                }
            }
        ).then(
            res=>dispatch(pushInvGroupSuccess(res.data)),
            err=>dispatch(pushInvGroupError(err))
        )
    }
};