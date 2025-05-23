import { createAction, props } from '@ngrx/store';
import { Email } from './email.model';

// fetch 
export const fetchmailData = createAction('[Data] fetch mail');
export const fetchmailSuccess = createAction('[Data] fetch mail success', props<{ maildata: Email[] }>())
export const fetchmailFail = createAction('[Data fetch mail failed]', props<{ error: string }>())
