import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MailState } from './email.reducer';

export const selectDataState = createFeatureSelector<MailState>('Maillist');

export const selectData = createSelector(
    selectDataState,
    (state: MailState) => state.maildata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: MailState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: MailState) => state.error
);

