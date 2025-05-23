import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchprojectData, fetchprojectFail, fetchprojectSuccess } from './project.actions';

@Injectable()
export class ProjectEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchprojectData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/projects').pipe(
                    map((projectdata) => fetchprojectSuccess({ projectdata })),
                    catchError((error) =>
                        of(fetchprojectFail({ error }))
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