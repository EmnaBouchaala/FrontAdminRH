import { Action, createReducer, on } from '@ngrx/store';
import { addtasklistSuccess, fetchtasklistData, fetchtasklistFail, fetchtasklistSuccess, updatetasklist, updatetasklistSuccess } from './tasks.action';

export interface tasklistState {
    tasklist: any[];
    loading: boolean;
    error: any;
}

export const initialState: tasklistState = {
    tasklist: [],
    loading: false,
    error: null,
};

export const tasklistReducer = createReducer(
    initialState,
    on(fetchtasklistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchtasklistSuccess, (state, { tasklist }) => {
        return { ...state, tasklist, loading: false };
    }),
    on(fetchtasklistFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addtasklistSuccess, (state, { newData }) => {
        return { ...state, tasklist: [newData, ...state.tasklist], error: null };

    }),
    on(updatetasklistSuccess, (state, { updatedData }) => {
        return { ...state, tasklist: state.tasklist.map((tasklist) => tasklist.id === updatedData.id ? updatedData : tasklist), error: null };
    }),



);