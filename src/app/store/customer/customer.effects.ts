import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { addCustomerlist, addCustomerlistFailure, addCustomerlistSuccess, fetchCustomerData, fetchCustomerFail, fetchCustomerSuccess, updateCustomerlist, updateCustomerlistFailure, updateCustomerlistSuccess } from './customer.action';
import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable()
export class CustomerEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCustomerData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/customersData').pipe(
                    map((customer) => fetchCustomerSuccess({ customer })),
                    catchError((error) =>
                        of(fetchCustomerFail({ error }))
                    )
                )
            ),
        ),
    )

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCustomerlist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/customersData', newData).pipe(
                    map(() => addCustomerlistSuccess({ newData })),
                    catchError((error) => of(addCustomerlistFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCustomerlist),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/customersData', updatedData).pipe(
                    map(() => updateCustomerlistSuccess({ updatedData })),
                    catchError((error) => of(updateCustomerlistFailure({ error })))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}