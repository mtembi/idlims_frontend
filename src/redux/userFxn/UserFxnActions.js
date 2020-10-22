import * as userFxnTypes from './UserFxnTypes';
import axios from 'axios';
import * as appConstants from '../../constant';

export const requestUserNotifications=()=>{
    return {
        type: userFxnTypes.FETCH_USER_NOTIFICATIONS_REQUEST
    }
};

export const fetchUserNotificationsSuccess=(notifications)=>{
    console.log("Fetch Notifs Success");
    return {
        type: userFxnTypes.FETCH_USER_NOTIFICATIONS_SUCCESS,
        payload: {
            notifications: notifications
        }
    }
};

export const fetchuserNotificationsFailed=error=>{
    return {
        type: userFxnTypes.FETCH_USER_NOTIFICATIONS_ERROR,
        payload: {
            error: error
        }
    }
};

export const fetchNotifications=()=>{
    console.log("Init fetch notifications");
    let dummyData=[
        "New Grn Created by Antony",
        "Delivery exhausted to JM Company",
        "Request for supply initiated by Safaricom"
    ];
    return (dispatch)=>{
        dispatch(requestUserNotifications());
        dispatch(fetchUserNotificationsSuccess(dummyData));
    }
};



export const userLoginRequest=()=>{
    return {
        type: userFxnTypes.USER_LOGIN_REQUEST
    }
};

export const userLoginSuccess=token=>{
    return {
        type: userFxnTypes.USER_LOGIN_SUCCESS,
        payload: {
            token:token
        }
    }
};

export const userLoginError=error=>{
    return {
        type: userFxnTypes.USER_LOGIN_ERROR,
        payload: {
            error
        }
    }
};

export const loginUser=(username, password)=>{

    return (dispatch)=>{
        dispatch(userLoginRequest());
        axios
            .post(
                appConstants.API_URL+"/api/authenticate",
                {
                    username: username,
                    password: password
                }
            )
            .then(
                response=>{
                    if(response.data){
                        dispatch(userLoginSuccess("Bearer "+response.data));
                    }

                },
                error=>{
                    console.error("login error", error);
                    dispatch(userLoginError(error));
                }
            )
    }
};