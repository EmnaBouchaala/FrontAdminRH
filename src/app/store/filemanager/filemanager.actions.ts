import { createAction, props } from '@ngrx/store';
import { Filemanager } from './filemanager.model';

// fetch 
export const fetchRecentFilesData = createAction('[Data] fetch RecentFiles');
export const fetchRecentFilesSuccess = createAction('[Data] fetch RecentFiles success', props<{ recentFiles: Filemanager[] }>())
export const fetchRecentFilesFail = createAction('[Data fetch RecentFiles failed]', props<{ error: string }>())