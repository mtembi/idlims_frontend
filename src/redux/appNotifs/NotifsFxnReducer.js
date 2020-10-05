import * as notFxnTypes from './NotifsFxnTypes';

const defaultState = {
    notifications: [],
};

export const NotificationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case notFxnTypes.ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case notFxnTypes.CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? {...notification, dismissed: true}
                        : {...notification}
                )),
            };

        case notFxnTypes.REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.key !== action.key,),
            };

        default:
            return state;
    }
};