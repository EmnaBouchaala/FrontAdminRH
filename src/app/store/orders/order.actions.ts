import { createAction, props } from '@ngrx/store';
import { OrdersModel } from './order.model';

// fetch 
export const fetchEcoorderDataData = createAction('[Data] fetch orderDatas');
export const fetchEcoorderDataSuccess = createAction('[Data] fetch orderDatas success', props<{ orderDatas: OrdersModel[] }>())
export const fetchEcoorderDataFail = createAction('[Data fetch orderDatas failed]', props<{ error: string }>())

// Add Data
export const addEcoOrders = createAction(
    '[Data] Add Orders',
    props<{ newData: OrdersModel }>()
);
export const addEcoOrdersSuccess = createAction(
    '[Data] Add Orders Success',
    props<{ newData: OrdersModel }>()
);
export const addEcoOrdersFailure = createAction(
    '[Data] Add Orders Failure',
    props<{ error: string }>()
);

// Update Data
export const updateEcoOrders = createAction(
    '[Data] Update Orders',
    props<{ updatedData: OrdersModel }>()
);
export const updateEcoOrdersSuccess = createAction(
    '[Data] Update Orders Success',
    props<{ updatedData: OrdersModel }>()
);
export const updateEcoOrdersFailure = createAction(
    '[Data] Update Orders Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteEcoOrders = createAction(
    '[Data] Delete Orders',
    props<{ ids: string }>()
);
export const deleteEcoOrdersSuccess = createAction(
    '[Data] Delete Orders Success',
    props<{ ids: string }>()
);
export const deleteEcoOrdersFailure = createAction(
    '[Data] Delete Orders Failure',
    props<{ error: string }>()
);