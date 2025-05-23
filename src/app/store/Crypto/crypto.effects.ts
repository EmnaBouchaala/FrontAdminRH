import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchorderData, fetchorderFail, fetchorderSuccess } from './crypto.actions';


@Injectable()
export class OrdersEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchorderData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/cryto').pipe(
                    map((orders) => fetchorderSuccess({ orders })),
                    catchError((error) =>
                        of(fetchorderFail({ error }))
                    )
                )
            ),
        ),
    );
    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}
