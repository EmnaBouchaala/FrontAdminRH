import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceDataState } from './invoices.reducer';

export const selectDataState = createFeatureSelector<InvoiceDataState>('InvoiceList');

export const selectData = createSelector(
    selectDataState,
    (state: InvoiceDataState) => state.InvoiceData
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: InvoiceDataState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: InvoiceDataState) => state.error
);

