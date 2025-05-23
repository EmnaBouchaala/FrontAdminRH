import { Action, createReducer, on } from '@ngrx/store';
import { fetchEcoorderDataData, fetchEcoorderDataSuccess, fetchEcoorderDataFail, addEcoOrdersSuccess, deleteEcoOrdersSuccess, updateEcoOrdersSuccess } from './order.actions';


export interface EcoOrderState {
    orderDatas: any[];
    loading: boolean;
    error: any;
}

export const initialState: EcoOrderState = {
    orderDatas: [],
    loading: false,
    error: null,
};

export const OrderReducer = createReducer(
    initialState,
    on(fetchEcoorderDataData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchEcoorderDataSuccess, (state, { orderDatas }) => {
        return { ...state, orderDatas, loading: false };
    }),
    on(fetchEcoorderDataFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addEcoOrdersSuccess, (state, { newData }) => {
        return { ...state, orderDatas: [newData, ...state.orderDatas], error: null };
    }),
    on(updateEcoOrdersSuccess, (state, { updatedData }) => {
        return { ...state, orderDatas: state.orderDatas.map((orderDatas) => orderDatas.id === updatedData.id ? updatedData : orderDatas), error: null };
    }),
    on(deleteEcoOrdersSuccess, (state, { ids }) => {
        const updatedTable = state.orderDatas.filter(
            (orderDatas) => !ids.includes(orderDatas.id)
        );
        return { ...state, orderDatas: updatedTable, error: null };
    })
);

// Selector
export function reducer(state: EcoOrderState | undefined, action: Action) {
    return OrderReducer(state, action);
}
