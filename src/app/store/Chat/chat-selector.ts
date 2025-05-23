import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

export const selectDataState = createFeatureSelector<ChatState>('chatList');

export const selectchatData = createSelector(
    selectDataState,
    (state: ChatState) => state.chatMessage
);


export const selectData = createSelector(
    selectDataState,
    (state: ChatState) => state.chat
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: ChatState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ChatState) => state.error
);

