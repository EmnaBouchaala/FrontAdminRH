import { createAction, props } from '@ngrx/store';
import { ChatMessage, ChatUser } from './chat.model';

// fetch chatmessage
export const fetchchatdata = createAction('[Data] fetch Chat');
export const fetchchatSuccess = createAction('[Data] fetch Chat success', props<{ chat: ChatMessage[] }>())
export const fetchchatFail = createAction('[Data fetch Chat failed]', props<{ error: string }>())

// fetch chatmessage 
export const fetchchatMessageData = createAction('[Data] fetch ChatMessage');
export const fetchchatMessageSuccess = createAction('[Data] fetch ChatMessage success', props<{ chatMessage: ChatUser[] }>())
export const fetchchatMessageFail = createAction('[Data fetch ChatMessage failed', props<{ error: string }>())
