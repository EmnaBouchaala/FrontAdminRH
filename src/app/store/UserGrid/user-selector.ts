import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectDataState = createFeatureSelector<UserState>('usergrid');

export const selectData = createSelector(
    selectDataState,
    (state: UserState) => state.UserGriddata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: UserState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: UserState) => state.error
);

