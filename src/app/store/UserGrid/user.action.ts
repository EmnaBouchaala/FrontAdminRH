import { createAction, props } from '@ngrx/store';
import { Usergrid } from './user.model';

// fetch 
export const fetchuserGridData = createAction('[Data] fetch userGrid');
export const fetchuserGridSuccess = createAction('[Data] fetch userGrid success', props<{ UserGriddata: Usergrid[] }>())
export const fetchuserGridFail = createAction('[Data fetch userGrid failed]', props<{ error: string }>())
