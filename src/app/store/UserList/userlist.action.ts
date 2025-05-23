import { createAction, props } from '@ngrx/store';
import { userListModel } from './userlist.model';

// fetch 
export const fetchuserlistData = createAction('[Data] fetch userlist');
export const fetchuserlistSuccess = createAction('[Data] fetch userlist success', props<{ UserListdata: userListModel[] }>())
export const fetchuserlistFail = createAction('[Data fetch userlist failed]', props<{ error: string }>())

// Add Data
export const adduserlist = createAction(
    '[Data] Add userlist',
    props<{ newData: userListModel }>()
);
export const adduserlistSuccess = createAction(
    '[Data] Add userlist Success',
    props<{ newData: userListModel }>()
);
export const adduserlistFailure = createAction(
    '[Data] Add userlist Failure',
    props<{ error: string }>()
);

// Update Data
export const updateuserlist = createAction(
    '[Data] Update userlist',
    props<{ updatedData: userListModel }>()
);
export const updateuserlistSuccess = createAction(
    '[Data] Update userlist Success',
    props<{ updatedData: userListModel }>()
);
export const updateuserlistFailure = createAction(
    '[Data] Update userlist Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteuserlist = createAction(
    '[Data] Delete userlist',
    props<{ id: string }>()
);
export const deleteuserlistSuccess = createAction(
    '[Data] Delete userlist Success',
    props<{ id: string }>()
);
export const deleteuserlistFailure = createAction(
    '[Data] Delete userlist Failure',
    props<{ error: string }>()
);