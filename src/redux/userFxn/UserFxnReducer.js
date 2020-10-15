import * as userFxnTypes from './UserFxnTypes';

const initialState={
    notificationsLoading: false,
    notificationsError:"",
    notificationsList:[],
    isLoggingIn: false,
    isLoggedIn: localStorage.getItem('user')?true:false,
    loginToken: localStorage.getItem('user') || '',
    loginError:''
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

        case userFxnTypes.USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                isLoggedIn: false,
                loginToken: '',
                loginError: ''
            };
        case userFxnTypes.USER_LOGIN_SUCCESS:
            localStorage.setItem("user", action.payload.token);
            return {
                ...state,
                isLoggingIn: false,
                loginToken: action.payload.token,
                isLoggedIn: true,
                loginError: ''
            }
        ;
        case userFxnTypes.USER_LOGIN_ERROR:{
            localStorage.removeItem("user");
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                loginError: action.payload.error,
                loginToken: ''
            }
        }
        default: return state;
    }
};