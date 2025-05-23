import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderdataState } from './crypto.reducer';

export const selectDataState = createFeatureSelector<OrderdataState>('Order');

export const selectData = createSelector(
    selectDataState,
    (state: OrderdataState) => state.orders
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: OrderdataState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: OrderdataState) => state.error
);

