import * as userFxnTypes from './UserFxnTypes';

const initialState={
    notificationsLoading: false,
    notificationsError:"",
    notificationsList:[]
};

export const UserFxnReducer=(state=initialState, action)=>{
    switch (action.type) {
        case userFxnTypes.FETCH_USER_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                notificationsLoading: true,
                notificationsError: "",
                notificationsList: []
            };
        case userFxnTypes.FETCH_USER_NOTIFICATIONS_SUCCESS: {
            console.log(action)
            return {
                ...state,
                notificationsLoading: false,
                notificationsError: "",
                notificationsList: action.payload.notifications
            };
        }
        case userFxnTypes.FETCH_USER_NOTIFICATIONS_ERROR:{
            console.log(action);
            return {
                ...state,
                notificationsLoading: false,
                notificationsError: action.payload.error,
                notificationsList: []
            }
        }
        default: return state;
    }
};