import { createAction, props } from '@ngrx/store';
import { Orders } from './crypto.model';

// fetch 
export const fetchorderData = createAction('[Data] fetch orderData');
export const fetchorderSuccess = createAction('[Data] fetch orderData success', props<{ orders: Orders[] }>())
export const fetchorderFail = createAction('[Data fetch orderData failed]', props<{ error: string }>())
