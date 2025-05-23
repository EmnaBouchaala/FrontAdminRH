import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tasklistState } from './tasks.reducer';

export const selectDataState = createFeatureSelector<tasklistState>('Tasklist');

export const selectData = createSelector(
    selectDataState,
    (state: tasklistState) => state.tasklist
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: tasklistState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: tasklistState) => state.error
);

