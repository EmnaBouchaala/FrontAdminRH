import { createFeatureSelector, createSelector } from '@ngrx/store';
import { joblistState } from './job.reducer';

export const selectDataState = createFeatureSelector<joblistState>('Joblist');

export const selectData = createSelector(
    selectDataState,
    (state: joblistState) => state.joblist
);

export const selecDatagrid = createSelector(
    selectDataState,
    (state: joblistState) => state.jobGrid
);

export const selecDatapply = createSelector(
    selectDataState,
    (state: joblistState) => state.JobApply
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: joblistState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: joblistState) => state.error
);

