import { createAction, props } from '@ngrx/store';
import { CandidateListModel } from './candidate.model';

// fetch 
export const fetchCandidatelistData = createAction('[Data] fetch Candidatelist');
export const fetchCandidatelistSuccess = createAction('[Data] fetch Candidatelist success', props<{ candidateList: CandidateListModel[] }>())
export const fetchCandidatelistFail = createAction('[Data fetch Candidatelist failed]', props<{ error: string }>())
