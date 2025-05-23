import { Action, createReducer, on } from '@ngrx/store';
import { fetchchatdata, fetchchatSuccess, fetchchatFail, fetchchatMessageData, fetchchatMessageSuccess, fetchchatMessageFail } from './chat.action';


export interface ChatState {
    chat: any[];
    chatMessage: any[],
    loading: boolean;
    error: any;

}

export const initialState: ChatState = {
    chat: [],
    chatMessage: [],
    loading: false,
    error: null,

};

export const ChatReducer = createReducer(
    initialState,
    on(fetchchatdata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchchatSuccess, (state, { chat }) => {
        return { ...state, chat, loading: false };
    }),
    on(fetchchatFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchchatMessageData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchchatMessageSuccess, (state, { chatMessage }) => {
        return { ...state, chatMessage, loading: false };
    }),
    on(fetchchatMessageFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

);

// Selector
export function reducer(state: ChatState | undefined, action: Action) {
    return ChatReducer(state, action);
}
