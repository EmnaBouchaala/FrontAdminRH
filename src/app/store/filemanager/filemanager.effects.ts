import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { fetchRecentFilesData, fetchRecentFilesFail, fetchRecentFilesSuccess } from './filemanager.actions';
import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable()
export class FilemanagerEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchRecentFilesData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/recentFiles').pipe(
                    map((recentFiles) => fetchRecentFilesSuccess({ recentFiles })),
                    catchError((error) =>
                        of(fetchRecentFilesFail({ error }))
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