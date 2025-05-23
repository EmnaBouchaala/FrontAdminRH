import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchuserGridData, fetchuserGridFail, fetchuserGridSuccess } from './user.action';

@Injectable()
export class usersEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchuserGridData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/userGrid').pipe(
                    map((UserGriddata) => fetchuserGridSuccess({ UserGriddata })),
                    catchError((error) =>
                        of(fetchuserGridFail({ error }))
                    )
                )
            ),
        ),
    )

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}