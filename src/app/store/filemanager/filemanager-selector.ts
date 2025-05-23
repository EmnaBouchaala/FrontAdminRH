import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilemanagerState } from './filemanager.reducer';

export const selectDataState = createFeatureSelector<FilemanagerState>('Filelist');

export const selectData = createSelector(
    selectDataState,
    (state: FilemanagerState) => state.recentFiles
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: FilemanagerState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: FilemanagerState) => state.error
);

