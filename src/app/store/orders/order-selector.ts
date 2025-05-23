import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EcoOrderState } from './order.reducer';

export const selectDataState = createFeatureSelector<EcoOrderState>('EcoOrderList');

export const selectData = createSelector(
    selectDataState,
    (state: EcoOrderState) => state.orderDatas
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: EcoOrderState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: EcoOrderState) => state.error
);

