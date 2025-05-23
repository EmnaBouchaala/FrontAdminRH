import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import {
    fetchtasklistData, fetchtasklistSuccess,
    fetchtasklistFail,
    addtasklistFailure,
    addtasklistSuccess,
    addtasklist,
    updatetasklist,
    updatetasklistSuccess,
    updatetasklistFailure,

} from './tasks.action';

@Injectable()
export class tasklistEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchtasklistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/tasks').pipe(
                    map((tasklist) => fetchtasklistSuccess({ tasklist })),
                    catchError((error) =>
                        of(fetchtasklistFail({ error }))
                    )
                )
            ),
        ),
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addtasklist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/tasks', newData).pipe(
                    map(() => addtasklistSuccess({ newData })),
                    catchError((error) => of(addtasklistFailure({ error })))
                )
            )
        )
    );


    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatetasklist),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/tasks', updatedData).pipe(
                    map(() => updatetasklistSuccess({ updatedData })),
                    catchError((error) => of(updatetasklistFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}