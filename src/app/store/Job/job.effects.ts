import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { addJoblist, addJoblistFailure, addJoblistSuccess, fetchJobApplyData, fetchJobApplyFail, fetchJobApplySuccess, fetchJobgridData, fetchJobgridFail, fetchJobgridSuccess, fetchJoblistData, fetchJoblistFail, fetchJoblistSuccess, updateJoblist, updateJoblistFailure, updateJoblistSuccess } from './job.action';

@Injectable()
export class JoblistEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchJoblistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/joblist').pipe(
                    map((joblist) => fetchJoblistSuccess({ joblist })),
                    catchError((error) =>
                        of(fetchJoblistFail({ error }))
                    )
                )
            ),
        ),
    )

    fetchgroupData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchJobgridData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/jobgrid').pipe(
                    map((jobGrid) => fetchJobgridSuccess({ jobGrid })),
                    catchError((error) =>
                        of(fetchJobgridFail({ error }))
                    )
                )
            )
        )
    );

    fetchjobapplyData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchJobApplyData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/jobapply').pipe(
                    map((JobApply) => fetchJobApplySuccess({ JobApply })),
                    catchError((error) =>
                        of(fetchJobApplyFail({ error }))
                    )
                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addJoblist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/joblist', newData).pipe(
                    map(() => addJoblistSuccess({ newData })),
                    catchError((error) => of(addJoblistFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateJoblist),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/joblist', updatedData).pipe(
                    map(() => updateJoblistSuccess({ updatedData })),
                    catchError((error) => of(updateJoblistFailure({ error })))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}