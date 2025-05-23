import { Action, createReducer, on } from '@ngrx/store';
import { fetchprojectData, fetchprojectFail, fetchprojectSuccess } from './project.actions';


export interface projectState {
    projectdata: any[];
    loading: boolean;
    error: any;

}

export const initialState: projectState = {
    projectdata: [],
    loading: false,
    error: null,

};

export const projectReducer = createReducer(
    initialState,
    on(fetchprojectData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchprojectSuccess, (state, { projectdata }) => {
        return { ...state, projectdata, loading: false };
    }),
    on(fetchprojectFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),



);

// Selector
export function reducer(state: projectState | undefined, action: Action) {
    return projectReducer(state, action);
}
