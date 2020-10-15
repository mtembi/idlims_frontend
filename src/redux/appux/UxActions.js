import * as uxTypes from './UxTypes';

export const sideBarToggled=isShown=>{
    return {
        type: uxTypes.SHOW_SIDE_BAR,
        payload:{
            isShown
        }
    }
};

