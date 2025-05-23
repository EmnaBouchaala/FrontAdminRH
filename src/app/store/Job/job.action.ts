import { createAction, props } from '@ngrx/store';
import { jobApplyModel, jobGridModel, jobListModel } from './job.model';

//  fetchJoblistData
export const fetchJoblistData = createAction('[Data] fetch Joblist');
export const fetchJoblistSuccess = createAction('[Data] fetch Joblist success', props<{ joblist: jobListModel[] }>())
export const fetchJoblistFail = createAction('[Data fetch Joblist failed]', props<{ error: string }>())

//  fetchJobgridData
export const fetchJobgridData = createAction('[Data] fetch Jobgrid');
export const fetchJobgridSuccess = createAction('[Data] fetch Jobgrid success', props<{ jobGrid: jobGridModel[] }>())
export const fetchJobgridFail = createAction('[Data fetch Jobgrid failed]', props<{ error: string }>())

//  fetchJobApplyData
export const fetchJobApplyData = createAction('[Data] fetch JobApply');
export const fetchJobApplySuccess = createAction('[Data] fetch JobApply success', props<{ JobApply: jobApplyModel[] }>())
export const fetchJobApplyFail = createAction('[Data fetch JobApply failed]', props<{ error: string }>())


// Add Data
export const addJoblist = createAction(
    '[Data] Add Joblist',
    props<{ newData: jobListModel }>()
);
export const addJoblistSuccess = createAction(
    '[Data] Add Joblist Success',
    props<{ newData: jobListModel }>()
);
export const addJoblistFailure = createAction(
    '[Data] Add Joblist Failure',
    props<{ error: string }>()
);


// Update Data
export const updateJoblist = createAction(
    '[Data] Update Joblist',
    props<{ updatedData: jobListModel }>()
);
export const updateJoblistSuccess = createAction(
    '[Data] Update Joblist Success',
    props<{ updatedData: jobListModel }>()
);
export const updateJoblistFailure = createAction(
    '[Data] Update Joblist Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteJoblist = createAction(
    '[Data] Delete Joblist',
    props<{ id: string }>()
);
export const deleteJoblistSuccess = createAction(
    '[Data] Delete Joblist Success',
    props<{ id: string }>()
);
export const deleteJoblistFailure = createAction(
    '[Data] Delete Joblist Failure',
    props<{ error: string }>()
);