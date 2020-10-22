import * as invGrpActions from './InvGrpFxnTypes';
import * as appConstants from '../../constant';
import {produce} from "immer";

const initialState={
    showDialog: false,
    selectedInvGroup: null,
    invGroupList: [],
    invGroupListLoading: false,
    invGroupListError: '',

    putInvGrpLoading: false,
    putInvGrpError: ''
};

export const InvGrpReducer=(state=initialState, action)=>{
    switch(action.type){
        case invGrpActions.SHOW_INV_GROUP_DIALOG:
            return produce(state, (draft)=>{
                draft.showDialog=action.payload.isShown
            });
        case invGrpActions.FETCH_INV_GROUP_REQUEST:
            return produce(state, (draft)=>{
                draft.invGroupListLoading = true
            });
        case invGrpActions.FETCH_INV_GROUP_SUCCESS:
            return produce(state, (draft)=>{
                draft.invGroupListLoading=false;
                draft.invGroupListError="";
                draft.invGroupList=action.payload.data;
            });
        case invGrpActions.FETCH_INV_GROUP_FAILURE:
            return produce(state, (draft)=>{
                draft.invGroupListLoading=false;
                draft.invGroupListError=action.payload.error;
                draft.invGroupList=[];
            });
        case invGrpActions.PUSH_INV_GROUP_REQUEST:
            return produce(state, (draft)=>{
                draft.putInvGrpLoading=true
            });
        case invGrpActions.PUSH_INV_GROUP_SUCCESS:
            return produce(state, (draft)=>{
                draft.putInventoryLoading=false;
                draft.putInvGrpError='';
            });
        case invGrpActions.PUSH_INV_GROUP_FAILURE:
            return produce(state, (draft)=>{
                draft.putInventoryLoading=false;
                draft.putInvGrpError=action.payload.error;
            });
        default: return state;
    }
};
