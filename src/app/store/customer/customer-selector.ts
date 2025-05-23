import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectDataState = createFeatureSelector<CustomerState>('Customer');

export const selectData = createSelector(
    selectDataState,
    (state: CustomerState) => state.customer
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CustomerState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CustomerState) => state.error
);

