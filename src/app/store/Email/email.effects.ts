import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchmailData, fetchmailFail, fetchmailSuccess } from './email.action';

@Injectable()
export class MailEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchmailData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/emailData').pipe(
                    map((maildata) => fetchmailSuccess({ maildata })),
                    catchError((error) =>
                        of(fetchmailFail({ error }))
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