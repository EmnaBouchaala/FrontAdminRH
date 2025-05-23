import { Action, createReducer, on } from '@ngrx/store';
import { addJoblist, fetchJobApplyData, fetchJobApplyFail, fetchJobApplySuccess, fetchJobgridData, fetchJobgridFail, fetchJobgridSuccess, fetchJoblistData, fetchJoblistFail, fetchJoblistSuccess, updateJoblistSuccess } from './job.action';


export interface joblistState {
    joblist: any[];
    jobGrid: any[];
    JobApply: any[];
    loading: boolean;
    error: any;

}

export const initialState: joblistState = {
    joblist: [],
    jobGrid: [],
    JobApply: [],
    loading: false,
    error: null,
}


export const JoblistReducer = createReducer(
    initialState,
    on(fetchJoblistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchJoblistSuccess, (state, { joblist }) => {
        return { ...state, joblist, loading: false };
    }),
    on(fetchJoblistFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchJobgridData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchJobgridSuccess, (state, { jobGrid }) => {
        return { ...state, jobGrid, loading: false };
    }),
    on(fetchJobgridFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchJobApplyData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchJobApplySuccess, (state, { JobApply }) => {
        return { ...state, JobApply, loading: false };
    }),
    on(fetchJobApplyFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addJoblist, (state, { newData }) => {
        return { ...state, joblist: [newData, ...state.joblist], error: null };

    }),
    on(updateJoblistSuccess, (state, { updatedData }) => {
        return { ...state, joblist: state.joblist.map((joblist) => joblist.id === updatedData.id ? updatedData : joblist), error: null };
    }),

);

// Selector
export function reducer(state: joblistState | undefined, action: Action) {
    return JoblistReducer(state, action);
}
