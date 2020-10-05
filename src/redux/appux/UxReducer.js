import * as uxTypes from './UxTypes';

const initialState={
    userLoggedIn: "",
    showSideBar: false,
    showInventoryDialog: false
};

export const UxReducer=(state=initialState, action)=>{
    switch (action.type) {
        case uxTypes.SHOW_SIDE_BAR:
            return {
                ...state,
                showSideBar: !state.showSideBar
            };
        case uxTypes.USER_LOGGED_IN:
            return {
                ...state,
                userLoggedIn: state.userLoggedIn
            };
        default: return state;
    }
};