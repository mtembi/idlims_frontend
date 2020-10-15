import * as notFxnTypes from './NotifsFxnTypes';

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: notFxnTypes.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: notFxnTypes.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: notFxnTypes.REMOVE_SNACKBAR,
    key,
});

export const showNotification=(message, variant)=>{
    let note={
        message: message,
        options:{
            key: new Date().getTime()+Math.random(),
            variant: variant,
            autoHideDuration: 5000
        }
    };
    return dispatch =>{
        dispatch(enqueueSnackbar(note))
    }
};