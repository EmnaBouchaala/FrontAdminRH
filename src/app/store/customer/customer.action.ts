import { createAction, props } from '@ngrx/store';
import { CustomersModel } from './customer.model';

// fetch 
export const fetchCustomerData = createAction('[Data] fetch Customer');
export const fetchCustomerSuccess = createAction('[Data] fetch Customer success', props<{ customer: CustomersModel[] }>())
export const fetchCustomerFail = createAction('[Data fetch Customer failed]', props<{ error: string }>())

// Add Data
export const addCustomerlist = createAction(
    '[Data] Add Customerlist',
    props<{ newData: CustomersModel }>()
);
export const addCustomerlistSuccess = createAction(
    '[Data] Add Customerlist Success',
    props<{ newData: CustomersModel }>()
);
export const addCustomerlistFailure = createAction(
    '[Data] Add Customerlist Failure',
    props<{ error: string }>()
);


// Update Data
export const updateCustomerlist = createAction(
    '[Data] Update Customerlist',
    props<{ updatedData: CustomersModel }>()
);
export const updateCustomerlistSuccess = createAction(
    '[Data] Update Customerlist Success',
    props<{ updatedData: CustomersModel }>()
);
export const updateCustomerlistFailure = createAction(
    '[Data] Update Customerlist Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteCustomerlist = createAction(
    '[Data] Delete Customerlist',
    props<{ id: string }>()
);
export const deleteCustomerlistSuccess = createAction(
    '[Data] Delete Customerlist Success',
    props<{ id: string }>()
);
export const deleteCustomerlistFailure = createAction(
    '[Data] Delete Customerlist Failure',
    props<{ error: string }>()
);