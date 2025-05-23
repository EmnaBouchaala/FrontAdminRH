import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchInvoiceListData, fetchInvoiceListFail, fetchInvoiceListSuccess } from './invoice.action';

@Injectable()
export class InvoiceDataEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchInvoiceListData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/invoice').pipe(
                    map((InvoiceData) => fetchInvoiceListSuccess({ InvoiceData })),
                    catchError((error) =>
                        of(fetchInvoiceListFail({ error }))
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