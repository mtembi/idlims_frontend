import * as userFxnTypes from './UserFxnTypes';

export const requestUserNotifications=notifications=>{
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