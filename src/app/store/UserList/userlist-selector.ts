import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserlistState } from './userlist.reducer';

export const selectDataState = createFeatureSelector<UserlistState>('userList');

export const selectData = createSelector(
    selectDataState,
    (state: UserlistState) => state.UserListdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: UserlistState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: UserlistState) => state.error
);

