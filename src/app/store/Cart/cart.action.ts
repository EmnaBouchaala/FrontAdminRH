import { createAction, props } from '@ngrx/store';
import { Cart } from './cart.model';

// fetch 
export const fetchCartData = createAction('[Data] fetch Cart');
export const fetchCartSuccess = createAction('[Data] fetch Cart success', props<{ cartdata: Cart[] }>())
export const fetchCartFail = createAction('[Data fetch Cart failed]', props<{ error: string }>())
