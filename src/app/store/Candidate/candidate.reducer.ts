import { Action, createReducer, on } from '@ngrx/store';
import { fetchCandidatelistData, fetchCandidatelistSuccess, fetchCandidatelistFail } from './candidate.actions';


export interface CandidateState {
    candidateList: any[];
    loading: boolean;
    error: any;

}

export const initialState: CandidateState = {
    candidateList: [],
    loading: false,
    error: null,

};

export const CandidateReducer = createReducer(
    initialState,
    on(fetchCandidatelistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchCandidatelistSuccess, (state, { candidateList }) => {
        return { ...state, candidateList, loading: false };
    }),
    on(fetchCandidatelistFail, (state, { error }) => {
        return { ...state, error, loading: false };
    }),



);

// Selector
export function reducer(state: CandidateState | undefined, action: Action) {
    return CandidateReducer(state, action);
}
