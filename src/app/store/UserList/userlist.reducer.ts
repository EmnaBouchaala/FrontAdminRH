import { Action, createReducer, on } from '@ngrx/store';
import { adduserlistSuccess, deleteuserlistSuccess, fetchuserlistData, fetchuserlistFail, fetchuserlistSuccess, updateuserlistSuccess } from './userlist.action';

export interface UserlistState {
    UserListdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: UserlistState = {
    UserListdata: [],
    loading: false,
    error: null,
};


export const UserListReducer = createReducer(
    initialState,
    on(fetchuserlistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchuserlistSuccess, (state, { UserListdata }) => {
        return { ...state, UserListdata, loading: false };
    }),
    on(fetchuserlistFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),


    on(adduserlistSuccess, (state, { newData }) => {
        return { ...state, UserListdata: [newData, ...state.UserListdata], error: null };

    }),

    on(updateuserlistSuccess, (state, { updatedData }) => {
        return { ...state, UserListdata: state.UserListdata.map((UserListdata) => UserListdata.id === updatedData.id ? updatedData : UserListdata), error: null };
    }),

    on(deleteuserlistSuccess, (state, { id }) => {
        return { ...state, UserListdata: state.UserListdata.filter((UserListdata) => UserListdata.id !== id), error: null }
    }),
);