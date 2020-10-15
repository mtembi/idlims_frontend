import * as uxTypes from './UxTypes';
import {produce} from "immer";

const initialState={
    showSideBar: false,
};

export const UxReducer=(state=initialState, action)=>{
    switch (action.type) {
        case uxTypes.SHOW_SIDE_BAR:
            return produce(state, (draft)=>{
                draft.showSideBar = action.payload.isShown
            });
        default: return state;
    }
};