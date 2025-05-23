import { Action, createReducer, on } from '@ngrx/store';
import { addCustomerlistSuccess, fetchCustomerData, fetchCustomerFail, fetchCustomerSuccess, updateCustomerlistSuccess } from './customer.action';


export interface CustomerState {
    customer: any[];
    loading: boolean;
    error: any;
}

export const initialState: CustomerState = {
    customer: [],
    loading: false,
    error: null,
};

export const CustomerReducer = createReducer(
    initialState,
    on(fetchCustomerData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchCustomerSuccess, (state, { customer }) => {
        return { ...state, customer, loading: false };
    }),
    on(fetchCustomerFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addCustomerlistSuccess, (state, { newData }) => {
        return { ...state, customer: [newData, ...state.customer], error: null };

    }),
    on(updateCustomerlistSuccess, (state, { updatedData }) => {
        return { ...state, customer: state.customer.map((customer) => customer.id === updatedData.id ? updatedData : customer), error: null };
    }),
);

// Selector
export function reducer(state: CustomerState | undefined, action: Action) {
    return CustomerReducer(state, action);
}
