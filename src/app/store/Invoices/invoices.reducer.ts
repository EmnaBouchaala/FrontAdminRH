import { Action, createReducer, on } from '@ngrx/store';
import { fetchInvoiceListData, fetchInvoiceListSuccess, fetchInvoiceListFail } from './invoice.action';


export interface InvoiceDataState {
    InvoiceData: any[];
    loading: boolean;
    error: any;

}

export const initialState: InvoiceDataState = {
    InvoiceData: [],
    loading: false,
    error: null,

};

export const InvoiceDataReducer = createReducer(
    initialState,
    on(fetchInvoiceListData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchInvoiceListSuccess, (state, { InvoiceData }) => {
        return { ...state, InvoiceData, loading: false };
    }),
    on(fetchInvoiceListFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
);

// Selector
export function reducer(state: InvoiceDataState | undefined, action: Action) {
    return InvoiceDataReducer(state, action);
}
