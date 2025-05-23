import { Action, createReducer, on } from '@ngrx/store';
import { fetchorderData, fetchorderFail, fetchorderSuccess } from './crypto.actions';


export interface OrderdataState {
    orders: any[];
    loading: boolean;
    error: any;
}

export const initialState: OrderdataState = {
    orders: [],
    loading: false,
    error: null,
};

export const OrdersReducer = createReducer(
    initialState,
    on(fetchorderData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchorderSuccess, (state, { orders }) => {
        return { ...state, orders, loading: false };
    }),
    on(fetchorderFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
);

// Selector
export function reducer(state: OrderdataState | undefined, action: Action) {
    return OrdersReducer(state, action);
}
