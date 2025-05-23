import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import {
    fetchuserlistData, fetchuserlistSuccess,
    fetchuserlistFail,
    adduserlistFailure,
    adduserlistSuccess,
    adduserlist,
    updateuserlistFailure,
    updateuserlistSuccess,
    updateuserlist,
    deleteuserlistFailure,
    deleteuserlistSuccess,
    deleteuserlist
} from './userlist.action';

@Injectable()
export class userslistEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchuserlistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/userlist').pipe(
                    map((UserListdata) => fetchuserlistSuccess({ UserListdata })),
                    catchError((error) =>
                        of(fetchuserlistFail({ error }))
                    )
                )
            ),
        ),
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(adduserlist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/userlist', newData).pipe(
                    map(() => adduserlistSuccess({ newData })),
                    catchError((error) => of(adduserlistFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateuserlist),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/userlist', updatedData).pipe(
                    map(() => updateuserlistSuccess({ updatedData })),
                    catchError((error) => of(updateuserlistFailure({ error })))
                )
            )
        )
    );


    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteuserlist),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/userlist').pipe(
                    map(() => deleteuserlistSuccess({ id })),
                    catchError((error) => of(deleteuserlistFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}