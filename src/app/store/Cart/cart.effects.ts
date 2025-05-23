import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchCartData, fetchCartFail, fetchCartSuccess } from './cart.action';

@Injectable()
export class CartEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCartData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/cart').pipe(
                    map((cartdata) => fetchCartSuccess({ cartdata })),
                    catchError((error) =>
                        of(fetchCartFail({ error }))
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