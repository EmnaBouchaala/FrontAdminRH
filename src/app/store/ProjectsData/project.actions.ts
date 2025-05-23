import { createAction, props } from '@ngrx/store';
import { Project } from './project.model';

// fetch 
export const fetchprojectData = createAction('[Data] fetch project');
export const fetchprojectSuccess = createAction('[Data] fetch project success', props<{ projectdata: Project[] }>())
export const fetchprojectFail = createAction('[Data fetch project failed]', props<{ error: string }>())
