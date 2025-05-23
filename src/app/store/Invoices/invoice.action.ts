import { createAction, props } from '@ngrx/store';
import { InvoiceList } from './invoices.model';

// fetch 
export const fetchInvoiceListData = createAction('[Data] fetch InvoiceList');
export const fetchInvoiceListSuccess = createAction('[Data] fetch InvoiceList success', props<{ InvoiceData: InvoiceList[] }>())
export const fetchInvoiceListFail = createAction('[Data fetch InvoiceList failed]', props<{ error: string }>())
