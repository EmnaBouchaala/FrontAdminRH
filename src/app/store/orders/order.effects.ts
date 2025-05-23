import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { fetchEcoorderDataData, fetchEcoorderDataSuccess, fetchEcoorderDataFail, addEcoOrders, addEcoOrdersSuccess, addEcoOrdersFailure, deleteEcoOrders, deleteEcoOrdersFailure, deleteEcoOrdersSuccess, updateEcoOrdersSuccess, updateEcoOrders, updateEcoOrdersFailure } from './order.actions';
import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';


@Injectable()
export class OrderEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchEcoorderDataData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/orderData').pipe(
                    map((orderDatas) => fetchEcoorderDataSuccess({ orderDatas })),
                    catchError((error) =>
                        of(fetchEcoorderDataFail({ error }))
                    )
                )
            ),
        ),
    );
    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addEcoOrders),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/orderData', newData).pipe(
                    map(() => addEcoOrdersSuccess({ newData })),
                    catchError((error) => of(addEcoOrdersFailure({ error })))
                )
            )
        )
    );
    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEcoOrders),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/orderData', updatedData).pipe(
                    map(() => updateEcoOrdersSuccess({ updatedData })),
                    catchError((error) => of(updateEcoOrdersFailure({ error })))
                )
            )
        )
    );


    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEcoOrders),
            mergeMap(({ ids }) =>
                this.CrudService.deleteData('/app/orderData').pipe(
                    map(() => deleteEcoOrdersSuccess({ ids })),
                    catchError((error) => of(deleteEcoOrdersFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}