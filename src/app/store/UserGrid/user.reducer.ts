import { Action, createReducer, on } from '@ngrx/store';
import { fetchuserGridData, fetchuserGridFail, fetchuserGridSuccess } from './user.action';

export interface UserState {
    UserGriddata: any[];
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    UserGriddata: [],
    loading: false,
    error: null,
};


export const UserReducer = createReducer(
    initialState,
    on(fetchuserGridData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchuserGridSuccess, (state, { UserGriddata }) => {
        return { ...state, UserGriddata, loading: false };
    }),
    on(fetchuserGridFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
);