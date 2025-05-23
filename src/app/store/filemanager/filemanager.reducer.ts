import { Action, createReducer, on } from '@ngrx/store';
import { fetchRecentFilesData, fetchRecentFilesFail, fetchRecentFilesSuccess } from './filemanager.actions';


export interface FilemanagerState {
    recentFiles: any[];
    loading: boolean;
    error: any;
}

export const initialState: FilemanagerState = {
    recentFiles: [],
    loading: false,
    error: null,
};

export const FilemanageReducer = createReducer(
    initialState,
    on(fetchRecentFilesData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchRecentFilesSuccess, (state, { recentFiles }) => {
        return { ...state, recentFiles, loading: false };
    }),
    on(fetchRecentFilesFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
);

// Selector
export function reducer(state: FilemanagerState | undefined, action: Action) {
    return FilemanageReducer(state, action);
}
