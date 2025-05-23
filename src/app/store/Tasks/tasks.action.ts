import { createAction, props } from '@ngrx/store';
import { Task } from './tasks.model';

// fetch 
export const fetchtasklistData = createAction('[Data] fetch tasklist');
export const fetchtasklistSuccess = createAction('[Data] fetch tasklist success', props<{ tasklist: Task[] }>())
export const fetchtasklistFail = createAction('[Data fetch tasklist failed', props<{ error: string }>())

// Add Data
export const addtasklist = createAction(
    '[Data] Add tasklist',
    props<{ newData: Task }>()
);
export const addtasklistSuccess = createAction(
    '[Data] Add tasklist Success',
    props<{ newData: Task }>()
);
export const addtasklistFailure = createAction(
    '[Data] Add tasklist Failure',
    props<{ error: string }>()
);



// Update Data
export const updatetasklist = createAction(
    '[Data] Update tasklist',
    props<{ updatedData: Task }>()
);
export const updatetasklistSuccess = createAction(
    '[Data] Update tasklist Success',
    props<{ updatedData: Task }>()
);
export const updatetasklistFailure = createAction(
    '[Data] Update tasklist Failure',
    props<{ error: string }>()
);
