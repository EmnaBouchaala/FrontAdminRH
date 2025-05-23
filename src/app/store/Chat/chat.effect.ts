import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { fetchchatFail, fetchchatMessageData, fetchchatMessageFail, fetchchatMessageSuccess, fetchchatSuccess, fetchchatdata } from './chat.action';

@Injectable()
export class ChatEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchchatdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/chat').pipe(
                    map((chat) => fetchchatSuccess({ chat })),
                    catchError((error) =>
                        of(fetchchatFail({ error }))
                    )
                )
            ),
        ),
    )

    fetchChatMessageData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchchatMessageData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/chatMessage').pipe(
                    map((chatMessage) => fetchchatMessageSuccess({ chatMessage })),
                    catchError((error) =>
                        of(fetchchatMessageFail({ error }))
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