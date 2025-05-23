import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchCandidatelistSuccess, fetchCandidatelistData, fetchCandidatelistFail } from './candidate.actions';


@Injectable()
export class CandidateEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCandidatelistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/candidate').pipe(
                    map((candidateList) => fetchCandidatelistSuccess({ candidateList })),
                    catchError((error) =>
                        of(fetchCandidatelistFail({ error }))
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