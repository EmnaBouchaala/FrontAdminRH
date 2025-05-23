import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CandidateState } from './candidate.reducer';

export const selectDataState = createFeatureSelector<CandidateState>('CandidateList');

export const selectData = createSelector(
    selectDataState,
    (state: CandidateState) => state.candidateList
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CandidateState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CandidateState) => state.error
);

