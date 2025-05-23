import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectDataState = createFeatureSelector<CartState>('CartList');

export const selectData = createSelector(
    selectDataState,
    (state: CartState) => state.cartdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CartState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CartState) => state.error
);

