import { Action, createReducer, on } from '@ngrx/store';
import { fetchCartData, fetchCartFail, fetchCartSuccess } from './cart.action';


export interface CartState {
    cartdata: any[];
    loading: boolean;
    error: any;

}

export const initialState: CartState = {
    cartdata: [],
    loading: false,
    error: null,

};

export const CartReducer = createReducer(
    initialState,
    on(fetchCartData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchCartSuccess, (state, { cartdata }) => {
        return { ...state, cartdata, loading: false };
    }),
    on(fetchCartFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),



);

// Selector
export function reducer(state: CartState | undefined, action: Action) {
    return CartReducer(state, action);
}
